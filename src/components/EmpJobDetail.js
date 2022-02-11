import { useState } from "react";
import { saveAs } from "file-saver";
import { useHistory } from "react-router-dom";
import moment from "moment";


export const EmpJobDetail = ({ Job, Applicants, token }) => {

  const history = useHistory();

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = `https://eportalback.herokuapp.com`;

  const initialState = {
    cv: {
      applicant: []
    }
  };

  const [seeCv, setSeeCv] = useState(false);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [loadingThree, setLoadingThree] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [success, setSuccess] = useState('');


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
      setLoadingTwo('Job removed ');
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

  const selectApplicant = async (id) => {
    setLoadingThree(true);
    const config = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/selectApplicant?userId=${id}`, config)).json();
    if (res.status === 200) {
      setSuccess('Applicant selected');
      setTimeout(() => {
        window.location.reload();
      }, 5000);
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
          <p style={{ color: "whitesmoke" }}>{success}</p>
        </div> : ""}
        <br></br>
        <h4 style={{ color: "#009879" }}>Job details</h4>
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
              <p>Due : {moment(expiry_date).format("DD/MM/YYYY")}</p>
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
        <h4 style={{ color: "#009879" }}>Job Applicants</h4>
        <br></br>
        {Applicants.applicants.length === 0 ? <div style={{ padding: "10px", textAlign: "center" }} >
          <p>Seen all applications</p>
        </div> :
          Applicants.applicants.map(({ id, applicant_name, status }) => {
            return (
              <div key={id} onClick={() => viewOneApplicant(id)} className="userCv" >
                <p> {applicant_name} </p>
                {status === 'viewed' ? <p style={{ color: "white", backgroundColor: "rgb(72, 72, 202)", padding: "2px" }} >Viewed</p> :
                  <p style={{ color: "white", backgroundColor: "red", padding: "2px" }} >Not seen</p>}
              </div>
            );
          })}
      </div>
      <div className="rightSide">
        <br></br>
        <h4 style={{ color: "#009879" }}>Applicant info</h4>
        <br></br>
        {seeCv ? state.cv.applicant.map(({ id, applicant_name, resume, experience, selected, date, job_title }) => {
          return (
            <div key={id}>
              <p>Names : {applicant_name} </p>
              <br></br>
              <p> Experience : {experience} year(s) </p>
              <br></br>
              <p> Applied on : {date} </p>
              <br />
              <p>Position : {job_title} </p>
              <br />
              {selected === 'true' ? <p style={{ color: "green", padding: "5px" }}> Applicant  Selected</p> :
                loadingThree ? <button className="button">loading.....</button> :
                  <button className="button" onClick={() => selectApplicant(id)}>Select applicant</button>
              }
              <br />
              <br />
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
