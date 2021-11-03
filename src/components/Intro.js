import image1 from '../Images/pp.jpg';

export const Intro = () => {
  return (
    <div className="intro">
      <div className="intro-div">
        <img alt="photo" src={image1} className="me" />
        <div style={{ color: "whitesmoke" }} className="myintro">
          <h2 style={{ color: "#f7c52a" }} >HELLO I AM NSEKO KABUTO christian</h2>
          <br></br>
          <h3 style={{ color: "#f7c52a" }}> I am a full stack developer </h3>
          <br></br>
          <p style={{ color: "#f7c52a" }}>eager to contribute my skills to the society and help them solve problems they face, love to learn new things to improve my skills</p>
        </div>
      </div>
    </div>
  );
};
