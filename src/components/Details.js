import { useState } from "react";
import { saveAs } from "file-saver";
import { useHistory } from "react-router-dom";

export const Details = ({ jobView }) => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const history = useHistory();

  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucess, setSuccess] = useState(false);

  const initialState = {
    fullNames: "",
    email: "",
    phone: "",
    experience: "",
    mesage: "",
    resume: {}
  };

  const [state, setState] = useState(initialState);

  const toogleApply = (id) => {
    localStorage.setItem("apId", id);
    if (!applied) {
      setApplied(true);
    }
    else setApplied(false);
  };

  const saveFile = (file, name) => {
    saveAs(file, `${name}_job_description_file`);
  };

  const applyJob = async (e) => {

    const jobId = localStorage.getItem("apId");

    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('resume', state.resume[0]);
    formData.append('fullNames', state.fullNames);
    formData.append('experience', state.experience);
    formData.append('email', state.email);
    formData.append('phone', state.phone);

    const config = {
      method: "POST",
      body: formData
    };

    const res = await (await fetch(`${url}/api/home/applyJob?id=${jobId}`, config)).json();

    if (res.status === 200) {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        history.push('/');
      }, 5000);
    }
    if (res.status === 400) {
      setLoading(false);
      setState({ ...state, mesage: res.message });
      setTimeout(() => {
        setState({ ...state, mesage: "" });
      }, 5000);
    }
    if (res.status === 409) {
      setLoading(false);
      setState({ ...state, mesage: res.error });
      setTimeout(() => {
        setState({ ...state, mesage: "" });
      }, 5000);
    }


  };


  return (
    <>
      {!applied ? <div className="apply-job">
        {jobView.OneJob.map(({ id, company_name, job_category, job_type, document, description, job_title, experience, expiry_date }) => {
          return (
            <div key={id} >
              <h3>Company : {company_name} </h3>
              <br></br>
              <p>Job : {job_title}</p>
              <br></br>
              <p>Category : {job_category}</p>
              <br></br>
              <p>Type : {job_type}</p>
              <br></br>
              <p>Experince :{experience} year(s) </p>
              <br></br>
              <p>Deadline :{expiry_date} </p>
              <br></br>
              <div className="description">
                <p>Description : {description}</p>
                <br></br>
              </div>
              <button onClick={(f, n) => saveFile(document, company_name)} className="apply-btn">Download job description file</button>
              <button className="apply-btn" onClick={(e) => toogleApply(id)} >Apply</button>
            </div>
          );
        })}
      </div> :
        <div className="apply-job">
          {sucess ? <div style={{ backgroundColor: "darkgreen", padding: "10px" }} >
            <p style={{ color: "whitesmoke" }} >application sent succesfully</p>
          </div> : ""}
          {state.mesage ? <div style={{ backgroundColor: "red", padding: "10px" }}>
            <p style={{ color: "whitesmoke" }} > {state.mesage} </p>
          </div> : ""}
          <form onSubmit={(e) => applyJob(e)} >
            <div className="style">
              <input placeholder="Full names" className="inputJ" required
                onChange={(e) => setState({ ...state, fullNames: e.target.value })}
              />
              <input placeholder="Email" className="inputJ" type="email" required
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
            <div className="style">
              <input placeholder="Experience" className="inputJ" required
                onChange={(e) => setState({ ...state, experience: e.target.value })}
              />
              <input placeholder="Phone" className="inputJ" required
                onChange={(e) => setState({ ...state, phone: e.target.value })}
              />
            </div>
            <div className="style">
              <label style={{ marginLeft: "10px" }} >Upload CV :</label>
              <input type="file" placeholder="Upload your CV" className="file"
                onChange={e => setState({ ...state, resume: e.target.files })}
                required
              />
            </div>
            <br></br>
            {loading ? <button className="apply-btn" disabled >loading....</button> :
              <button className="apply-btn" >SEND</button>
            }
          </form>
          <br></br>
          <button className="apply-btns" onClick={() => setApplied(false)} >back</button>
        </div>
      }
    </>
  );
};
