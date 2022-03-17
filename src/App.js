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

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<InnerContent />}>
          <Route path="/" element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />}>
            <Route path="/home" element={<Main />} />
            <Route path="/home/tests" element={<Tests />} />
            <Route path="/home/result" element={<Results />} />
            <Route path="/home/settins" element={<Settings />} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<PublicPage />}>
        <Route index element={<Login />} />
        <Route path="/login/faceid" element={<FaceID />} />
      </Route>

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
}

export default App;
