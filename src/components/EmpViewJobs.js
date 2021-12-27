import { useHistory } from "react-router-dom";

export const EmpViewJobs = ({ Jobs }) => {

  const history = useHistory();

  const viewOne = (jobId) => {
    localStorage.setItem("EmJid", jobId);
    history.push(`/Dashboard/jobs/${jobId}`);
  };
  return (
    <div className="empJobs">
      <h4 style={{ color: "rgb(72, 72, 202)" }} >Posted Jobs</h4>
      <br></br>
      {Jobs.empJobs.length === 0 ? <div>
        <p>You have no  posted any Job so far </p>
      </div>
        : Jobs.empJobs.map(({ id, job_title, job_category, posted_on }) => {
          return (
            <div key={id} className="hisJobs" onClick={() => viewOne(id)} >
              <p> {job_title} </p>
              <p> {job_category} </p>
              <p> {posted_on} </p>
            </div>
          );
        })}
    </div>
  );
};
