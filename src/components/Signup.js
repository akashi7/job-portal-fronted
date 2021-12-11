import connect from '../Images/connection.png';
import { useHistory } from "react-router-dom";

export const Signup = () => {

  const history = useHistory();

  return (
    <div className="signin-div">
      <div className="lefts">
        <div className="center">
          <button className="apply-btnv" onClick={() => history.push("/signIn")} >Sign in</button>
        </div>
      </div>
      <div className="rights">
        <div className="fles">
          <img alt="connect" src={connect} className="connectImage" />
          <div className="nav-link">
            <h3 className="one">Let's</h3>
            <h3 className="two">Connect</h3>
          </div>
        </div>
        <br></br>
        <br></br>
        <form>
          <input type="email" placeholder="Email" className="inputs" />
          <input type="text" placeholder="Full names" className="inputs" />
          <input type="text" placeholder="Phone number" className="inputs" />
          <input type="text" placeholder="ID" className="inputs" />
          <input type="password" placeholder="Password" className="inputs" />
          <input type="password" placeholder="Confirm password" className="inputs" />
          <button className="apply-btn">Sign up</button>
        </form>
      </div>
    </div>
  );
};
