
import slideOne from '../Images/three.jpg';


export const Slides = ({ Categories }) => {

  const categoryArray = Categories.jobCategory.map(({ id, category_name }) => {
    return <option key={id}>{category_name} </option>;
  });



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
            {categoryArray}
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
