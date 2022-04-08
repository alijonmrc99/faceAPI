import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Main/Home";
import FaceID from "./Components/Forms/FaceID";
import Login from "./Components/Forms/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicPage from "./Components/PublicPage";
import InnerContent from "./Components/Main/InnerContent";
import Main from "./Components/Main/Profile/Main";
import Tests from "./Components/Main/Profile/Tests";
import Results from "./Components/Main/Profile/Resuls";
import Settings from "./Components/Main/Profile/Settings";
import Solve from "./Components/Main/Profile/Solve";
import Innertest from "./Components/Main/Profile/InnerTest";
import Nomatch from "./Components/Nomatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<InnerContent />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />}>
            <Route path="/home" element={<Main />} />
            <Route path="tests" element={<Innertest />}>
              <Route index element={<Tests />} />
              <Route path=":id" element={<Solve />} />
            </Route>
            <Route path="result" element={<Results />} />
            <Route path="settins" element={<Settings />} />
            <Route path="404" element={<Nomatch status={404} />} />
            <Route path="403" element={<Nomatch status={403} />} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<PublicPage />}>
        <Route index element={<Login />} />
        <Route path="/login/faceid" element={<FaceID />} />
      </Route>

      <Route path="*" element={<Nomatch status={404} />} />
    </Routes>
  );
}

export default App;
