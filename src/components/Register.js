import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./Form.css";

const BASE_URL = `http://localhost:3001`;

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      setErrorMessage(info.error);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password do not match!");
      return;
    }
    localStorage.setItem("token", info.token);
    props.setToken(info.token);
    props.setUser(info.user);
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/premium-photo/baked-round-macarons-beige-background-delicious-dessert-bottom-view_116441-20113.jpg?w=740")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "cover",
        height: "800px",
        overflow: "hidden",
      }}
    >
      <form onSubmit={handlesubmit} className="form">
        <div className="form-contents">
          <div>
            <label />
            Email*
            <div class="input-container">
              <i class="fa fa-envelope icon" />
              <input
                class="input-field"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
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
              <i class="fa fa-key icon"></i>
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
            <label />
            Confirm Password*
            <div class="input-container">
              <input
                class="input-field"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                minLength={"8"}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <button className="register-btn">Register</button>
            </div>
            <div>
              <Link to="/login">Have An Account? Login Here!</Link>
            </div>
          </div>
          <div>
            <p>{errorMessage}</p>
          </div>
        </div>
      </form>

      <footer class="footer-content">
        <h1> Git Baked </h1>
        <ul class="footer-links">
          <li>
            <a href="/products"> Products </a>
          </li>
          <li>
            <a href="/contact"> Contact Us </a>
          </li>
          <li>
            <a href="/about"> About Us </a>
          </li>
        </ul>
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
            <Link to="/cart">
              <FaIcons.FaCartPlus className="cart-icon" />
            </Link>
          </ul>
        </div>
        <div class="footer-bottom">
          <h2> 2023 Fullstack Academy Cohort </h2>
        </div>
      </footer>
    </div>
  );
};
export default Register;
