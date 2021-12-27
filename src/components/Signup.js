import { useState } from 'react';
import connect from '../Images/connection.png';
import { useHistory } from "react-router-dom";

export const Signup = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const history = useHistory();

  const initialState = {
    email: "",
    company: "",
    full_names: "",
    phone: "",
    message: ""
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [state, setState] = useState(initialState);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(state)
    };
    const res = await (await fetch(`${url}/api/auth/empRegister`, config)).json();
    if (res.status === 200) {
      setSuccess(true);
    }
    if (res.status === 305) {
      setLoading(false);
      setState({ ...state, message: res.message });
      setTimeout(() => {
        setState({ ...state, message: "" });
      }, 4000);
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

  };

  return (
    <div className="signin-div">
      <div className="lefts">
        <div className="center">
          <button className="apply-btnv" onClick={() => history.push("/signIn")} >Sign in</button>
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
        {success ? <div className='sent'>
          <p>An email was sent to {state.email} </p>
        </div> :
          <form onSubmit={(e) => handleSignUp(e)} >
            <input type="email" placeholder="Email" className="input" required
              onChange={(e) => setState({ ...state, email: e.target.value })} />
            <input type="text" placeholder="Full names" className="input" required
              onChange={(e) => setState({ ...state, full_names: e.target.value })} />
            <input type="text" placeholder="Phone number" className="input" required
              onChange={(e) => setState({ ...state, phone: e.target.value })} />
            <input type="text" placeholder="Company" className="input" required
              onChange={(e) => setState({ ...state, company: e.target.value })} />
            {loading ? <button className="apply-btn" disabled >loading.....</button> :
              <button className="apply-btn">Sign up</button>}
          </form>}
      </div>
    </div>
  );
};
