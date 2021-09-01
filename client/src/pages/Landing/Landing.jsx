import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import student from "../../Assets/student.png"

function Landing() {
  return (
    <div className="landingPage">
      <div className="containerBox">
        <img
          className="containerBoxImage"
          src="https://freepikpsd.com/media/2019/10/teacher-png-3-Transparent-Images.png"
          alt=""
        />
        <button className="landingPageButton"> <Link className="landingPageLink" to = "/teachersignin">For Teachers</Link> </button>
      </div>
      <div className="containerBox">
        <img
          className="containerBoxImage"
          src={student}
          alt=""
        />
        <button className="landingPageButton"> <Link className="landingPageLink" to = "/studentsignin">For Students</Link> </button>
      </div>
    </div>
  );
}

export default Landing;
