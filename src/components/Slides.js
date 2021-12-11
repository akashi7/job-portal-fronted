import slideOne from '../Images/three.jpg';

export const Slides = () => {

  return (
    <div className="slides">
      <div className="left">
        <div>
          <p style={{ color: "white" }}>
            Find your dream job instantly
          </p>
        </div>
        <br></br>
        <p style={{ color: "white" }}>Search job by category</p>
        <form className="form">
          <select className="select">
            <option>--Search category---</option>
            <option>Software developer</option>
            <option>Human resources</option>
            <option>Database engineer</option>
            <option>Accountant</option>
          </select>
          <button className="button">Search</button>
        </form>
      </div>
      <div className="slideshow-container">
        <img src={slideOne} alt="one" className="imgOne" />
      </div>
    </div>
  );
};
