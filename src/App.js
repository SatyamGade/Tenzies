import './App.css';
import Text from './components/Text';
import Die from './components/Dies';
import Btn from './components/Btn';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const generateArr = () => {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      });
    }
    return newArr;
  }

  const [dies, setDies] = useState(generateArr());
  const [tenzies, setTenzies] = useState(false);

  function clickOnDie (id){
    setDies(oldDies => oldDies.map((die=>{
      return die.id === id ? {...die, isHeld: !die.isHeld} : die;
    })))
  }

  const elements = (
    dies.map(((die) => {
      return <Die value={die.value} key={die.id} isHeld={die.isHeld} clickOnDie={()=> clickOnDie(die.id)}/>
    }))
  )

  const rollDies = () => {
    if(!tenzies){
      setDies(oldDies => oldDies.map(die=>{
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)};
      }));
    }else{
      setTenzies(false);
      setDies(generateArr());
    }
  }

  useEffect(()=>{
    const allHeld = dies.every(die => die.isHeld);
    const firstDieVal = dies[0].value;
    const allSameVal = dies.every(die => die.value === firstDieVal);
    if(allHeld && allSameVal){
      setTenzies(true);
      alert("you win!");
    }else if(allHeld && !allSameVal){
      alert("you loose!")
      setDies(generateArr());
    }
  },[dies])

  return (
    <main>
      {tenzies && <Confetti/>}
      <div className="container">
        <Text />
        <div className="dies">
          {elements}
        </div>
        <Btn onClick={rollDies} tenzies={tenzies}/>
      </div>
    </main>
  );
}

export default App;
