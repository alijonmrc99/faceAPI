import React, { useEffect, useState } from "react";
import axios from "../../../hooks/axios";
import { useCookies } from "react-cookie";
import Subject from "./Subject";

const Main = () => {
  const [datas, setDatas] = useState([]);
  const [load, setLoad] = useState(false);
  const [cookie] = useCookies();

  useEffect(() => {
    setLoad(true);
    axios
      .get("/takes", {
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
  }, []);
  return (
    <div>
      <h2>Natijalar</h2>
      <Subject data={datas} load={load} />
    </div>
  );
};

export default Main;
