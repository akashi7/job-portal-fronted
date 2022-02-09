export const AppReducer = (state, action) => {

  switch (action.type) {
    case 'JOB_CATEGORIES':
      return {
        ...state,
        Categories: action.payload
      };
    case 'JOBS':
      return {
        ...state,
        Jobs: action.payload
      };
    case 'ONE_JOB':
      return {
        ...state,
        oneJob: action.payload
      };
    case 'EMP_JOBS':
      return {
        ...state,
        EmpJobs: action.payload
      };
    case 'EMP_ONE_JOB':
      return {
        ...state,
        EmpOneJob: action.payload
      };
    case 'ALL_APPLICANTS':
      return {
        ...state,
        Applicants: action.payload
      };
    case 'EMP_ALL_APPLICANTS':
      return {
        ...state,
        ApplicantsList: action.payload
      };
    case 'SELECTED_APPLICANTS':
      return {
        ...state,
        SelectedList: action.payload
      };
    case 'NOT_VIEWED_APPLICANTS':
      return {
        ...state,
        NotViewedList: action.payload
      };
    case 'NEW_APPLICANTS':
      return {
        ...state,
        NewApplicantsList: action.payload
      };
    case 'NUMBER_OF_JOBS':
      return {
        ...state,
        NofJobs: action.payload
      };
    case 'NUMBER_OF_APPLICANTS':
      return {
        ...state,
        NofApplicants: action.payload
      };
    case 'NO_OF_SELECTED_APPLICANTS':
      return {
        ...state,
        NofSelected: action.payload
      };
    case 'NO_OF_NOTVIEWED_APPLICANTS':
      return {
        ...state,
        NofnotViewed: action.payload
      };
    case 'NO_OF_NEW_APPLICANTS':
      return {
        ...state,
        NofNew: action.payload
      };
    case 'EMP_JOB_CATEGORIES':
      return {
        ...state,
        Job_categories: action.payload
      };
    case 'EMP_JOB_TITLES':
      return {
        ...state,
        Job_titles: action.payload
      };
    case 'APPLICANT_DETAILS':
      return {
        ...state,
        JobApplicant: action.payload
      };
    case 'NUMBER_OF_ONE_JOB':
      return {
        ...state,
        nOfOneJobApplicants: action.payload
      };

    case 'NUMBER_OF_ONE_JOB_UNSEEN':
      return {
        ...state,
        nOfOneUnseenJobApplicants: action.payload
      };
    case 'NUMBER_OF_ONE_JOB_SELECTED':
      return {
        ...state,
        nOfOneSelectedJobApplicants: action.payload
      };
    case 'NUMBER_OF_USER_JOBS_COUNT':
      return {
        ...state,
        noOfUserJobs: action.payload
      };
    default:
      return null;
  }
}