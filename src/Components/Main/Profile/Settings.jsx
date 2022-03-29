import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useOutletContext } from "react-router-dom";
import axios from "../../../hooks/axios";
import { useForm } from "../../../hooks/useForm";

const Main = () => {
  const [, , user, loading, setData] = useOutletContext();
  const [cookie] = useCookies();

  const [sbData, setSbData] = useState({});
  function handleChange(e) {
    setSbData({
      ...sbData,
      [e.target.name]: e.target.value,
    });
    console.log(sbData);
    setData({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put("/user", JSON.stringify(sbData), {
        headers: {
          Authorization: `Bearer ${cookie.userId}`,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res.data.data));
  }
  return (
    <div>
      <h2>Profil sozlamari</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <ul className="settings">
            <li>
              <span>Username: </span>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
              />{" "}
            </li>
            <li>
              <span>Ismingiz: </span>
              <input
                type="text"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
              />{" "}
            </li>
            <li>
              <span>Familyangiz: </span>
              <input
                type="text"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
              />{" "}
            </li>
            <li>
              <span>Telefon raqam: </span>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={user.phone}
              />{" "}
            </li>
            <li>
              <span>Yaratilgan sana: </span>
              {user.registered_at}
            </li>
            <li>
              <span>Oxirgi tashrif: </span>
              {user.last_login}
            </li>
          </ul>
          <button className="btn btn-form">Saqlash</button>
        </form>
      )}
    </div>
  );
};

export default Main;
