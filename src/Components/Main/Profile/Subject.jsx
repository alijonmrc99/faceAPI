import React from "react";
import { Link } from "react-router-dom";
import check from "../../../img/icon/done_all.png";

const Subject = ({ data, load, isTests }) => {
  return (
    <div className="cards">
      {load ? (
        <p>Loading...</p>
      ) : data?.length === 0 ? (
        <div className="nothing">
          Opps !!!
          <br />
          <br /> Hech qanday natija yoq
        </div>
      ) : (
        data?.map((item) => (
          <div key={item.id} className="card">
            {item?.title && <h3 className="title">{item?.title}</h3>}
            {item?.quiz?.title && <h3 className="title">{item.quiz.title}</h3>}
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
              {(item.correct_answers || item.correct_answers === 0) && (
                <li>
                  <img src={check} alt="check" />
                  <span>Sizning natijangiz: {item.correct_answers}</span>
                </li>
              )}
              {item.status && (
                <li>
                  <img src={check} alt="check" />
                  <span>Sizning natijangiz: {item.status}</span>
                </li>
              )}
            </ul>
            {item.title && (
              <Link
                to={isTests ? `${item.id}` : `tests/${item.id}`}
                type="submit"
                className="btn btn-test"
              >
                Boshlash
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Subject;
