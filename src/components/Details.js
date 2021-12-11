import { useState } from "react";

export const Details = () => {

  const [applied, setApplied] = useState(false);

  const toogleApply = () => {
    if (!applied) {
      setApplied(true);
    }
    else setApplied(false);
  };

  return (
    <>
      {!applied ? <div className="apply-job">
        <div>
          <h3>Kuranga digital ltd</h3>
          <br></br>
          <p>Category : Junior developer</p>
          <br></br>
          <p>District : Gasabo</p>
          <br></br>
          <p>Sector : Remera</p>
          <br></br>
          <p>Type : Full-time</p>
          <br></br>
        </div>
        <br></br>
        <div className="description">
          <p>Description :</p>
          <br></br>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <br></br>
          <p>Requirements :</p>
          <br></br>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <button className="apply-btn" onClick={() => toogleApply()} >Apply</button>
      </div> :
        <div className="apply-job">
          <form>
            <input placeholder="Full names" className="inputJ" />
            <input placeholder="Address" className="inputJ" />
            <input placeholder="Email" className="inputJ" type="email" />
            <div className="style">
              <label>Upload CV :</label>
              <input type="file" placeholder="Upload your CV" className="file" />
            </div>
            <div className="style">
              <label>Upload Cover letter : </label>
              <input type="file" placeholder="Upload your cover letter" className="file" />
            </div>
          </form>
          <br></br>
          <button className="apply-btn" >SEND</button>
          <button className="apply-btns" onClick={() => setApplied(false)} >back</button>
        </div>
      }
    </>
  );
};
