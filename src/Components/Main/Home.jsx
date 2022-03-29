import { Outlet, useOutletContext } from "react-router-dom";

function Home() {
  const [datas, load, user, loading, setData] = useOutletContext();

  return (
    <div className="home container">
      <Outlet context={[datas, load, user, loading, setData]} />
    </div>
  );
}

export default Home;
