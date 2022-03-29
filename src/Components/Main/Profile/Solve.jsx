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
  const redirect = useNavigate();

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
        setTimeLimit(res.data?.data?.take?.quiz?.time_limit * 60);
        // setTimeLimit(20);
        console.log(res.data);
      })
      .catch((err) => {
        setData(err);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timeLimit > 0) {
        setTimeLimit(timeLimit - 1);
      }
      if (timeLimit === 0) {
        handleSubmit();
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  function handlechange(e) {
    setAnswerData({
      ...answerData,
      [e.target.name]: e.target.value,
    });
  }

  // Natijani tekshirish va tekshirishga tayyorlash
  function handleSubmit() {
    let sendAnswers = [];
    sendAnswers = Object.keys(answerData).map((item) => {
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
    setResLoad(true);
    setGetResult(false);
    axios
      .post(
        `/quizzes/${id}/finish`,
        JSON.stringify({
          take_id: data.data.take.id,
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
      });
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
          ) : (
            <>
              {data?.data?.questions?.map((test) =>
                test.type_id === 1 ? (
                  <div key={test.id} className="single">
                    <p>{test.content}</p>
                    <ul>
                      <li onChange={handlechange}>
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
                  <div onChange={handlechange} key={test.id} className="text">
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
                        savoldan {res.correct_answers} ta ishladingiz{" "}
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
                {data?.data?.questions?.map((item) => (
                  <span key={item.id}>1</span>
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
