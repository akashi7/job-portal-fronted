import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { EmpNavBar } from "../components/AppBar";
import { useHistory } from "react-router-dom";
import { EmpJobDetail } from "../components/EmpJobDetail";
import { OneDashBar } from "../components/OneDashBar";

export default function EmpJobDetails() {
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
        try {
          await EmpViewOneJobs(token, jobId);
          await EmpViewApplicant(token, jobId);
        } catch (error) {
          alert("Server Error");
        }
      }
    })();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <EmpNavBar />
      <OneDashBar />
      <EmpJobDetail Job={EmpOneJob} Applicants={Applicants} token={token} />
    </div>
  );
};
