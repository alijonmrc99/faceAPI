import React from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import Subject from "./Subject";

const Main = () => {
  const [datas, load] = useOutletContext();

  return (
    <div>
      <h2>Fanlardan testlar</h2>
      <Subject data={datas} load={load} isTests={true} />
      <Outlet />
    </div>
  );
};

export default Main;
