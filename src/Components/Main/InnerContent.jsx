import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import axios from "../../hooks/axios";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

function InnerContent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();
  const [datas, setDatas] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoading(true);
    // user ma'lumotlarni olish so'rov
    axios
      .get("/user", {
        headers: {
          Authorization: `Bearer ${cookie.userId}`,
        },
      })
      .then((res) => {
        setData(res.data.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
      });

    // quizlarni olish uchun so'rov
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
        console.log(err.response.status);
      });
  }, []);

  return (
    <div className="inner-content">
      <Header user={data} loading={loading} />
      <div className="middle">
        <Nav />
        <Outlet context={[datas, load, data, loading, setData]} />
      </div>
      <Footer />
    </div>
  );
}

export default InnerContent;
