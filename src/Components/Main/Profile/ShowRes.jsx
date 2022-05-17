import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Showres = () => {
  const [resData, setResData] = useState();
  const redirect = useNavigate();

  useEffect(() => {
    setResData(JSON.parse(localStorage.getItem("result")));
    console.log(resData);
    return () => {
      localStorage.removeItem("result");
    };
  }, []);

  function goHome() {
    redirect("/");
  }

  if (resData)
    return (
      <div className="show-result">
        Sizning natijangiz: {resData.correct_answers}
      </div>
    );
  else
    return (
      <div>
        {" "}
        <p>Sizda ishlangan test yo'q</p>
        <button onClick={goHome} className="btn btn-test">
          qatish
        </button>
      </div>
    );
};

export default Showres;
