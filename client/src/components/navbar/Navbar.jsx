import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbarLeft">
        <h2>Classroom Scheduler</h2>
      </div>
      <div className="navbarRight">
        <button className="button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
