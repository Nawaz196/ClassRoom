import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Calendar from "../src/components/calendar/Calendar";
import Landing from "./pages/Landing/Landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import TeacherSignIn from "./pages/SignIn/TeacherSignIn";
import StudentSignIn from "./pages/SignIn/StudentSignIn";
import TeacherSignUp from "./pages/SignIn/TeacherSignUp";
import StudentSignUp from "./pages/SignIn/StudentSignUp";
import Navbar from "./components/navbar/Navbar";
import { reducer, initialState } from "./context/userContext";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
       history.push('/studentcalendar')
    } else {
      history.push("/");
    }
  }, []);
  return(
    <Switch>
    <Route exact path="/">
      <Landing />
    </Route>
    <Route path="/teachersignin">
      <TeacherSignIn />
    </Route>
    <Route path="/teachersignup">
      <TeacherSignUp />
    </Route>
    <Route path="/studentsignin">
      <StudentSignIn />
    </Route>
    <Route path="/studentsignup">
      <StudentSignUp />
    </Route>
    <Route path="/studentcalendar">
      <Calendar />
    </Route>
  </Switch>
  )
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
      <Navbar />
     <Routing/>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
