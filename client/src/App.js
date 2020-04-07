import React from "react";

import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Editor from "./components/Editor/Editor";
import Register from "./auth/Register";
import Login from "./auth/Login";
import About from "./components/About/About";
import EditorDemo from "./components/EditorDemo/EditorDemo";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Practice from "./components/Practice/Practice";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";
import NoRouteMatch from "./components/NoRouteMatch/NoRouteMatch";

import "bulma/css/bulma.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticatedpracticepractice
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    axios
      .get("/api/questions/get-questions")
      .then(res => {
        this.setState({ questions: res["data"] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { questions } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <header>
            <Navbar />
          </header>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/editor-demo" component={EditorDemo} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {questions.map(
              ({ id, name, question, expected, difficulty, link }) => (
                <Route
                  path={link}
                  render={() => (
                    <Editor
                      expectedOutput={expected}
                      questionName={name}
                      questionDescription={question}
                      questionId={id}
                    />
                  )}
                />
              )
            )}

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/practice" component={Practice} />
            <Route component={NoRouteMatch} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
