import * as actionType from './ActionTypes';

export const AppReducer = (state, { type, payload }) => {

  switch (type) {
    case actionType.JOB_CATEGORIES:
      return {
        ...state,
        Categories: payload
      };
    case actionType.JOBS:
      return {
        ...state,
        Jobs: payload
      };
    case actionType.ONE_JOB:
      return {
        ...state,
        oneJob: payload
      };
    case actionType.EMP_JOBS:
      return {
        ...state,
        EmpJobs: payload
      };
    case actionType.EMP_ONE_JOB:
      return {
        ...state,
        EmpOneJob: payload
      };
    case actionType.ALL_APPLICANTS:
      return {
        ...state,
        Applicants: payload
      };
    case actionType.EMP_ALL_APPLICANTS:
      return {
        ...state,
        ApplicantsList: payload
      };
    case actionType.SELECTED_APPLICANTS:
      return {
        ...state,
        SelectedList: payload
      };
    case actionType.NOT_VIEWED_APPLICANTS:
      return {
        ...state,
        NotViewedList: payload
      };
    case actionType.NEW_APPLICANTS:
      return {
        ...state,
        NewApplicantsList: payload
      };
    case actionType.NUMBER_OF_JOBS:
      return {
        ...state,
        NofJobs: payload
      };
    case actionType.NUMBER_OF_APPLICANTS:
      return {
        ...state,
        NofApplicants: payload
      };
    case actionType.NO_OF_SELECTED_APPLICANTS:
      return {
        ...state,
        NofSelected: payload
      };
    case actionType.NO_OF_NOTVIEWED_APPLICANTS:
      return {
        ...state,
        NofnotViewed: payload
      };
    case actionType.NO_OF_NEW_APPLICANTS:
      return {
        ...state,
        NofNew: payload
      };
    case actionType.EMP_JOB_CATEGORIES:
      return {
        ...state,
        Job_categories: payload
      };
    case actionType.EMP_JOB_TITLES:
      return {
        ...state,
        Job_titles: payload
      };
    case actionType.APPLICANT_DETAILS:
      return {
        ...state,
        JobApplicant: payload
      };
    case actionType.NUMBER_OF_ONE_JOB:
      return {
        ...state,
        nOfOneJobApplicants: payload
      };

    case actionType.NUMBER_OF_ONE_JOB_UNSEEN:
      return {
        ...state,
        nOfOneUnseenJobApplicants: payload
      };
    case actionType.NUMBER_OF_ONE_JOB_SELECTED:
      return {
        ...state,
        nOfOneSelectedJobApplicants: payload
      };
    case actionType.NUMBER_OF_USER_JOBS_COUNT:
      return {
        ...state,
        noOfUserJobs: payload
      };
    default:
      return state;
  }
};