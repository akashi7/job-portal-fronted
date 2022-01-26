import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { EmpNavBar } from "../components/AppBar";
import { useHistory } from "react-router-dom";
import { saveAs } from "file-saver";

export default function Applicant() {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = `https://eportalback.herokuapp.com`;

  const token = localStorage.getItem("auth");

  const { JobApplicant, viewOneApplicant } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const userId = localStorage.getItem('aplId');
  const [error, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        try {
          await viewOneApplicant(token, userId);
        } catch (error) {
          setError(true);
        }
      }

    })();
    //eslint-disable-next-line
  }, []);

  const saveFile = (file, name) => {
    saveAs(file, `${name}_resume`);
  };

  const selectApplicant = async (id) => {
    setLoading(true);
    const config = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/selectApplicant?userId=${id}`, config)).json();
    if (res.status === 200) {
      setSuccess(true);
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
    <div className="dashboard">
      <EmpNavBar />
      <br />
      {error ? <div style={{ height: "90vh", textAlign: "center" }}>
        <p>Server Error occured</p>
      </div> : (
        <>
          <div className="head">
            {success ? <div style={{ backgroundColor: "darkgreen", padding: "8px" }}>
              <p style={{ color: "whitesmoke" }}>Applicant selected succesfully</p>
            </div> : ""}
            <br />
            <h4>Applicant information</h4>
          </div>
          <div className="appV">
            {JobApplicant.applicant.map(({ id, applicant_name, resume, experience, date, status, selected, job_title }) => {
              return (
                <div key={id}>
                  <p>Names : {applicant_name} </p>
                  <br />
                  <p>Experience : {experience} year(s) </p>
                  <br />
                  <p> Applied on : {date} </p>
                  <br />
                  <p>Position : {job_title} </p>
                  <br />
                  {status === 'viewed' ? <p style={{ color: "white", backgroundColor: "darkgreen", padding: "5px", width: "fit-content" }} >Viewed</p> :
                    <p style={{ color: "white", backgroundColor: "red", padding: "5px", width: "fit-content" }} >Not seen</p>}
                  <br />
                  {selected === 'true' ? <p style={{ color: "white", backgroundColor: "green", padding: "5px", width: "fit-content" }}> Applicant  Selected</p> :
                    loading ? <button className="button">loading.....</button>
                      : <button className="button" onClick={() => selectApplicant(id)}>Select applicant</button>}
                  <br />
                  <br />
                  <button className="button" onClick={() => saveFile(resume, applicant_name)} >Download resume </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
