import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { EmpNavBar } from "../components/AppBar";
import { EmpPostJob } from "../components/EmpPostJob";
import { useHistory } from "react-router-dom";

export default function PostJob() {

  const { fetchCategories, Categories } = useContext(AppContext);

  const token = localStorage.getItem("auth");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        try {
          await fetchCategories();
        } catch (error) {
          alert("server error");
        }
      }

    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard">
      <EmpNavBar />
      <EmpPostJob Categories={Categories} />
    </div>
  );
};
