import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import LandingPage from './components/Landing/LandingPage';
import PrivateRoute from './components/routing/PrivateRoute';
import { login, logout } from './features/userSlice';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          }),
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <Router>
      <div className="bg-grayskull h-full ">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
