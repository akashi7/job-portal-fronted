import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { HomeBar, HomeFooter } from "../components/AppBar";
import { Slides } from "../components/Slides";
import { JobDetails } from "../components/JobDetails";

export default function AllJobs() {
  const { Jobs, viewAllJobs, Categories, fetchCategories, UsercountJobs, noOfUserJobs } = useContext(AppContext);
  const categoryName = localStorage.getItem("category");


  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await fetchCategories();
        await viewAllJobs(categoryName);
        await UsercountJobs(categoryName);
      } catch (error) {
        setError(true);
      }
    })();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <HomeBar />
      {error ? <div style={{ height: "90vh", textAlign: "center" }}>
        <p>Server Error occured</p>
      </div> : (
        <>
          <Slides Categories={Categories} />
          <JobDetails Jobs={Jobs} count={noOfUserJobs} />
          <HomeFooter />
        </>
      )}
    </div>
  );
}
