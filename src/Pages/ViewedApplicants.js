import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { EmpNavBar } from "../components/AppBar";
import { useHistory } from "react-router-dom";
import { DashBar } from "../components/DashBar";

export default function ViewedApplicants() {


  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = `https://eportalback.herokuapp.com`;

  const {
    NotViewedList, EmpseeNotViewedApplicants,
    Job_titles, EmpjobTitles
  } = useContext(AppContext);

  const token = localStorage.getItem("auth");
  const history = useHistory();

  const initialState = {
    jobLists: {
      notViewedApplications: []
    },
  };

  const [seeTiltes, seeSetTitles] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        try {
          await EmpseeNotViewedApplicants(token);
          await EmpjobTitles(token);
        } catch (error) {
          alert("server error");
        }
      }

    })();
    //eslint-disable-next-line
  }, []);

  const seen = new Set();

  const filterdArray = Job_titles.filter(({ job_title }) => {
    const duplicate = seen.has(job_title);
    seen.add(job_title);
    return !duplicate;
  });

  const categoriesArray = filterdArray.map(({ id, job_title }) => {
    return <option key={id}>{job_title} </option>;
  });

  const filterCategory = async (e) => {

    let value = e.target.value;

    if (value === '--filter jobs---') {
      setMessage("Choose job titles");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
    else {
      setLoading(true);
      const config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const res = await (await fetch(`${url}/api/user/filterNotSeenJobsApplications?Title=${value}`, config)).json();
      if (res.status === 200) {
        setLoading(false);
        seeSetTitles(true);
        setState({ ...state, jobLists: res.data });
      }
      if (res.status === 401) {
        localStorage.clear();
        history.push('/signIn');
      }
    }
  };

  const viewApplicant = (id) => {
    localStorage.setItem('aplId', id);
    history.push('/dashboard/applicant');
  };

  return (
    <div className="notViewed">
      <EmpNavBar />
      <DashBar />
      <div>
        <div className="filterCate">
          <h4>Not viewed applicants</h4>
          {message ? <div>
            <p style={{ color: "red" }}> {message} </p>
          </div> : ""}
          <br />
          {Job_titles.length === 0 ? <p>Nothing to filter you have 0 applicants</p>
            : <select className="chooseCate" onChange={(e) => filterCategory(e)} >
              <option>--filter jobs---</option>
              {categoriesArray}
            </select>}
        </div>
        <div className="table">
          {loading ? <p>Loading.....</p> :
            seeTiltes ? (
              <table id="customers">
                <thead>
                  <tr>
                    <th>Names</th>
                    <th>Email</th>
                    <th>job_title</th>
                    <th>Applied on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.jobLists.notViewedApplications.length === 0 ? <tr style={{ padding: "10px", textAlign: "left" }}>
                    <td>No applicants yet or all are viewed for this job </td>
                  </tr>
                    : state.jobLists.notViewedApplications.map(({ id, applicant_name, email, job_title, date }) => {
                      return (
                        <tr key={id}>
                          <td>{applicant_name}</td>
                          <td>{email}</td>
                          <td>{job_title}</td>
                          <td>{date}</td>
                          <td onClick={() => viewApplicant(id)} className="click">View</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) :
              <table id="customers">
                <thead>
                  <tr>
                    <th>Names</th>
                    <th>Email</th>
                    <th>job_title</th>
                    <th>Applied on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {NotViewedList.notSeenApplicants.length === 0 ? <tr style={{ padding: "10px", textAlign: "left" }}>
                    <td>No applicants yet or all are viewed</td>
                  </tr>
                    : NotViewedList.notSeenApplicants.map(({ id, applicant_name, email, job_title, date }) => {
                      return (
                        <tr key={id}>
                          <td>{applicant_name}</td>
                          <td>{email}</td>
                          <td>{job_title}</td>
                          <td>{date}</td>
                          <td onClick={() => viewApplicant(id)} className="click">View</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>}
        </div>
      </div>
    </div>
  );
};
