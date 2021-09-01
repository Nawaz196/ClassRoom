import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import StudentCalendar from "../src/components/calendar/studentCalendar/Calendar";
import TeacherCalendar from "../src/components/calendar/teacherCalendar/Calendar";
import Landing from "./pages/Landing/Landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
    const suser = JSON.parse(localStorage.getItem("suser"));
    const tuser = JSON.parse(localStorage.getItem("tuser"));
    if (suser) {
      dispatch({ type: "SUSER", payload: suser });
       history.push('/studentcalendar')
    } else if (tuser) {
      dispatch({ type: "TUSER", payload: tuser });
       history.push('/teachercalendar')
    }  
    else {
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
    <Route path="/teachercalendar">
      <TeacherCalendar />
    </Route>
    <Route path="/studentsignin">
      <StudentSignIn />
    </Route>
    <Route path="/studentsignup">
      <StudentSignUp />
    </Route>
    <Route path="/studentcalendar">
      <StudentCalendar />
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
