import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import hamburger from "../../img/icon/menu.png";
import home from "../../img/icon/home.png";
import school from "../../img/icon/schooll.png";
import user from "../../img/icon/person.png";
import finish from "../../img/icon/flag.png";

const Nav = () => {
  const navBar = useRef();

  function handleWidth() {
    navBar.current.classList.toggle("navHihg");
  }
  return (
    <nav ref={navBar} className="nav">
      <ul className="navbar">
        <li className="nav-img">
          <img onClick={handleWidth} src={hamburger} alt="hamburger" />
        </li>
        <li>
          <NavLink to="/home" end>
            <div className="nav-img">
              <img src={home} alt="home" />
            </div>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/tests">
            <div className="nav-img">
              <img src={school} alt="school" />
            </div>
            <span>Tests</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/result">
            <div className="nav-img">
              <img src={finish} alt="finish" />
            </div>
            <span>Result</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/settins">
            <div className="nav-img">
              <img src={user} alt="user" />
            </div>
            <span>User Profile</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
