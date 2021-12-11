import { useHistory } from "react-router-dom";

export const JobDetails = () => {

  const history = useHistory();

  return (
    <div className="job-det">
      <h3 style={{ color: "rgb(24, 24, 163)" }}>Junior developer</h3>
      <br></br>
      <div className="JOB_D">
        <p>Kuranga ltd</p>
        <p>Full-time</p>
        <p>Junior developer</p>
        <button className="app-button" onClick={() => history.push("/job/detail")}>Apply</button>
      </div>
      <div className="JOB_D">
        <p>BK ltd</p>
        <p>Full-time</p>
        <p>Junior developer</p>
        <button className="app-button" onClick={() => history.push("/job/detail")}>Apply</button>
      </div>
      <div className="JOB_D">
        <p>Urumuri</p>
        <p>Full-time</p>
        <p>Junior developer</p>
        <button className="app-button" onClick={() => history.push("/job/detail")}>Apply</button>
      </div>
      <div className="JOB_D">
        <p>Mashu</p>
        <p>Full-time</p>
        <p>Junior developer</p>
        <button className="app-button" onClick={() => history.push("/job/detail")}>Apply</button>
      </div>
      <div className="JOB_D">
        <p>Digital felice</p>
        <p>Full-time</p>
        <p>Junior developer</p>
        <button className="app-button" onClick={() => history.push("/job/detail")}>Apply</button>
      </div>
    </div>
  );
};
