import React from "react";
import { useCookies } from "react-cookie";
import logo from "../../img/logo.png";
import userImg from "../../img/icon/userimg.jpg";
import logout from "../../img/icon/logout.png";
import axios from "../../hooks/axios";

const Header = ({ user, loading }) => {
  const [cookie, , removeCookie] = useCookies();
  function logOut() {
    removeCookie("userId");
    console.log(`Bearer ${cookie.userId}`);
    axios.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${cookie.userId}`,
        },
      }
    );
  }
  return (
    <div className="container header">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="user">
        <h1>
          <div className="img">
            <img src={user.photo || userImg} alt="user-img" />
          </div>
          <span>
            {user.first_name} {user.last_name}
          </span>
        </h1>
        <div className="exit" onClick={logOut}>
          <img src={logout} alt="log out" />
        </div>
      </div>
    </div>
  );
};

export default Header;
