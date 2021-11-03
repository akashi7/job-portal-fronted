import { AppHeader } from './components/AppHeader';
import './App.css';
import { Intro } from './components/Intro';
import { Project } from './components/Project';
import { Contactme } from './components/Contactme';
import { About } from './components/About';

function App() {
  return (
    <div >
      <AppHeader />
      <div className="sections">
        <Intro />
        <Project />
      </div>
    </div>
  );
}

export default App;
