import { useContext, useEffect, useState } from "react";
import { HomeBar, HomeFooter } from "../components/AppBar";
import { AppContext } from "../context/AppContext";
import { Slides } from "../components/Slides";
import { Jobs } from "../components/Jobs";

export default function Home() {

  const { Categories, fetchCategories } = useContext(AppContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await fetchCategories();
      } catch (error) {
        setError(true);
      }
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <HomeBar />
      {error ? <div style={{ textAlign: 'center', fontSize: '2rem', height: '75vh' }}>
        Server Error occured
      </div> : (
        <>
          <Slides Categories={Categories} />
          <Jobs Categories={Categories} />
        </>
      )}
      <HomeFooter />
    </div>
  );
};
