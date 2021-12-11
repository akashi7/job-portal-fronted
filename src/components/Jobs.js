import manager from '../Images/manager.png';
import account from '../Images/account.png';
import dev from '../Images/dev.png';
import { useHistory } from 'react-router-dom';

export const Jobs = () => {

  const history = useHistory();

  return (
    <div className="portal">
      <div className="job-d">
        <h3>Junior developer</h3>
        <br></br>
        <button className="round">8</button>
        <br></br>
        <br></br>
        <div className="category">
          <img src={dev} className="pics" alt="dev" />
          <br></br>
          <button className="button" onClick={() => history.push("/jobs")}>Browse</button>
        </div>
      </div>
      <div className="job-d">
        <h3>Manager</h3>
        <br></br>
        <button className="round">8</button>
        <br></br>
        <br></br>
        <div className="category">
          <img src={manager} className="pics" alt="dev" />
          <br></br>
          <button className="button" onClick={() => history.push("/jobs")}>Browse</button>
        </div>
      </div>
      <div className="job-d">
        <h3>Accountant</h3>
        <br></br>
        <button className="round">8</button>
        <br></br>
        <br></br>
        <div className="category">
          <img src={account} className="pics" alt="dev" />
          <br></br>
          <button className="button" onClick={() => history.push("/jobs")}>Browse</button>
        </div>
      </div>
      <div className="job-d">
        <h3>Accountant</h3>
        <br></br>
        <button className="round">8</button>
        <br></br>
        <br></br>
        <div className="category">
          <img src={account} className="pics" alt="dev" />
          <br></br>
          <button className="button" onClick={() => history.push("/jobs")}>Browse</button>
        </div>
      </div>
      <div className="job-d">
        <h3>Junior developer</h3>
        <br></br>
        <button className="round">8</button>
        <br></br>
        <br></br>
        <div className="category">
          <img src={dev} className="pics" alt="dev" />
          <br></br>
          <button className="button" onClick={() => history.push("/jobs")}>Browse</button>
        </div>
      </div>
      <div className="job-d">
        <h3>Manager</h3>
        <br></br>
        <button className="round">8</button>
        <br></br>
        <br></br>
        <div className="category">
          <img src={manager} className="pics" alt="dev" />
          <br></br>
          <button className="button" onClick={() => history.push("/jobs")}>Browse</button>
        </div>
      </div>
    </div>
  );
};
