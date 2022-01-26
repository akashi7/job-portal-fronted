import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { FaUsers } from "react-icons/fa";

export const OneDashBar = () => {

  const {
    nOfOneJobApplicants, oneJobApplicants,
    nOfOneUnseenJobApplicants, oneJobUnseenApplicants,
    nOfOneSelectedJobApplicants, oneJobSelectedApplicants

  } = useContext(AppContext);

  const token = localStorage.getItem("auth");

  const jobId = localStorage.getItem("EmJid");

  useEffect(() => {
    (async () => {
      try {
        await oneJobApplicants(token, jobId);
        await oneJobUnseenApplicants(token, jobId);
        await oneJobSelectedApplicants(token, jobId);
      } catch (error) {
        alert("server Error");
      }
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="oneDash" >
      <div className="oneDash1">
        <div className="arrange">
          <FaUsers size={40} color="darkblue" />
          <div className="fourK">
            <h4>Total</h4>
            <br />
            {nOfOneJobApplicants.map(({ jobApplicants }) => {
              return <p key={3} > {jobApplicants} </p>;
            })}
          </div>
        </div>
      </div>
      <div className="oneDash2">
        <div className="arrange">
          <FaUsers size={40} color="rgb(247, 88, 88)" />
          <div className="fourK">
            <h4>Unseen</h4>
            <br />
            {nOfOneUnseenJobApplicants.map(({ unSeenApplicants }) => {
              return <p key={8}> {unSeenApplicants} </p>;
            })}
          </div>
        </div>
      </div>
      <div className="oneDash3">
        <div className="arrange">
          <FaUsers size={40} color="darkgreen" />
          <div className="fourK">
            <h4>Selected</h4>
            <br />
            {nOfOneSelectedJobApplicants.map(({ selectedApplicants }) => {
              return <p key={10} > {selectedApplicants} </p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
