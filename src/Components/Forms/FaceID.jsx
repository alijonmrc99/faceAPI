import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import logo from "../../img/logo.png";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "../../hooks/axios";

function FaceID() {
  const videoHeight = 384;
  const videoWidth = 512;
  const [initalizing, setInitalizing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
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
    navigator.getUserMedia(
      {
        video: {},
      },
      (stream) => (videoRef.current.srcObject = stream),
      (e) => {
        console.log(e);
      }
    );
  };

  const handlePlay = async () => {
    if (initalizing) setInitalizing(false);
    const labeledFaceDescriptors = await loadLabeledImages();
    console.log(labeledFaceDescriptors);
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.45);
    console.log(faceMatcher);

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

      // console.log();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);

      const results = resizedDetections.map((d) => {
        // console.log(d.descriptor);
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
    function checkFace(results) {
      console.log(results[0].label);
      if (results[0].label !== "unknown") {
        whoAY[results[0].label] = !whoAY[results[0].label]
          ? 1
          : ++whoAY[results[0].label];
        // console.log(whoAY);
        if (whoAY[results[0].label] === 10) {
          console.log(`Siz ${results[0].label}`);
          videoRef.current.srcObject
            .getTracks()
            .forEach((track) => track.stop());

          // Clear loop and cache localStorage
          clearInterval(checkLoop);
          localStorage.removeItem("data");
          localStorage.removeItem("user");

          // Set user token function
          putCookie(results[0].label);
          setInitalizing(true);
        }
      }
    }

    // Set cookie
    function putCookie(face_token) {
      console.log({ ...body, face_token });
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
          console.log(res.data.data.token);
        });
    }
  };

  async function loadLabeledImages() {
    data = JSON.parse(localStorage.getItem("data"));
    return Promise.all(
      data.map((item) => {
        const des1 = item.description.map(
          (face) => new Float32Array(Object.values(face))
        );
        // const des2 = new Float32Array(Object.values(item.descriptors[1]));
        console.log(des1);
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
