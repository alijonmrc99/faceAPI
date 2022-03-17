import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

function InnerContent() {
  return (
    <div className="inner-content">
      <Header />
      <div className="middle">
        <Nav />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default InnerContent;
