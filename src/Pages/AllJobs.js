import { HomeBar, HomeFooter } from "../components/AppBar";
import { Slides } from "../components/Slides";
import { JobDetails } from "../components/JobDetails";

export default function AllJobs() {
  return (
    <div>
      <HomeBar />
      <Slides />
      <JobDetails />
      <HomeFooter />
    </div>
  );
}
