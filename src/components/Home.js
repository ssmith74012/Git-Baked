import React, { useState } from "react";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Home = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="backgroundImage">
      <div className="carousel">
        <div className="welcome">
          <h1>Welcome To Git Baked!</h1>
          <h3>Your online bakery for every cooking need!</h3>
        </div>
      </div>
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
          </ul>
        </div>
        <div class="footer-bottom">
          <h2> 2023 Fullstack Academy Cohort </h2>
        </div>
      </footer>
    </div>
  );
};

export default Home;
