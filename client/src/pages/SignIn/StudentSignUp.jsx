import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";

const StudentSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
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
      const res = await axios.post("/api/auth/studentsignup", {
        name,
        email,
        password,
        branch,
      });
      const data = res.data;
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Signup Successful")
        history.push("/studentsignin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signinPage">
      <div className="signinBox">
        <h4>Student SignUp</h4>
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
          <select className="selectInputFields" value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="CE">CE</option>
            <option value="IT">IT</option>
          </select>
          <button className="button" type="submit">Submit</button>
        </form>
        <span style={{ color: "grey" }}>
          Already have an Account?&nbsp; 
          <Link style={{color: "#1565c0"}} className="signinLink" to="/studentsignin">
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

export default StudentSignUp;
