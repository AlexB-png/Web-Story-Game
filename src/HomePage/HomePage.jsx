import { useEffect, useState } from 'react';
import { useNavigate, Link, redirect } from "react-router-dom";
import './HomePage.scss'
import eventsData from './Events.json';

// Difficulty Classes //
class Easy {
  constructor() {
    this.color = "rgb(151, 255, 77)"
    this.Name = 'Easy'
    this.Height = 9
    this.FinalChar = 'D'  // 10 Width
    this.RebelChance = 20 // % chance of rebel attack instead of event // Roughly 2 Attacks
    this.Grace = 2 // Grace Period In Turns
    this.StarterMoney = 30
    this.Multiplier = 1
  }
}

class Medium {
  constructor() {
    this.color = "rgb(255, 215, 82)"
    this.Name = "Medium"
    this.Height = 7
    this.FinalChar = 'O' // 15 Width
    this.RebelChance = 20 // % chance of rebel attack instead of event // Roughly 3 Attacks
    this.Grace = 1 // Grace Period In Turns
    this.StarterMoney = 20
    this.Multiplier = 1.25
  }
}

class Hard {
  constructor() {
    this.color = "rgb(255, 77, 77)"
    this.Name = "Hard"
    this.Height = 5
    this.FinalChar = 'T' // 20 Width
    this.RebelChance = 20 // % chance of rebel attack instead of event // Roughly 4 attacks
    this.Grace = 0 // Grace Period In Turns
    this.StarterMoney = 10
    this.Multiplier = 1.5
  }
}
//

// This is the bridge between the start, movement and the events //
export function GamePage(LoginStatus) {
  const [playerLocation, setPlayerLocation] = useState("A1")
  const [renderPage, setRenderPage] = useState("Intro")

  switch (renderPage) {
    case "Intro":
      return <Difficulty LoginStatus={LoginStatus} setRenderPage = {setRenderPage}/>
    case "Move":
      return <Home LoginStatus={LoginStatus} playerLocation={playerLocation} setPlayerLocation={setPlayerLocation} setRenderPage={setRenderPage} renderPage = {renderPage}/>
    case "Event":
      return <Event LoginStatus={LoginStatus} setRenderPage={setRenderPage} playerLocation={playerLocation}/>
    case "Boss":
      return <Boss />
  }
}
//

function Difficulty({ LoginStatus , setRenderPage }) {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState(() => new Easy())

  // I don't like url manipulation //
  useEffect(() => {
    if (LoginStatus.LoginStatus === false) {
      navigate("/")
    }
  }, [LoginStatus])
  //

  var Text = 'Choose A Difficulty'
  
  return(
    <>
    <div className='Selection'>
      <div className='Difficulty'>
        <h1>{Text}</h1>

        <button onClick={() => setDifficulty(new Easy())}>Easy Mode</button>
        <button onClick={() => setDifficulty(new Medium())}>Medium Mode</button>
        <button onClick={() => setDifficulty(new Hard())}>Hard Mode</button>

        

        <button onClick={() => setRenderPage("Move")}>Continue!</button>
      </div>
      <div style={{color: difficulty.color}} className='Explanation'>
        <h1 >{difficulty.Name}</h1>
        <h1>TEST2</h1>
      </div>
    </div>
    </>
  )
}

