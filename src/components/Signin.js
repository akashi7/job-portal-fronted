import connect from '../Images/connection.png';
import { useHistory } from "react-router-dom";

export const Signin = () => {

  const history = useHistory();


  return (
    <div className="signin-div">
      <div className="lefts">
        <div className="center">
          <button className="apply-btnv" onClick={() => history.push("/signUp")}>Register</button>
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
          <input type="password" placeholder="Password" className="inputs" />
          <button className="apply-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};
