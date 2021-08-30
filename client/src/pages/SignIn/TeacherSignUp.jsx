import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./SignIn.css";

const TeacherSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return toast.warn("Invalid Email")
    }
    try {
      const res = await axios.post("/api/auth/teachersignup", {
        name,
        email,
        password,
      });
      const data = res.data;
      console.log(data);
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Signup successful")
        history.push("/teachersignin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signinPage">
      <div className="signinBox">
        <h4>Teacher SignUp</h4>
        <form onSubmit={submit} className="signinForm">
          <input
            className="inputFields"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            className="inputFields"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="inputFields"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
        <span style={{ color: "grey" }}>
          Already have an Account?&nbsp; 
          <Link style={{color: "#1565c0"}} className="signinLink" to="/teachersignin">
            Sign In
          </Link>
        </span>
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

export default TeacherSignUp;
