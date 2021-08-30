import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const StudentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Enter all the fields !");
    } else if (
      !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return toast.warn("Invalid Email !")
    } else
      try {
        const res = await axios.post("/api/auth/studentsignin", {
          email,
          password,
        });
        const data = res.data;
        if (data.error) {
          console.log(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          history.push("/studentcalendar");
          toast.success("Signned In ")
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="signinPage">
      <div className="signinBox">
        <h4>Student Login</h4>
        <form onSubmit={handlesubmit} className="signinForm">
          <input
            className="inputFields"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            className="inputFields"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
        <Link className="signinLink" to="/studentsignup">
          Don't have an account?
        </Link>
      </div>
      <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </div>
  );
};

export default StudentSignIn;
