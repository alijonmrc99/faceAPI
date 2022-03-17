import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="home container">
      <Outlet />
    </div>
  );
}

export default Home;
