import { useEffect, useState } from 'react';
import { useNavigate, Link, redirect } from "react-router-dom";
import './HomePage.scss'

// Difficulty Classes //
class Easy {
  constructor() {
    this.Height = 9
    this.FinalChar = 'K'  // 10 Width
    this.RebelChance = 20 // % chance of rebel attack instead of event // Roughly 2 Attacks
    this.Grace = 2 // Grace Period In Turns
    this.StarterMoney = 30
  }
}

class Medium {
  constructor() {
    this.Height = 7
    this.FinalChar = 'P' // 15 Width
    this.RebelChance = 20 // % chance of rebel attack instead of event // Roughly 3 Attacks
    this.Grace = 1 // Grace Period In Turns
    this.StarterMoney = 20
  }
}

class Hard {
  constructor() {
    this.Height = 5
    this.FinalChar = 'U' // 20 Width
    this.RebelChance = 20 // % chance of rebel attack instead of event // Roughly 4 attacks
    this.Grace = 0 // Grace Period In Turns
    this.StarterMoney = 10
  }
}

const difficulty = {Easy, Medium, Hard}
//

// This is the bridge between the start, movement and the events //
export function GamePage(LoginStatus) {
  const [playerLocation, setPlayerLocation] = useState("A1")
  const [renderPage, setRenderPage] = useState("Intro")

  switch (renderPage) {
    case "Intro":
      return <Tutorial LoginStatus={LoginStatus} setRenderPage = {setRenderPage}/>
    case "Move":
      return <Home LoginStatus={LoginStatus} playerLocation={playerLocation} setPlayerLocation={setPlayerLocation} setRenderPage={setRenderPage} renderPage = {renderPage}/>
    case "Event":
      return <Event LoginStatus={LoginStatus} setRenderPage={setRenderPage} />
  }
}
//

function Tutorial({ LoginStatus , setRenderPage }) {
  const navigate = useNavigate();

  // I don't like url manipulation //
  useEffect(() => {
    if (LoginStatus.LoginStatus === false) {
      navigate("/")
    }
  }, [LoginStatus])
  //

  var Text = 'Hello World!'
  
  return(
    <>
    <div>
      <h1>{Text}</h1>

      <button onClick={() => setRenderPage("Move")}>Advance</button>
    </div>
    </>
  )
}

// This is where the movement happens // 
function Home({ LoginStatus, playerLocation, setPlayerLocation, setRenderPage, renderPage }) {
  const navigate = useNavigate();

  const MaxRows = 9 // set to a multiple of 2x+1
  const FinalColumn = 'U' // Remember: This character is NOT included USE "[" if you want Z


  // Takes UTF 16 code of the character, thwn increments by 1 to get new character //
  function NextCharacter(character) {
    var code = character.charCodeAt(0)
    code += 1

    if (String.fromCharCode(code) == FinalColumn) {
      return 0
    } else {
      return String.fromCharCode(code)
    }
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

    if (NextCharacter(playerLocation[0]) == 0) {
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

    if (NextCharacter(playerLocation[0]) == FinalColumn) {
      downButton.disabled = true
      upButton.disabled = true
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
function Event({ setRenderPage }) {
  return (
    <>
      <div className='TopBar'>
        <h1>{"Hello"}</h1>
      </div>
      <div>
        <h1>This is the game event</h1>

        <button onClick={() => setRenderPage("Move")}></button>
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