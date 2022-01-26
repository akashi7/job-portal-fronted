import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { EmpNavBar } from "../components/AppBar";
import { useHistory } from "react-router-dom";
import { DashBar } from "../components/DashBar";

export default function Dashboard() {


  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = `https://eportalback.herokuapp.com`;

  const {
    fetchCategories, EmpJobs,
    EmpViewAllJobs, Job_categories,
    EmpjobCategories
  } = useContext(AppContext);

  const token = localStorage.getItem("auth");

  const initialState = {
    categories: {
      jobs: []
    },
    category: ""
  };

  const history = useHistory();
  const [seecategory, seeSetCategory] = useState(false);
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
          await fetchCategories();
          await EmpViewAllJobs(token);
          await EmpjobCategories(token);
        } catch (error) {
          alert('Server Error');
        }
      }

    })();
    //eslint-disable-next-line
  }, []);

  const viewOne = (jobId) => {
    localStorage.setItem("EmJid", jobId);
    history.push(`/Dashboard/jobs/${jobId}`);
  };

  const seen = new Set();

  const filterdArray = Job_categories.filter(({ job_category }) => {
    const duplicate = seen.has(job_category);
    seen.add(job_category);
    return !duplicate;
  });

  const categoriesArray = filterdArray.map(({ id, job_category }) => {
    return <option key={id}>{job_category} </option>;
  });

  const filterCategory = async (e) => {

    let value = e.target.value;

    if (value === '--Filter category--') {
      setMessage("Choose category");
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
      const res = await (await fetch(`${url}/api/user/filtercategory?category=${value}`, config)).json();
      if (res.status === 200) {
        setLoading(false);
        seeSetCategory(true);
        setState({ ...state, categories: res.data });
      }
      if (res.status === 401) {
        localStorage.clear();
        history.push('/signIn');
      }
    }
  };

  const goToPost = () => {
    history.push('/dashboard/postjob');
  };


  return (
    <div className="dashboard">
      <EmpNavBar />
      <DashBar />
      <div>
        <div className="filterCate">
          <h4>Job posted</h4>
          <br />
          {message ? <div>
            <p style={{ color: "red" }}> {message} </p>
          </div> : ""}
          <br />
          <div className="postNew" >
            <select className="chooseCate" onChange={(e) => filterCategory(e)} >
              <option>--Filter category--</option>
              {categoriesArray}
            </select>
            <button className="postB" onClick={() => goToPost()} >Post new job</button>
          </div>
        </div>
        <div className="table">
          {loading ? <p>Loading....</p> :
            seecategory ? (
              <table id="customers">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Posted on</th>
                    <th>Due date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.categories.jobs.length === 0 ? <tr style={{ padding: "10px", textAlign: "left" }}>
                    <td>No job found for this category </td>
                  </tr>
                    : state.categories.jobs.map(({ id, job_title, job_category, posted_on, expiry_date }) => {
                      return (
                        <tr key={id}>
                          <td>{job_category}</td>
                          <td>{job_title}</td>
                          <td>{posted_on}</td>
                          <td>{expiry_date}</td>
                          <td
                            className="click"
                            onClick={() => viewOne(id)}
                          >View</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : <table id="customers">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Title</th>
                  <th>Posted on</th>
                  <th>Due date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {EmpJobs.empJobs.length === 0 ? <tr style={{ padding: "10px", textAlign: "center" }}>
                  <td>No job posted yet </td>
                </tr>
                  : EmpJobs.empJobs.map(({ id, job_title, job_category, posted_on, expiry_date }) => {
                    return (
                      <tr key={id}>
                        <td>{job_category}</td>
                        <td>{job_title}</td>
                        <td>{posted_on}</td>
                        <td>{expiry_date}</td>
                        <td
                          className="click"
                          onClick={() => viewOne(id)}
                        >View</td>
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
