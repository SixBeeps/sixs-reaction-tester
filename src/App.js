import './App.css';
import Game from './Game'
import Modal from './Modal';
import { useState } from 'react';
import { CursorPointer, ChatBubbleQuestion } from 'iconoir-react'

function App() {
  const [showHelp, setShowHelp] = useState(false)
  const [easterCount, setEasterCount] = useState(false)

  return (
    <div className="app">
      <div className="appHeader">
        <div className='row'>
          <CursorPointer className={easterCount % 2 === 1 ? "easter easterActive" : "easter"} onClick={() => {
            setEasterCount(easterCount + 1)
          }}/>
          <h1>Six&apos;s Reaction Tester</h1>
        </div>
        <h2>for CSDS221 Final Project</h2>
        <button className="helpButton" onClick={() => setShowHelp(true)}>?</button>
      </div>
      <div className="appContents">
        <Game />
        <Modal isOpen={showHelp} onClose={() => setShowHelp(false)}>
          <div className='row'>
            <h1>How To Play</h1>
            <ChatBubbleQuestion />
          </div>
          <p>
            Click "Start" to begin the game. Click the highlighted cells as fast as you can to score points.</p>
          <p>
            The game ends when the timer runs out or you click the wrong cell.
          </p>
          <p>
            You can change the grid size and game time in the settings.
          </p>
          <p>
            Good luck! Created by Brandon Lee / SixBeeps (bcl56@case.edu) for CSDS221 Intro to Full Stack.
          </p>
          <button onClick={() => setShowHelp(false)}>Got it</button>
        </Modal>
        <Modal isOpen={easterCount === 5} onClose={() => setEasterCount(easterCount + 1)}>
          <div className='row'>
            <h1>Easter Egg</h1>
            <CursorPointer />
          </div>
          <p>
            Congratulations! You found the easter egg! You can close this window now.
          </p>
          <p>
            (Hint: there are no more easter eggs, <em>especially not one that requires you to click the cursor 100 times</em>...)
          </p>
          <button onClick={() => setEasterCount(easterCount + 1)}>Close</button>
        </Modal>
      </div>
    </div>
  );
}

export default App;
