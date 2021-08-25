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
        <Route path="/studentsignin">
          <StudentSignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
