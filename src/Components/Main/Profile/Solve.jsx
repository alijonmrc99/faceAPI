import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../hooks/axios";
import { useCookies } from "react-cookie";

const Solve = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [res, setRes] = useState(null);
  const [resLoad, setResLoad] = useState(false);
  const [load, setLoad] = useState(false);
  const [cookie] = useCookies();
  const verifyBtn = useRef();
  const [getResult, setGetResult] = useState(true);
  const [answerData, setAnswerData] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const redirect = useNavigate();
  let myInterval;

  useEffect(() => {
    setLoad(true);
    axios
      .get(`/quizzes/${id}/start`, {
        headers: {
          Authorization: `Bearer ${cookie.userId}`,
        },
      })
      .then((res) => {
        setData(res.data);
        const now = Date.now();
        const end = Date.parse(res.data?.data?.take?.ends_at);
        setTimeLimit(Math.floor((end - now) / 1000));

        setQuizzes(() =>
          Object.values(res.data.data.questions).map((item, index) => {
            console.log(item);
            const quiz = {
              quizId: item.id,
            };
            quiz[index] = false;
            return quiz;
          })
        );
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          redirect("/home/403");
        }

        if (err.response?.status === 404) {
          redirect("/home/403");
        }
      })
      .finally(() => {
        setLoad(false);
      });

    return {};
  }, []);

  useEffect(() => {
    myInterval = setInterval(timer, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  const timer = () => {
    if (timeLimit !== 0 && timeLimit > 0) {
      setTimeLimit(timeLimit - 1);
    }
    if (timeLimit <= 0) {
      // handleSubmit("hard");
      redirect("/");
      clearInterval(myInterval);
    }
  };

  function handlechange(e, index, qId) {
    console.log(quizzes);
    quizzes.map((item) => {
      if (item.quizId === qId && e.target.value.length !== 0)
        return (item[index] = true);
      if (e.target.value.length === 0) return (item[index] = false);
    });

    setAnswerData({
      ...answerData,
      [e.target.name]: e.target.value,
    });
  }

  // Natijani tekshirish va tekshirishga tayyorlash
  async function handleSubmit(submit = "") {
    let sendAnswers = [];

    sendAnswers = Object.keys(answerData)?.map((item) => {
      if (!isNaN(+answerData[item]))
        return {
          answer_id: answerData[item],
          question_id: item,
        };
      else
        return {
          content: answerData[item],
          question_id: item,
        };
    });
    // Natijani tekshirish

    if (sendAnswers.length > 0 || submit === "hard") {
      setResLoad(true);
      setGetResult(false);
      verifyBtn.current.classList.add("viewAlert");
      axios
        .post(
          `/quizzes/${id}/finish`,
          JSON.stringify({
            take_id: data?.data?.take?.id,
            answers: sendAnswers,
          }),
          {
            headers: {
              Authorization: `Bearer ${cookie.userId}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setRes(res.data.data);
          console.log(res.data);
        })
        .catch((err) => {
          setData(err.response.status);
        })
        .finally(() => {
          setResLoad(false);
          console.log(data?.data?.take?.id);
          console.log({
            take_id: data?.data?.take?.id,
            answers: sendAnswers,
          });

          // goHome();
        });
    } else {
      alert("Testni ishlang avval");
      verifyBtn.current.classList.remove("viewAlert");
    }
    // clearInterval(myInterval);
  }

  function handleClick() {
    verifyBtn.current.classList.add("viewAlert");
  }

  function hadleCancel() {
    verifyBtn.current.classList.remove("viewAlert");
  }

  function goHome() {
    redirect("/");
  }

  return (
    <>
      <h2>fanidan test</h2>
      <div className="solve">
        <div className="left">
          {load ? (
            <p>Loading...</p>
          ) : data?.data?.questions.length === 0 ? (
            <p>Hech qanday test yoq</p>
          ) : (
            <>
              {data?.data?.questions?.map((test, index) =>
                test.type_id === 1 ? (
                  <div
                    // onClick={() => setQuiz(index)}
                    data-id={index}
                    key={test.id}
                    className="single"
                  >
                    <p>{test.content}</p>
                    <ul>
                      <li onChange={(e) => handlechange(e, index, test.id)}>
                        {test.answers.map((answer) => (
                          <div key={answer.id}>
                            <input
                              type="radio"
                              name={test.id}
                              value={answer.id}
                              id={`input${answer.id}`}
                            />
                            <label htmlFor={`input${answer.id}`}>
                              {answer.content}
                            </label>
                          </div>
                        ))}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div
                    onChange={(e) => handlechange(e, index, test.id)}
                    key={test.id}
                    className="text"
                  >
                    <p>{test.content}</p>
                    <input className="input" name={test.id} type="text" />
                  </div>
                )
              )}
              <button
                onClick={handleClick}
                className="btn btn-test"
                type="submit"
              >
                Yuborish
              </button>
              <div ref={verifyBtn} className="alert">
                {getResult ? (
                  <>
                    <p>Rostdan ham toshirasizmi?</p>

                    <div>
                      <button onClick={handleSubmit} className="btn btn-test">
                        Topshirish
                      </button>
                      <button onClick={hadleCancel} className="btn btn-danger">
                        Hali emas
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    {resLoad ? (
                      <p>Loading ...</p>
                    ) : (
                      <p>
                        Tabrilamiz siz {data?.data?.questions?.length} ta
                        savoldan {res?.correct_answers} ta ishladingiz{" "}
                      </p>
                    )}
                    <button onClick={goHome} className="btn btn-test">
                      qatish
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="right">
          {load ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="timelimit">
                Qolgan vaqt <br /> {Math.trunc(timeLimit / 60)} min{" "}
                {timeLimit % 60} sek
              </p>
              <div className="dots">
                {quizzes?.map((item, index) => (
                  <span className={item[index] ? "fill" : ""} key={index}>
                    {index + 1}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Solve;
