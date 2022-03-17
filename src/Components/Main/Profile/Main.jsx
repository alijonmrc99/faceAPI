import React, { useState, useEffect } from "react";
import Subject from "./Subject";
import data from "./data.json";
import axios from "../../../hooks/axios";
import { useCookies } from "react-cookie";

const Main = () => {
  const [datas, setDatas] = useState([]);
  const [load, setLoad] = useState(false);
  const [cookie] = useCookies();
  useEffect(() => {
    setLoad(true);
    axios
      .get("/quizzes", {
        headers: {
          Authorization: `Bearer ${cookie.userId}`,
        },
      })
      .then((res) => {
        setDatas(res.data.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      // cleanup
    };
  }, []);
  // .that((res) => console.log(res.data));
  // console.log(datas);
  return (
    <div className="main">
      <h1>Xush kelibsiz Kuvondikov Alijon</h1>
      <h2>Fanlardan testlar</h2>
      <Subject data={datas} load={load} />
    </div>
  );
};

export default Main;
