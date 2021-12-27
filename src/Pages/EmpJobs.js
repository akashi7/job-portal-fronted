import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { EmpNavBar } from "../components/AppBar";
import { useHistory } from "react-router-dom";
import { EmpViewJobs } from "../components/EmpViewJobs";


export const EmpJobs = () => {

  const history = useHistory();
  const token = localStorage.getItem("auth");

  const { EmpJobs, EmpViewAllJobs } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/signIn');
      }
      else {
        await EmpViewAllJobs(token);
      }

    })();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="dashboard">
      <EmpNavBar />
      <EmpViewJobs Jobs={EmpJobs} />
    </div>
  );
};
