import { HomeBar, HomeFooter } from "../components/AppBar";
import { Slides } from "../components/Slides";
import { Jobs } from "../components/Jobs";

export const Home = () => {
  return (
    <div>
      <HomeBar />
      <Slides />
      <Jobs />
      <HomeFooter />
    </div>
  );
};
