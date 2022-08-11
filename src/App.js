import './App.css';
import Buttons from './components/Buttons/Buttons';
import Grid from './components/Grid/Grid';
import githubLogo from './assets/github.png'

// Decidí utilizar un custom Hook para el funcionamiento de todo el juego, de esta forma el código está mucho más organizado.
import { useGame } from './hooks/useGame';

function App() {

  // Aquí se importan las funciones del hook.
  const { grid, rows, cols, generation, speed, selectCell, resetGrid, playGame, stopGame, changeSpeed, changeGrid, oneStep } = useGame();

  return (
    <div className="App">
      {/* Se renderizan el componente con los botones y el que contiene la grilla, pasandole a cada uno sus correspondientes props. */}
      <Buttons
        resetGrid={resetGrid}
        generation={generation}
        playGame={playGame}
        stopGame={stopGame}
        speed={speed}
        rows={rows}
        cols={cols}
        changeGrid={changeGrid}
        changeSpeed={changeSpeed}
        oneStep={oneStep}
      />
      <Grid
        grid={grid}
        rows={rows}
        cols={cols}
        selectCell={selectCell}
      />
      <div className='linksContainer'>
        <a className='patterns' target="_blank" rel='noreferrer' href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns'>Patrones de Ejemplo</a>
        <a className='github' target="_blank" rel='noreferrer' href='https://github.com/jero237/game-of-life-conway'><img src={githubLogo} alt='GitHub Logo' /> GitHub</a>
      </div>
    </div>
  );
}

export default App;
