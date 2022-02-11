import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AppProvider } from './context/AppContext';
import PreLoading from './Pages/PreLoading';





const HomePage = lazy(() => import('./Pages/Home'));
const JobDetail = lazy(() => import('./Pages/JobDetail'));
const SignIn = lazy(() => import('./Pages/SignIn'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const AllJobs = lazy(() => import('./Pages/AllJobs'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const EmpJobs = lazy(() => import('./Pages/EmpJobs'));
const EmpJobDetails = lazy(() => import('./Pages/EmpJobDetails'));
const Profile = lazy(() => import('./Pages/Profile'));
const AllApplicantsList = lazy(() => import('./Pages/AllApplicantsList'));
const SelectedApp = lazy(() => import('./Pages/SelectedApp'));
const ViewedApplicants = lazy(() => import('./Pages/ViewedApplicants'));
const NewApplicants = lazy(() => import('./Pages/NewApplicants'));
const PostJob = lazy(() => import('./Pages/PostJob'));
const Applicant = lazy(() => import('./Pages/Applicant'));



function App() {
  return (
    <Router>
      <AppProvider>
        <Suspense fallback={PreLoading()}>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/jobs" component={AllJobs} exact />
            <Route path="/job/detail" component={JobDetail} exact />
            <Route path="/signIn" component={SignIn} exact />
            <Route path="/signUp" component={SignUp} exact />
            <Route path="/Dashboard" component={Dashboard} exact />
            <Route path="/Dashboard/jobs" component={EmpJobs} exact />
            <Route path="/Dashboard/jobs/:id" component={EmpJobDetails} exact />
            <Route path="/Profile" component={Profile} exact />
            <Route path="/applicants" component={AllApplicantsList} exact />
            <Route path="/applicants/selected" component={SelectedApp} exact />
            <Route path="/applicants/notviewed" component={ViewedApplicants} exact />
            <Route path="/applicants/new" component={NewApplicants} exact />
            <Route path="/dashboard/postjob" component={PostJob} exact />
            <Route path="/dashboard/applicant" component={Applicant} exact />
            <Route
              path="*"
              component={() => (
                <pre style={{ textAlign: 'center', fontSize: '2rem' }}>
                  404
                  <br />
                  <br />
                  The page you requested for was not found.
                </pre>
              )}
            />
          </Switch>
        </Suspense>
      </AppProvider>
    </Router>
  );
}

export default App;
