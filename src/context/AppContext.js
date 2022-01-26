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
  },
  ApplicantsList: {
    applicants: []
  },
  SelectedList: {
    selectedApplicants: []
  },
  NotViewedList: {
    notSeenApplicants: []
  },
  NewApplicantsList: {
    newApplicants: []
  },
  NofJobs: [],
  NofApplicants: [],
  NofSelected: [],
  NofnotViewed: [],
  NofNew: [],
  Job_categories: [],
  Job_titles: [],
  JobApplicant: {
    applicant: []
  },
  nOfOneJobApplicants: [],
  nOfOneUnseenJobApplicants: [],
  nOfOneSelectedJobApplicants: []
};

export const AppContext = createContext(initialState);
export const AppProvider = ({ children }) => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = `https://eportalback.herokuapp.com`;

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

  const EmpViewAllApplicants = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/applicantsList`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'EMP_ALL_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const EmpViewSelectedApplicants = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/selectedApplicants`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'SELECTED_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }

  };

  const EmpseeNotViewedApplicants = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/notviewedApplicants`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NOT_VIEWED_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const EmpseeNewApplicants = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/newApplicants`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NEW_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const numberOfJobs = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/numberOfJobs`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NUMBER_OF_JOBS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const numberOfApplicants = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/numberOfApplicants`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NUMBER_OF_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const numberOfSelectedApplicants = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/numberOfSelected`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NO_OF_SELECTED_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const numberOfNotviewedApplicants = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/numberOfNotviewedApplicants`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NO_OF_NOTVIEWED_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const numberOfNewApplicants = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/numberOfNewApplicants`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NO_OF_NEW_APPLICANTS',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const EmpjobCategories = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/jobCategories`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'EMP_JOB_CATEGORIES',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const EmpjobTitles = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/jobTitles`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'EMP_JOB_TITLES',
        payload: res.data
      });
    }
    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const viewOneApplicant = async (token, userId) => {

    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/oneApplicant?userId=${userId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'APPLICANT_DETAILS',
        payload: res.data
      });
    }

    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }

  };

  const oneJobApplicants = async (token, jobId) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/nOfOneJobApplicants?jobId=${jobId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NUMBER_OF_ONE_JOB',
        payload: res.data
      });
    }

    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const oneJobUnseenApplicants = async (token, jobId) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/nOfOneJobUnseenApplicants?jobId=${jobId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NUMBER_OF_ONE_JOB_UNSEEN',
        payload: res.data
      });
    }

    if (res.status === 401) {
      localStorage.clear();
      history.push('/signIn');
    }
  };

  const oneJobSelectedApplicants = async (token, jobId) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/user/nOfOneJobSelectedApplicants?jobId=${jobId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'NUMBER_OF_ONE_JOB_SELECTED',
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
      EmpViewOneJobs, EmpViewApplicant, EmpViewAllApplicants,
      EmpViewSelectedApplicants, EmpseeNotViewedApplicants,
      EmpseeNewApplicants, numberOfJobs, numberOfApplicants,
      numberOfSelectedApplicants, numberOfNotviewedApplicants,
      numberOfNewApplicants, EmpjobCategories, EmpjobTitles,
      viewOneApplicant, oneJobApplicants, oneJobUnseenApplicants,
      oneJobSelectedApplicants
    }}>
      {children}
    </AppContext.Provider>
  );

};