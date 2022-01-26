import { useEffect } from "react";
import { EmpNavBar } from "../components/AppBar";
import { useHistory } from "react-router-dom";
import { Password } from "../components/Password";

export default function Profile() {
  const history = useHistory();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/signIn');
      }
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="profi">
      <EmpNavBar />
      <Password token={token} />
    </div>
  );
};
