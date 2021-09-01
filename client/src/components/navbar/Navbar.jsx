import React, { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import "./Navbar.css";


const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();


  if (state) {
    return (
      <div className="navbar">
        <div className="navbarLeft">
          <h2 style={{ marginLeft: "20px" }}>Classroom Scheduler</h2>
        </div>
        <div className="navbarRight">
          <button
            className="redbutton"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/");
            }}
          >
            Logout
          </button>

          {/* {dialogBox && <AddClass isOpen={dialogBox} />} */}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Navbar;
