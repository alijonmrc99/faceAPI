import React from "react";
import res from "./res.json";
import Subject from "./Subject";
const Main = () => {
  return (
    <div>
      <h2>Fanlardan testlar</h2>
      <Subject data={res} />
    </div>
  );
};

export default Main;
