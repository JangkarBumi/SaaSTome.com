import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import LandingPage from './components/Landing/LandingPage';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="bg-grayskull h-full ">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
