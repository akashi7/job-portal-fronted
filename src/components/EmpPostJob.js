import { useState } from "react";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const EmpPostJob = ({ Categories }) => {

  const history = useHistory();

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = `https://eportalback.herokuapp.com`;


  const categoryArray = Categories.jobCategory.map(({ id, category_name }) => {
    return <option key={id}>{category_name} </option>;
  });

  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const [deadLine, setDeadLine] = useState(new Date());

  const date = new Date();
  const time = date.toLocaleString();


  const token = localStorage.getItem("auth");

  const [state, setState] = useState({
    document: {},
    message: "",
    jobTitle: "",
    description: "",
    experience: "",
    jobCategory: "",
    jobType: "",
    deadLine: time
  });

  const onDrop = File => {
    if (File.length > 0) {
      setFile(File[0].name);
      setState({ ...state, document: File[0] });
    }
  };
  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (state.jobCategory === '--Job category--' || state.jobType === '--Job type--') {
      setState({ ...state, message: "Please fill the correct selection" });
    }
    else if (!deadLine) {
      setState({ ...state, message: "Please choose deadline" });
    }

    else if (!file) {
      setState({ ...state, message: "Please upload file" });
    }

    else {

      let formData = new FormData();
      let DeadLineDate = deadLine.toLocaleDateString();
      formData.append('document', state.document);
      formData.append('jobCategory', state.jobCategory);
      formData.append('jobTitle', state.jobTitle);
      formData.append('jobType', state.jobType);
      formData.append('experience', state.experience);
      formData.append('description', state.description);
      formData.append('deadLine', DeadLineDate);

      const config = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      };

      const res = await (await fetch(`${url}/api/user/postJob`, config)).json();
      if (res.status === 200) {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
      else if (res.status === 401) {
        localStorage.clear();
        history.push(`/`);
      }
      else if (res.status === 409) {
        setLoading(false);
        setState({ ...state, message: res.error });
        setTimeout(() => {
          setState({ ...state, message: "" });
        }, 4000);
      }

    }

  };


  return (
    <div className="empPost">
      {success ? <div style={{ backgroundColor: "darkgreen", padding: "10px" }} >
        <p style={{ color: "whitesmoke" }} > Job posted succesfully </p>
      </div> : ""}
      {state.message ? <div style={{ backgroundColor: "red", padding: "10px" }}>
        <p style={{ color: "whitesmoke" }}> {state.message} </p>
      </div> : ""}
      <form onSubmit={(e) => handlePostJob(e)} >
        <input type="text" className="inputs" placeholder='Job title'
          onChange={(e) => setState({ ...state, jobTitle: e.target.value })}
          required />
        <input type="text" className="inputs" placeholder='Experience required'
          onChange={(e) => setState({ ...state, experience: e.target.value })}
          required
        />
        <select className="inputs" onChange={(e) => setState({ ...state, jobCategory: e.target.value })}
          required
        >
          <option>--Job category--</option>
          {categoryArray}
        </select>
        <select className="inputs" onChange={(e) => setState({ ...state, jobType: e.target.value })}
          required>
          <option>--Job type--</option>
          <option>Full time</option>
          <option>Part time</option>
        </select>
        <br></br>
        <div className="datePiker">
          <label>Deadline</label>
          <br></br>
          <br></br>
          <DatePicker selected={deadLine} onChange={(date) => setDeadLine(date)} />
        </div>
        <br></br>
        <div className="align">
          <Dropzone multiple={false}
            onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="zone">
                <h4 style={{ marginLeft: "19px" }}>Upload File</h4>
                <br></br>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {file.length > 0 ? <div className="selected-file">
                    {file}
                  </div>
                    : <div div className="selected-file">
                      <p>Drag and drop file here, or click to select file</p></div>
                  }
                </div>
              </section>
            )}
          </Dropzone>
          <textarea placeholder='Small description' cols={60} rows={10} className="descri"
            onChange={(e) => setState({ ...state, description: e.target.value })}
            required
          >
          </textarea> </div>

        <div className="p-but">
          {loading ? <button className="post-button" disabled>POSTING.....</button>
            : <button className="post-button">POST</button>}
        </div>
      </form>
    </div>
  );
};
