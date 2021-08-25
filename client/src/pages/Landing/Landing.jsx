import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landingPage">
      <div className="containerBox">
        <img
          className="containerBoxImage"
          src="https://freepikpsd.com/media/2019/10/teacher-png-3-Transparent-Images.png"
          alt=""
        />
        <button> <Link to = "/teachersignin">For Teachers</Link> </button>
      </div>
      <div className="containerBox">
        <img
          className="containerBoxImage"
          src="https://www.pngitem.com/pimgs/m/81-813934_transparent-student-uniform-clipart-school-student-vector-png.png"
          alt=""
        />
        <button> <Link to = "/studentsignin">For Student</Link> </button>
      </div>
    </div>
  );
}

export default Landing;
