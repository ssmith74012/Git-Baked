import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import BASE_URL from "../BaseURL";
import "./Form.css";

const BASE_URL = `http://localhost:3001`;

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const info = await response.json();
      console.log("The response is ", info);
      if (info.error) {
        setErrorMessage(info.error);
        return;
      }
      console.log("Login returned: ", info);
      localStorage.setItem("token", info.token);
      props.setToken(info.token);
      setUser(info.user);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="form-contents">
          <div>
            <label />
            Username*
            <div class="input-container">
              <i class="fa fa-user icon" />
              <input
                class="input-field"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label />
            Password*
            <div class="input-container">
              <i class="fa fa-key icon" />
              <input
                class="input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={"8"}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <button className="login-btn">Login</button>
            </div>
            <div>
              <Link to="/Register">Don't Have An Account? Register Here!</Link>
            </div>
          </div>
          <div>
            <p>{errorMessage}</p>
          </div>
        </div>
      </form>
      <footer class="footer-content">
        <h1> Git Baked </h1>
        <div class="footer-menu">
          <ul class="f-menu">
            <li>
              <a href="/"> Home</a>
            </li>
            <li>
              <a href="/products"> Products</a>
            </li>
            <li>
              <a href="/login"> Login </a>
            </li>
            <li>
              <a href="/register"> Register </a>
            </li>
          </ul>
        </div>
        <div class="footer-bottom">
          <h2> 2023 Fullstack Academy Cohort </h2>
        </div>
      </footer>
    </div>
  );
};
export default Login;
