import { useState } from 'react';
import connect from '../Images/connection.png';
import { useHistory } from "react-router-dom";

export const Signin = () => {

  const history = useHistory();

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = `https://eportalback.herokuapp.com`;


  const initialState = {
    username: "",
    password: "",
    message: ""
  };

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(initialState);

  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(state)
    };

    try {
      const res = await (await fetch(`${url}/api/auth/empLogin`, config)).json();
      if (res.status === 200) {
        localStorage.setItem("auth", res.token);
        history.push("/Dashboard");
      }
      if (res.status === 300) {
        setLoading(false);
        setState({ ...state, message: res.message });
        setTimeout(() => {
          setState({ ...state, message: "" });
        }, 4000);
      }
      if (res.status === 409) {
        setLoading(false);
        setState({ ...state, message: res.error });
        setTimeout(() => {
          setState({ ...state, message: "" });
        }, 4000);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }


  };


  return (
    <div className="signin-div">
      <div className="lefts">
        <div className="center">
          <button className="apply-btnv" onClick={() => history.push("/signUp")}>Register</button>
        </div>
      </div>
      <div className="rights">
        {state.message ? <div style={{ backgroundColor: "red", padding: "8px" }}  >
          <p style={{ color: "whitesmoke" }} > {state.message} </p>
        </div> : ""}
        <div className="fles">
          <img alt="connect" src={connect} className="connectImage" />
          <div className="nav-link">
            <h3 className="one">Let's</h3>
            <h3 className="two">Connect</h3>
          </div>
        </div>
        <br></br>
        <br></br>
        {error ? <div style={{ backgroundColor: "red", padding: "5px", color: "white" }}>
          <p> Server Error occured </p>

        </div> : ""}
        <br />
        <form onSubmit={(e) => handleLogin(e)} >
          <input type="text" placeholder="Email" className="input" required
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
          <input type="password" placeholder="Password" className="input" required
            onChange={(e) => setState({ ...state, password: e.target.value })} />
          {loading ? <button className="apply-btn" disabled>loading....</button>
            : <button className="apply-btn">Sign In</button>}
        </form>
      </div>
    </div>
  );
};
