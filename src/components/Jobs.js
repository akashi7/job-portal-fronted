
// import manager from '../Images/manager.png';
// import account from '../Images/account.png';
import dev from '../Images/dev.png';
import { useHistory } from 'react-router-dom';

export const Jobs = ({ Categories }) => {

  const history = useHistory();

  const goViewJobs = (categName) => {
    localStorage.setItem("category", categName);
    history.push("/jobs");
  };

  return (
    <div className="portal">
      {Categories.jobCategory.map(({ id, category_name, positions }) => {
        return (
          <div key={id} className="job-d">
            <h3>{category_name}</h3>
            <br></br>
            {!positions ? <button className="round">0</button> : <button className="round"> {positions} </button>}
            <br></br>
            <br></br>
            <div className="category">
              <img src={dev} className="pics" alt="dev" />
              <br></br>
              {positions === '0' ? <button className="button" disabled >Browse</button>
                : <button className="button" onClick={() => goViewJobs(category_name)}>Browse</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
