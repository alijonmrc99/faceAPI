import axios from "../../hooks/axios";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import userIcon from "../../img/icon/user.png";
import lockIcon from "../../img/icon/lock.png";
import { useForm } from "../../hooks/useForm";

function Login() {
  // Fromaning odatiy qiymatlari
  const initialValue = {
    email: "",
    password: "",
  };

  const [data, setData] = useForm(initialValue);
  const redirect = useNavigate();

  // animatsiya funksiyalari -----------------

  function handleTop(e) {
    e.target.previousElementSibling.classList.add("labelActive");
  }

  function handlePut(e) {
    if (e.target.value.length === 0)
      e.target.previousElementSibling.classList.remove("labelActive");
  }
  // ------------------------------------------

  async function HandleSubmit(e) {
    e.preventDefault();

    e.target.lastElementChild.classList.add("button--loading");

    axios
      .post("/login", data, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        localStorage.setItem("data", JSON.stringify(res.data.data));
        localStorage.setItem("user", JSON.stringify(data));
        redirect("/login/faceid");
      });
  }

  return (
    <div className="container-form">
      <div className="container">
        <img src={logo} alt="Logo" />
      </div>

      <div className="form">
        <form onSubmit={HandleSubmit}>
          <h2>Login</h2>
          <div className="input">
            <img src={userIcon} alt="UserIcon" />
            <label htmlFor="username">Loginni kirting</label>
            <input
              onBlur={handlePut}
              onFocus={handleTop}
              value={data.username}
              onChange={(e) => {
                setData(e);
                handleTop(e);
              }}
              name="email"
              id="username"
              type="text"
              autoComplete="off"
            />
          </div>

          <div className="input">
            <img src={lockIcon} alt="UserIcon" />
            <label htmlFor="password">Parolni kirting </label>
            <input
              onBlur={handlePut}
              onFocus={handleTop}
              value={data.password}
              onChange={(e) => {
                setData(e);
                handleTop(e);
              }}
              name="password"
              id="password"
              type="password"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="btn btn-form">
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