// This is where the movement happens // 
function Home({ LoginStatus, playerLocation, setPlayerLocation, setRenderPage, renderPage }) {
  const navigate = useNavigate();

  const MaxRows = 9 // set to a multiple of 2x+1
  const FinalColumn = Difficulty.FinalChar


  // Takes UTF 16 code of the character, then increments by 1 to get new character //
  function NextCharacter(character) {
    var code = character.charCodeAt(0)
    code += 1
    return String.fromCharCode(code)
    }
  
  //

  // I don't like url manipulation //
  useEffect(() => {
    if (LoginStatus.LoginStatus === false) {
      navigate("/")
    }
  }, [LoginStatus])
  //

  // Update Player Location every time it updates //
  useEffect(() => {
    var upButton = document.getElementById("UpButton")
    var downButton = document.getElementById("DownButton")

    var RowNum = playerLocation[1] // EXAMPLE A"1"

    if (RowNum == 1) {
      console.log("Up Button Not Shown")
      upButton.disabled = true
    } else {
      upButton.disabled = false
    }

    if (RowNum == MaxRows) {
      console.log("Down Button Not Shown")
      downButton.disabled = true
    } else {
      downButton.disabled = false
    }

    if ((playerLocation[0]) == NextCharacter(FinalColumn)) {
      setRenderPage("Boss")
      downButton.disabled = true
      upButton.disabled = true
    }
  }, [playerLocation])

  // Get next column index e.g A1 -> B3
  function NextPlayerPos(Direction) {
    var NextLetter = NextCharacter(playerLocation[0])

    var CurrentNumber = parseInt(playerLocation[1])

    var NextNumberUp = CurrentNumber - 2
    var NextNumberDown = CurrentNumber + 2

    if (Direction == "up") {
      var NextPos = NextLetter + NextNumberUp
    } else {
      var NextPos = NextLetter + NextNumberDown
    }

    setPlayerLocation(NextPos)

    setRenderPage("Event")
  }
  //

  return (
    <>
      <div className='TopBar'>
        <h1>{playerLocation}</h1>
      </div>
      <div className='Content'>
        <div className='DirectionButtons'>
          <h1>Current Position is {playerLocation}</h1>

          <button id='UpButton' className="DirectionButton" onClick={() => NextPlayerPos('up')}>Move Upwards</button>

          <button id='DownButton' className='DirectionButton' onClick={() => NextPlayerPos('down')}>Move Downwards</button>
        </div>
      </div>
    </>
  )
}


// This is the redirect after a direction is chosen // Where the events happen //
function Event({ setRenderPage , playerLocation }) {
  function Event(index) {
    console.log(event[index])
    setRenderPage("Move")
  }
  
  const flip = (bool) => !bool
  
  const [event, SetEvent] = useState(null)

  useEffect(() => {
    // https://stackoverflow.com/questions/19589598/how-to-get-random-values-in-json //
    var random = eventsData.Events[Math.floor(Math.random() * eventsData.Events.length)]
    //

    SetEvent(random)
  }, [])

  if (!event) return <h1>Loading...</h1>  // Fixes error to do with undefined variables //

  if (event) console.log(event.Description)
  
  return (
    <>
      <div className='TopBar'>
        <h1>{event?.name}</h1>
      </div>
      <div className='EventContent'>
        <h1>{event?.Description}</h1>

        <div className='Square'>
          <button id='Button1' disabled={flip(event["1"][0])} onClick={() => Event("1")}>{event["1"][1]}</button>
          <button id='Button2' disabled={flip(event["2"][0])} onClick={() => Event("2")}>{event["2"][1]}</button>
          <button id='Button3' disabled={flip(event["3"][0])} onClick={() => Event("3")}>{event["3"][1]}</button>
          <button id='Button4' disabled={flip(event["4"][0])} onClick={() => Event("4")}>{event["4"][1]}</button>
        </div>
      </div>
    </>
  )
}
//

export function Game() {
  const navigate = useNavigate();

  return (
    <>
      <div className='PlayPageContent'>
        <button onClick={() => navigate("/Game")}>Play!</button>

        <button onClick={() => window.open(`${window.location.origin}/HowToPlay`, "_blank", "noopener,noreferrer")}>How To Play?</button>
      </div>
    </>
  )
}

// How to play router // Put instructions and images here //
export function HowToPlay() {
  return (
    <>
      <div className='Instructions'>
        <h1>You can't win!</h1>
      </div>
    </>
  )
}
//

function Boss() {
  console.log("Boss Time!")
  
  return(
    <>
      <h1>Hello World!</h1>
    </>
  )
}