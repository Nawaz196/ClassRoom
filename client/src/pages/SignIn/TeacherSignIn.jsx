import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const TeacherSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(email);
      // console.log(password);
      const res = await axios.post("/api/auth/teachersignin", {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4> ClassRoom</h4>
      <form onSubmit={handlesubmit}>
        <label>Username : </label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password : </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default TeacherSignIn;
