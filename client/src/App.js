import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Editor from './pages/Editor/Editor';
import Register from './auth/Register';
import Login from './auth/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';

import Navbar from './components/Navbar';
import Practice from './pages/Practice';
import PrivateRoute from './components/PrivateRoute';
import NoRouteMatch from './pages/NoRouteMatch';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

const App = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios
      .get('/api/questions/get-all')
      .then((res) => {
        setQuestions({ questions: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route exact path="/" component={Landing} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/practice/:id" component={Editor} />
          {questions.length > 0 &&
            questions.map(({ id, name, question, expected, link }) => (
              <Route
                exact
                path={`/practice/${link}`}
                render={() => (
                  <Editor
                    expectedOutput={expected}
                    questionName={name}
                    questionDescription={question}
                    questionId={id}
                  />
                )}
              />
            ))}

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/practice" component={Practice} />
          <Route component={NoRouteMatch} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
