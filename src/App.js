import './App.css';
import Die from './components/Die';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const firtDieValue = dice[0].value;

    const isComplited = dice.every((die) => {
      return die.isHeld && die.value === firtDieValue;
    });

    if (isComplited) {
      setTenzies(true);
    }
  }, [dice])

  function randomNumber(min, max) { 
    return  Math.floor(Math.random() * (max - min) + min);
  }

  function generateNewDie() {
    return {
      id: nanoid(),
      value: randomNumber(1, 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; ++i) {
      newDice.push(generateNewDie());
    }

    return newDice;
  }

  function holdDice(id) {
    setDice((prevDice) =>  prevDice.map(die => {
      if (die.id === id) {
        return {
          ...die,
          isHeld: !die.isHeld,
        };
      }

      return die;
    }));
  }

  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  function rollDice() {
    setDice((prevDice) =>  prevDice.map(die => die.isHeld? die : generateNewDie()));
  }

  const diceElements = dice.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} hold={holdDice.bind(null, die.id)} />)

  return (
    <main className='board'>
      {tenzies && <Confetti />}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className='die-container'>
        {diceElements}
      </div>

      {
        tenzies?
          <button className='button' onClick={newGame}>
            <span className='button--text'>New game</span>
          </button>
        :
        <button className='button' onClick={rollDice}>
          <span className='button--text'>Roll dice</span>
        </button>
      }
    </main>
  );
}

export default App;
