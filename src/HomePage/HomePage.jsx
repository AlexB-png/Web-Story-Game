import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './HomePage.scss'

function Home({ LoginStatus, playerLocation, setPlayerLocation }) {
  class Easy {
    constructor() {
      this.Height = 5
      this.FinalChar = 'K'  // 10 Width
    }
  }

  const navigate = useNavigate();



  const MaxRows = 9 // set to a multiple of 2x+1
  const FinalColumn = '[' // Remember: This character is NOT included USE "[" if you want Z

  function NextCharacter(character) {
    var code = character.charCodeAt(0)
    code += 1

    if (String.fromCharCode(code) == FinalColumn) {
      return 0
    } else {
      return String.fromCharCode(code)
    }
  }

  useEffect(() => {
    if (LoginStatus.LoginStatus === false) {
      console.log("Go Back To Root")
      navigate("/")
    } else {
      console.log("Thanks For Logging In")
      console.log(typeof LoginStatus)
    }
  })



  useEffect(() => {
    var upButton = document.getElementById("UpButton")
    var downButton = document.getElementById("DownButton")

    var RowNum = playerLocation[1]

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
  }

  return (
    <>
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

function Event( {setRenderPage} ) {
  return (
    <>
      <div>
        <h1>This is the game event</h1>

        <button onClick={() => setRenderPage("Move")}></button>
      </div>
    </>
  )
}

export function Game(LoginStatus) {
  const [playerLocation, setPlayerLocation] = useState("A1")
  const [renderPage, setRenderPage] = useState("Event")

  switch (renderPage) {
    case "Move":
      return <Home LoginStatus={LoginStatus} playerLocation={playerLocation} setPlayerLocation={setPlayerLocation} />
    case "Event":
      return <Event setRenderPage = {setRenderPage}/>
  }

}
