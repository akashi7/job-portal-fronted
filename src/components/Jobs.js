
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
    <div className='job-portal-all' >
      <div className="portal">
        {Categories.jobCategory.map(({ id, category_name }) => {
          return (
            <div key={id} className="job-d">
              <h3>{category_name}</h3>
              <br></br>
              <div className="category">
                <img src={dev} className="pics" alt="dev" />
                <br></br>
                <button className="button" onClick={() => goViewJobs(category_name)}>Browse</button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
