import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "../../hooks/axios";

function FaceID() {
  const videoHeight = 384;
  const videoWidth = 512;
  const [initalizing, setInitalizing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
  const msgError = useRef();
  const navigate = useNavigate();
  const [, setCookies] = useCookies();
  const [body] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (!body) navigate("/login");

    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitalizing(true);
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {},
      })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch((e) => console.error(e));
  };

  const handlePlay = async () => {
    if (initalizing) setInitalizing(false);
    const labeledFaceDescriptors = await loadLabeledImages();

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.45);

    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
      videoRef.current
    );

    const displaySize = {
      width: videoWidth,
      height: videoHeight,
    };

    faceapi.matchDimensions(canvasRef.current, displaySize);

    const detectFace = async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);

      const results = resizedDetections.map((d) => {
        return faceMatcher.findBestMatch(d.descriptor);
      });

      results.forEach((res, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: "Aniqlanmoqda",
        });
        drawBox.draw(canvasRef.current);
      });

      checkFace(results);
    };

    const checkLoop = setInterval(detectFace, 500);

    let whoAY = {};
    whoAY["error"] = 0;
    function checkFace(results) {
      // yuz yoqligini aniqlash ------------------
      if (results[0] === undefined) {
        handleErrors("notFace");
      } else {
        // yuz bor bo'lsa uni tekshitish ----------

        msgError.current.style.opacity = "0";
        msgError.current.innerHTML = "";

        if (results[0].label !== "unknown") {
          whoAY[results[0].label] = !whoAY[results[0].label]
            ? 1
            : ++whoAY[results[0].label];
        } else whoAY["error"] = ++whoAY["error"];

        if (whoAY["error"] == 10) {
          handleErrors("lying");
        }

        if (whoAY[results[0].label] === 10) {
          videoRef.current.srcObject
            .getTracks()
            .forEach((track) => track.stop());

          // Clear loop and cache localStorage
          clearInterval(checkLoop);
          localStorage.removeItem("data");
          localStorage.removeItem("user");

          // Set user token function
          putCookie(results[0].label);
        }
      }
    }

    // Errolarni tutib olish ----------------------------

    function handleErrors(e) {
      msgError.current.style.opacity = "1";
      if (e === "lying") {
        msgError.current.innerHTML = "Bizni aldamang";
        setTimeout(() => navigate("/login"), 2000);
        clearInterval(checkLoop);
        localStorage.removeItem("data");
        localStorage.removeItem("user");
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (e === "notFace") {
        msgError.current.innerHTML = "Yuzni aniqlomayabman kamerani tekshiring";
      }
    }

    // Set cookie
    function putCookie(face_token) {
      axios
        .post(
          "/login/face",
          { ...body, face_token },
          {
            "Content-Type": "application/json",
          }
        )
        .then((res) => {
          const d = new Date();
          d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
          setCookies("userId", res.data.data.token, { path: "/", expires: d });

          navigate("/login");
        });
    }
  };

  async function loadLabeledImages() {
    const data = JSON.parse(localStorage.getItem("data"));
    return Promise.all(
      data.map((item) => {
        const des1 = item.description.map(
          (face) => new Float32Array(Object.values(face))
        );
        // const des2 = new Float32Array(Object.values(item.descriptors[1]));

        return new faceapi.LabeledFaceDescriptors(
          item.face_token.toString(),
          des1
        );
      })
    );
  }

  return (
    <div className="container faceId">
      <header>
        <img src={logo} alt="logo" />
      </header>
      <main className="main">
        <h2>Face ID</h2>
        <p className="error-face" ref={msgError}></p>
        <div className="video-container">
          <div height={videoHeight} width={videoWidth} className={`face-cont`}>
            <div className={`lds-roller ${initalizing ? "view" : "noview"}`}>
              <div />
              <div />
              <div />
              <div></div>
            </div>
            <video autoPlay ref={videoRef} muted onPlay={handlePlay}></video>
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>

        <p>Dastur sizning kimligingizni tekshirmoqda iltimos kameraga qarang</p>
      </main>
    </div>
  );
}

export default FaceID;
