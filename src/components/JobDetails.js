import { useHistory } from "react-router-dom";
// import moment from "moment";

export const JobDetails = ({ Jobs }) => {

  const history = useHistory();

  const goSeeJob = (id) => {
    localStorage.setItem("jId", id);
    history.push("/job/detail");
  };

  const length = Jobs.categoryJobs.length;

  return (
    <div className="allJ">
      {(length === 0) ? <div className="no-jobs">
        <p>No jobs Available come back later</p>
      </div>
        : Jobs.categoryJobs.map(({ id, job_title, company_name, posted_on, due, expiry_date }) => {
          return (
            <>
              <div key={id} className="job-det" >
                <h3 style={{ color: "rgb(24, 24, 163)" }}>{job_title} </h3>
                <div className="JOB_D">
                  <p className="color"  >{company_name} </p>
                  <p>on : {posted_on} </p>
                  <p>Due : {expiry_date}</p>
                  {due === 'old' ? <p style={{ color: "red" }} > Expired </p> :
                    <button className="app-button" onClick={(e) => goSeeJob(id)}>Apply</button>}
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};
