import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { HomeBar, HomeFooter } from "../components/AppBar";
import { Slides } from "../components/Slides";
import { JobDetails } from "../components/JobDetails";

export default function AllJobs() {
  const { Jobs, viewAllJobs, Categories, fetchCategories } = useContext(AppContext);
  const categoryName = localStorage.getItem("category");

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await viewAllJobs(categoryName);
    })();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <HomeBar />
      <Slides Categories={Categories} />
      <JobDetails Jobs={Jobs} />
      <HomeFooter />
    </div>
  );
}
