import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import slideOne from '../Images/three.jpg';


export const Slides = ({ Categories }) => {

  const history = useHistory();

  const categoryArray = Categories.jobCategory.map(({ id, category_name }) => {
    return <option key={id}>{category_name} </option>;
  });


  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);
  const navigateToCategory = (e) => {
    e.preventDefault();
    console.log(category);
    if (category === '--Search category---' || !category) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
    else {
      localStorage.setItem("category", category);
      history.push("/jobs");
    }
  };

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
        <br />
        {error ? <p style={{ color: "red" }} > choose category  </p> : ""}
        <form className="form"  >
          <select className="select" onChange={(e) => setCategory(e.target.value)}  >
            <option>--Search category---</option>
            {categoryArray}
          </select>
          <button className="button" onClick={(e) => navigateToCategory(e)} >Search</button>
        </form>
      </div>
      <div className="slideshow-container">
        <img src={slideOne} alt="one" className="imgOne" />
      </div>
    </div>
  );
};
