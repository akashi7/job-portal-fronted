import { HomeBar, HomeFooter } from "../components/AppBar";
import { Slides } from "../components/Slides";
import { Details } from "../components/Details";

export const JobDetail = () => {
  return (
    <div>
      <HomeBar />
      <Slides />
      <Details />
      <HomeFooter />
    </div>
  );
};
