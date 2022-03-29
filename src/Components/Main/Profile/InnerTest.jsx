import { Outlet, useOutletContext } from "react-router-dom";

const Innertest = () => {
  const [datas, load] = useOutletContext();
  return (
    <div>
      <Outlet context={[datas, load]} />
    </div>
  );
};

export default Innertest;
