import Subject from "./Subject";

import { useOutletContext } from "react-router-dom";

const Main = () => {
  const [datas, load, user, loading] = useOutletContext();

  return (
    <div className="main">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <h1>{user.first_name + " " + user.last_name}</h1>
      )}
      <h2>Fanlardan testlar</h2>

      <Subject data={datas} load={load} />
    </div>
  );
};

export default Main;
