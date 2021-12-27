import { useContext, useEffect } from "react";
import { HomeBar, HomeFooter } from "../components/AppBar";
import { AppContext } from "../context/AppContext";
import { Slides } from "../components/Slides";
import { Jobs } from "../components/Jobs";

export const Home = () => {

  const { Categories, fetchCategories } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <HomeBar />
      <Slides Categories={Categories} />
      <Jobs Categories={Categories} />
      <HomeFooter />
    </div>
  );
};
