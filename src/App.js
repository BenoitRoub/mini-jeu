import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Jeu from "./Components/Jeu";
import Snake from "./Components/Snake";
import MasterMind from "./Components/MasterMind";

function App() {
  const [jeu, setJeu] = useState(false);
  const [mastermind, setMasterMind] = useState(false);
  const [snake, setSnake] = useState(false);
  return (
    <div className="App">
      {jeu ? <Jeu /> : null}
      {mastermind ? <MasterMind /> : null}
      {snake ? <Snake /> : null}
      <div style={{ position: "absolute", top: "90vh", left: "40vw" }}>
        {jeu ? null : (
          <button
            onClick={() => {
              setJeu(true);
              setMasterMind(false);
              setSnake(false);
            }}
          >
            Jouer a starve
          </button>
        )}
        {snake ? null : (
          <button
            onClick={() => {
              setMasterMind(false);
              setJeu(false);
              setSnake(true);
            }}
          >
            Jouer a snake
          </button>
        )}
        {mastermind ? null : (
          <button
            onClick={() => {
              setSnake(false);
              setJeu(false);
              setMasterMind(true);
            }}
          >
            Jouer a mastermind
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
