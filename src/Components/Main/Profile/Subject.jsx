import React from "react";
import check from "../../../img/icon/done_all.png";

const Subject = ({ data, load }) => {
  // console.log(props);
  return (
    <div className="cards">
      {load ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => (
          <div key={item.id} className="card">
            <h3 className="title">{item.title}</h3>
            <ul>
              {item.time_limit && (
                <li>
                  <img src={check} alt="check" />
                  <span>Davomiyligi (minut): {item.time_limit}</span>
                </li>
              )}
              {item.count && (
                <li>
                  <img src={check} alt="check" />
                  <span>Testlar soni: {item.count}</span>
                </li>
              )}
              {item.attempts && (
                <li>
                  <img src={check} alt="check" />
                  <span>Urinishlar soni: {item.attempts}</span>
                </li>
              )}
              {item.result && (
                <li>
                  <img src={check} alt="check" />
                  <span>Sizning natijangiz: {item.result}</span>
                </li>
              )}
            </ul>
            <button type="submit" className="btn btn-test">
              Boshlash
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Subject;
