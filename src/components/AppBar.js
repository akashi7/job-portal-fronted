import connect from '../Images/connection.png';
import { useHistory } from "react-router-dom";

export const HomeBar = () => {

  const history = useHistory();

  return (
    <div className="homeBar">
      <div className="links">
        <img alt="connect" src={connect} className="connectImage" onClick={() => history.push("/")} />
        <div className="nav-link" onClick={() => history.push("/")}>
          <h3 className="one">Let's</h3>
          <h3 className="two">Connect</h3>
        </div>
      </div>
      <div className="link">
        <button onClick={() => history.push("/signIn")} >Sign In</button>
        <button onClick={() => history.push("/signUp")}>Employers Registration</button>
      </div>
    </div>
  );
};

export const HomeFooter = () => {
  return (
    <div className="Footer">
      <div className="LEFT">
        <h4>Links</h4>
        <br></br>
        <p>Contact us</p>
        <p>About us</p>
      </div>
      <div className="MIDDLE">
        <h4>Contact us</h4>
        <br></br>
        <div>
          <p>Telephone</p>
          <p>+250781273704</p>
        </div>
        <div>
          <p>Email</p>
          <p>connect@info.com</p>
        </div>
      </div>
      <div className="RIGTH">
        <h4>Address</h4>
        <br></br>
        <div>
          <p>Street</p>
          <p> KN 5 Rd, KG 9 Ave, Kigali-Rwanda</p>
        </div>
      </div>
    </div>
  );
};
