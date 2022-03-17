import React from "react";
import data from "./data.json";
import Subject from "./Subject";

const Main = () => {
  return (
    <div>
      <h2>Fanlardan testlar</h2>
      <Subject data={data} />
    </div>
  );
};

export default Main;
