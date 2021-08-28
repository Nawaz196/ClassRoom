import React from "react";
import "./App.css";
import Calendar from "../src/components/calendar/Calendar";
import Landing from "./pages/Landing/Landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TeacherSignIn from "./pages/SignIn/TeacherSignIn";
import StudentSignIn from "./pages/SignIn/StudentSignIn";
import TeacherSignUp from "./pages/SignIn/TeacherSignUp";
import StudentSignUp from "./pages/SignIn/StudentSignUp";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
