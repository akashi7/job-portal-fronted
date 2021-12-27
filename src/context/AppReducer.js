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
    default:
      return null;
  }
}