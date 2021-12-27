import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { EmpNavBar } from "../components/AppBar";
import { useHistory } from "react-router-dom";
import { EmpJobDetail } from "../components/EmpJobDetail";

export const EmpJobDetails = () => {
  const history = useHistory();
  const token = localStorage.getItem("auth");
  const jobId = localStorage.getItem("EmJid");

  const { EmpOneJob, EmpViewOneJobs, Applicants, EmpViewApplicant } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/signIn');
      }
      else {
        await EmpViewOneJobs(token, jobId);
        await EmpViewApplicant(token, jobId);
      }
    })();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="dashboard">
      <EmpNavBar />
      <EmpJobDetail Job={EmpOneJob} Applicants={Applicants} token={token} />
    </div>
  );
};
