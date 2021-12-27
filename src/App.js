import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AllJobs from './Pages/AllJobs';
import { Home } from './Pages/Home';
import { JobDetail } from './Pages/JobDetail';
import { SignIn } from './Pages/SignIn';
import { SignUp } from './Pages/SignUp';
import { AppProvider } from './context/AppContext';
import { Dashboard } from './Pages/Dashboard';
import { EmpJobs } from './Pages/EmpJobs';
import { EmpJobDetails } from './Pages/EmpJobDetails';
import { Profile } from './Pages/Profile';


function App() {
  return (
    <Router>
      <Switch>
        <AppProvider>
          <Route path="/" component={Home} exact />
          <Route path="/jobs" component={AllJobs} exact />
          <Route path="/job/detail" component={JobDetail} exact />
          <Route path="/signIn" component={SignIn} exact />
          <Route path="/signUp" component={SignUp} exact />
          <Route path="/Dashboard" component={Dashboard} exact />
          <Route path="/Dashboard/jobs" component={EmpJobs} exact />
          <Route path="/Dashboard/jobs/:id" component={EmpJobDetails} exact />
          <Route path="/Profile" component={Profile} exact />
        </AppProvider>
      </Switch>
    </Router>
  );
}

export default App;
