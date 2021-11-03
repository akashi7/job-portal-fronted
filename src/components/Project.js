
const urugoPay = (e) => {
  e.preventDefault();
  window.location.href = 'https://play.google.com/store/apps/details?id=com.akashichris';
};
const audioShic = (e) => {
  e.preventDefault();
  window.location.href = 'https://audioshic.netlify.app/';
};
const replico = (e) => {
  e.preventDefault();
  window.location.href = 'https://replico.herokuapp.com/';
};
const vplay = (e) => {
  e.preventDefault();
  window.location.href = 'https://play.google.com/store/apps/details?id=com.akashiaudio';
};

export const Project = () => {
  return (
    <div className="project" id="id" >
      <h3 style={{ color: "whitesmoke" }}>PROJECTS</h3>
      <br></br>
      <div className="myprojects">
        <div className="first" >
          <div className="projects">
            <h3 style={{ color: "#f7c52a" }}>urugo pay</h3>
            <br></br>
            <p>An android application which help employers in easy managing his/her maids,
              employer can register new maid if not found in the system,
              also easy pay his/her maid using the application.
            </p>
            <button className="button" onClick={(e) => urugoPay(e)}  >View application</button>
          </div>
          <div className="projects">
            <h3 style={{ color: "#f7c52a" }}>Audio shic</h3>
            <br></br>
            <p>A web streaming application which enables users to post music and stream music.</p>
            <button className="button" onClick={(e) => audioShic(e)}>View application</button>
          </div>
        </div>
        <div className="second" >
          <div className="projects">
            <h3 style={{ color: "#f7c52a" }}>Replico</h3>
            <br></br>
            <p>A web application which enables users to post forums and to comment on forums posted.</p>
            <button className="button" onClick={(e) => replico(e)}>View application</button>
          </div>
          <div className="projects">
            <h3 style={{ color: "#f7c52a" }}>V play</h3>
            <br></br>
            <p>An android application which play music files from phone storage.</p>
            <button className="button" onClick={(e) => vplay(e)}>View application</button>
          </div>
        </div>
      </div>
    </div>
  );
};
