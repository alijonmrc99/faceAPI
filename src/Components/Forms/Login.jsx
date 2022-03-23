import axios from "../../hooks/axios";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import userIcon from "../../img/icon/user.png";
import lockIcon from "../../img/icon/lock.png";
import { useForm } from "../../hooks/useForm";
import { useState, useEffect, useRef } from "react";

function Login() {
  // Fromaning odatiy qiymatlari
  const initialValue = {
    email: "",
    password: "",
  };

  const [data, setData] = useForm(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const submitBtn = useRef();
  const [isSubmit, setIsSubmit] = useState(false);
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
  useEffect(() => {
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      submitBtn.current.classList.add("button--loading");
      axios
        .post("/login", data, {
          "Content-Type": "application/json",
        })
        .then((res) => {
          localStorage.setItem("data", JSON.stringify(res.data.data));
          localStorage.setItem("user", JSON.stringify(data));
          redirect("/login/faceid");
        })
        .catch((e) => {
          submitBtn.current.classList.remove("button--loading");
          if (e.response.status === 401) {
            setFormErrors({ notFound: "Bunday foydalanuvchi yo'q" });
          }
          console.log();
        });
    }
  }, [formErrors]);

  function emailValidation(data) {
    const errors = {};
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

    if (!data.email) {
      errors.email = "Email bo'sh bo'lmasin!!!";
    } else if (!pattern.test(data.email)) {
      errors.email = "Emailni to'g'ri kirting";
    }
    if (!data.password) {
      errors.password = "Parol bo'sh bo'lmasin!!!";
    } else if (data.password.length < 6) {
      errors.password = "Parol 6 belgidan kam bo'lmasin";
    }

    return errors;
  }

  function HandleSubmit(e) {
    e.preventDefault();
    setFormErrors(emailValidation(data));
    setIsSubmit(true);

    console.log("ketti");
    // e.target.lastElementChild;
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
            <label htmlFor="username">Loginni kirting </label>
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
            <span className="error-input">{formErrors.email}</span>
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
            <span className="error-input">{formErrors.password}</span>
          </div>
          <button ref={submitBtn} type="submit" className="btn btn-form">
            Yuborish
          </button>
          <p className="error">{formErrors.notFound}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
