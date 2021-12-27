import { useState } from "react";
import { saveAs } from "file-saver";
import { useHistory } from "react-router-dom";


export const EmpJobDetail = ({ Job, Applicants, token }) => {

  const history = useHistory();

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const initialState = {
    cv: {
      applicant: []
    }
  };

  const [seeCv, setSeeCv] = useState(false);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [success, setSuccess] = useState(false);


  const viewOneApplicant = async (Id) => {
    setLoading(true);
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/oneApplicant?userId=${Id}`, config)).json();
    if (res.status === 200) {
      setLoading(false);
      setSeeCv(true);
      setState({ ...state, cv: res.data });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const saveFile = (file, name) => {
    saveAs(file, `${name}_resume`);
  };

  const deleteJob = async (jobId) => {
    setLoadingTwo(true);
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/removeJob?jobId=${jobId}`, config)).json();
    if (res.status === 200) {
      setLoadingTwo(false);
      setSuccess(true);
      setTimeout(() => {
        history.goBack();
      }, 4000);
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }

  };

  return (
    <div className="viewPeople">
      <div className="leftSide">
        {success ? <div style={{ backgroundColor: "darkgreen", padding: "8px" }}>
          <p style={{ color: "whitesmoke" }}>Job removed succesfully</p>
        </div> : ""}
        <br></br>
        <h4 style={{ color: "rgb(72, 72, 202)" }}>Job details</h4>
        <br></br>
        {Job.oneJob.map(({ id, company_name, job_title, posted_on, job_category, experience, expiry_date, due }) => {
          return (
            <div key={id}>
              <h4>Company : {company_name} </h4>
              <br></br>
              <p>Category : {job_category}</p>
              <br></br>
              <p>Title : {job_title}</p>
              <br></br>
              <p>Posted on : {posted_on}</p>
              <br></br>
              <p>Experience : {experience} year(s)</p>
              <br></br>
              <p>Due : {expiry_date}</p>
              <br></br>
              {due === 'old' ? (
                loadingTwo ? <button className="button" disabled >loading....</button> :
                  <button className="button" onClick={(f) => deleteJob(id)} >Remove Job</button>
              ) : ""}
            </div>
          );
        })}
      </div>
      <div className="centerSide">
        <br></br>
        <h4 style={{ color: "rgb(72, 72, 202)" }}>Job Applicants</h4>
        <br></br>
        {Applicants.applicants.length === 0 ? <div style={{ padding: "10px", textAlign: "center" }} >
          <p>No applicants applied yet</p>
        </div> :
          Applicants.applicants.map(({ id, applicant_name, date, status }) => {
            return (
              <div key={id} onClick={() => viewOneApplicant(id)} className="userCv" >
                <p> {date} </p>
                <p> {applicant_name} </p>
                {status === 'viewed' ? <p style={{ color: "white", backgroundColor: "rgb(72, 72, 202)", padding: "2px" }} >Viewed</p> :
                  <p style={{ color: "white", backgroundColor: "red", padding: "2px" }} >Not viewed</p>}
              </div>
            );
          })}
      </div>
      <div className="rightSide">
        <br></br>
        <h4 style={{ color: "rgb(72, 72, 202)" }}>Applicant info</h4>
        <br></br>
        {seeCv ? state.cv.applicant.map(({ id, applicant_name, resume, experience }) => {
          return (
            <div key={id}>
              <p>Names : {applicant_name} </p>
              <br></br>
              <p> Experience : {experience} year(s) </p>
              <br></br>
              <button className="button" onClick={() => saveFile(resume, applicant_name)} >Download resume </button>
            </div>
          );
        }) : loading ? <p>
          loading file ......
        </p> :
          <p>Click applicant to see his/her CV</p>}
      </div>
    </div>
  );
};
