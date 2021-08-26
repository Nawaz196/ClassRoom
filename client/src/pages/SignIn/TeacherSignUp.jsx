import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"

const TeacherSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submit = async(e)=>{
    e.preventDefault()
    if (
      !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ){
      return alert("Invalid Email")
    }
    try {
      const res = await axios.post("/api/auth/teachersignup", {
        name,
        email,
        password,
      })
      const data= res.data
      console.log(data)
      if(data.error){
        alert(data.error)
      }else{
        alert("Signup Successfull")
        history.push("/teachersignin")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label>Name </label>{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email </label>{" "}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TeacherSignUp;
