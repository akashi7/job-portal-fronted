import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaUsers } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";

export const DashBar = () => {



  const {
    NofJobs, numberOfJobs, NofApplicants,
    numberOfApplicants, NofSelected,
    numberOfSelectedApplicants, NofnotViewed,
    numberOfNotviewedApplicants, NofNew,
    numberOfNewApplicants
  } = useContext(AppContext);

  const token = localStorage.getItem("auth");

  useEffect(() => {
    (async () => {
      try {
        await numberOfJobs(token);
        await numberOfApplicants(token);
        await numberOfSelectedApplicants(token);
        await numberOfNotviewedApplicants(token);
        await numberOfNewApplicants(token);
      } catch (error) {
        alert("server Error");
      }
    })();
    //eslint-disable-next-line
  }, []);

  const history = useHistory();

  return (
    <div className="dashbar">
      <div className="dashbar1"
        onClick={
          () => history.push('/Dashboard')
        }
      >
        <div className="arrange">
          <FaBriefcase size={40} color="darkgray" />
          <div className="oneT">
            <h4>Jobs</h4>
            <br />
            {NofJobs.map(({ alljobs }) => {
              return (
                <p key={1} style={{ color: "darkblue" }} > {alljobs} </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="dashbar2"
        onClick={
          () => history.push('/applicants')
        }
      >
        <div className="arrange">
          <FaUsers size={40} color="darkblue" />
          <div className="twoK">
            <h4>Total</h4>
            <br />
            {NofApplicants.map(({ allApp }) => {
              return (
                <p key={2} style={{ color: "green" }}  > {allApp} </p>
              );
            })}
          </div>
        </div>

      </div>
      <div className="dashbar3"
        onClick={
          () => history.push('/applicants/selected')
        }
      >
        <div className="arrange">
          <FaUsers size={40} color="darkgreen" />
          <div className="three">
            <h4>Selected </h4>
            <br />
            {NofSelected.map(({ allselected }) => {
              return (
                <p key={8} style={{ color: "darkgreen" }} > {allselected} </p>
              );
            })}
          </div>
        </div>

      </div>
      <div className="dashbar4"
        onClick={
          () => history.push('/applicants/notviewed')
        }
      >
        <div className="arrange">
          <FaUsers size={40} color="rgb(247, 88, 88)" />
          <div className="four">
            <h4>Not Viewed</h4>
            <br />
            {NofnotViewed.map(({ allnotviewed }) => {
              return (
                <p key={11} style={{ color: "red" }} > {allnotviewed} </p>
              );
            })}
          </div>
        </div>

      </div>
      <div className="dashbar5"
        onClick={
          () => history.push('/applicants/new')
        }>
        <div className="arrange">
          <FaUsers size={40} color="#009879" />
          <div className="five">
            <h4>New</h4>
            <br />
            {NofNew.map(({ allnew }) => {
              return (
                <p key={15} style={{ color: "red" }} > {allnew} </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
