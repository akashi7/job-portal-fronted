import { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { AppReducer } from "./AppReducer";


const initialState = {
  Categories: {
    jobCategory: []
  },
  Jobs: {
    categoryJobs: []
  },
  oneJob: {
    OneJob: []
  },
  EmpJobs: {
    empJobs: []
  },
  EmpOneJob: {
    oneJob: []
  },
  Applicants: {
    applicants: []
  }
};

export const AppContext = createContext(initialState);
export const AppProvider = ({ children }) => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const history = useHistory();

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchCategories = async () => {
    const config = {
      method: "GET",
    };
    const res = await (await fetch(`${url}/api/home/jobsCategories`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'JOB_CATEGORIES',
        payload: res.data
      });
    }

  };

  const viewAllJobs = async (categName) => {
    const config = {
      method: "GET",
    };
    const res = await (await fetch(`${url}/api/home/viewAllJobs?categoryName=${categName}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'JOBS',
        payload: res.data
      });
    }
  };

  const viewJob = async (jobId) => {
    const config = {
      method: "GET",
    };
    const res = await (await fetch(`${url}/api/home/viewJob?id=${jobId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'ONE_JOB',
        payload: res.data
      });
    }
  };

  const EmpViewAllJobs = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/viewAllJobs`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'EMP_JOBS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };


  const EmpViewOneJobs = async (token, jobId) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/oneJob?jobId=${jobId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'EMP_ONE_JOB',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const EmpViewApplicant = async (token, jobId) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/allApplicants?jobId=${jobId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'ALL_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };



  return (
    <AppContext.Provider value={{
      ...state,
      fetchCategories, viewAllJobs, viewJob, EmpViewAllJobs,
      EmpViewOneJobs, EmpViewApplicant
    }}>
      {children}
    </AppContext.Provider>
  );

};