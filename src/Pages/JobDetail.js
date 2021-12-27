import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { HomeBar, HomeFooter } from "../components/AppBar";
import { Slides } from "../components/Slides";
import { Details } from "../components/Details";

export const JobDetail = () => {

  const { Categories, fetchCategories, oneJob, viewJob } = useContext(AppContext);
  const jobId = localStorage.getItem("jId");

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await viewJob(jobId);
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <HomeBar />
      <Slides Categories={Categories} />
      <Details jobView={oneJob} />
      <HomeFooter />
    </div>
  );
};
