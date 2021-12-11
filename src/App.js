import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AllJobs from './Pages/AllJobs';
import { Home } from './Pages/Home';
import { JobDetail } from './Pages/JobDetail';
import { SignIn } from './Pages/SignIn';
import { SignUp } from './Pages/SignUp';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/jobs" component={AllJobs} exact />
        <Route path="/job/detail" component={JobDetail} exact />
        <Route path="/signIn" component={SignIn} exact />
        <Route path="/signUp" component={SignUp} exact />
      </Switch>
    </Router>
  );
}

export default App;
