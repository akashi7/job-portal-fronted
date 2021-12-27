import { useState } from 'react';
import { useHistory } from "react-router-dom";

export const Password = ({ token }) => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const history = useHistory();

  const initialState = {
    message: "",
    success: "",
    password: "", confirmPassword: "", oldPassword: ""
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {

    e.preventDefault();

    setLoading(true);

    const config = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/user/updatePassword`, config)).json();

    if (res.status === 200) {
      setLoading(false);
      setState({ ...state, success: "Password updated succesfully" });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }

    else if (res.status === 301) {
      setLoading(false);
      setState({ ...state, message: res.message });
      setTimeout(() => {
        setState({ ...state, message: '' });
      }, 4000);
    }

    else if (res.status === 305) {
      setLoading(false);
      setState({ ...state, message: res.message });
      setTimeout(() => {
        setState({ ...state, message: '' });
      }, 4000);
    }

    else if (res.status === 409) {
      setLoading(false);
      setState({ ...state, message: res.error });
      setTimeout(() => {
        setState({ ...state, message: '' });
      }, 4000);
    }

    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }
  };

  return (
    <div className="search_P">
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      {state.success ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          {state.success}
        </div> : ""}
      <br></br>
      <p>CHANGE PASSWORD</p>
      <form onSubmit={(e) => handleUpdate(e)} >
        <input placeholder="New Password" type="password" className="inputsv" onChange={(e) => setState({ ...state, password: e.target.value })} />
        <input placeholder="Confirm password" type="password" className="inputsv" onChange={(e) => setState({ ...state, confirmPassword: e.target.value })} />
        <input placeholder="Old  password" type="password" className="inputsv" onChange={(e) => setState({ ...state, oldPassword: e.target.value })} />
        {loading ? <button className="buttonk" >LOADING......</button>
          : <button className="buttonk" >SEND</button>}
      </form>
    </div>
  );
};
