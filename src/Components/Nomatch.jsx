import React from "react";
import { Link } from "react-router-dom";
// import bgImg from "../img/nopage.png"

const Nomatch = ({ status }) => {
  console.log(status);
  if (status === 403)
    return (
      <div
        className="nomatch"
        style={{ height: "100vh", backgroundSize: "600px" }}
      >
        <p>Testlar tugagan</p>
        <Link className="btn-nomatch" to="/">
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  if (status === 404)
    return (
      <div className="nomatch" style={{ height: "100vh" }}>
        <p>Bunday sahifa yo'q</p>
        <Link
          style={{ bottom: "80% !important" }}
          className="btn-nomatch bottom"
          to="/"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  return <p>xato</p>;
};

export default Nomatch;
