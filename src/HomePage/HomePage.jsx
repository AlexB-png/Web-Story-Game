import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './HomePage.scss'

export function Home({ LoginStatus }) {
  const navigate = useNavigate();

  const [playerLocation, setPlayerLocation] = useState("A4")

  const connections = {
    "A4": ["B3", "B5"],
    "B3": ["C2", "C4"],
    "B5": ["C4", "C6"],
    "C2": ["D1", "D3"],
    "C6": ["D5", "D7"],
    "D1": ["", "E2"],
    "D3": ["E2", "E4"],
    "D5": ["E4", "E6"],
    "D7": ["E6", ""],
    "E2": ["F1", "F3"],
    "E4": ["F3", "F5"],
    "E6": ["F5", "F7"],
    "F1": ["", "G2"],
    "F5": ["G4", "G6"],
    "F7": ["G6", ""],
    "G2": ["", "H3"],
    "G4": ["H3","H5"],
    "G6": ["H5", ""],
    "H3": ["" , "B0SS"],
    "H5": ["B0SS", ""],
    "B0SS": ["", ""],

    // Black Holes
    "C4": ["", ""],
    "F3": ["", ""]
  }

  useEffect(() => {
    if (LoginStatus === false) {
      navigate("/")
    } else {
      console.log("Thanks For Logging In")
    }
  })

  useEffect(() => {
    var pos = playerLocation
    var conns = connections[pos]

    var upButton = document.getElementById("UpButton")
    var downButton = document.getElementById("DownButton")

    if (conns[0] != "") {
      upButton.classList.add("Block")
    } else {
      upButton.classList.remove("Block")
      console.log("Up Button Not Shown")
    }

    if (conns[1] != "") {
      downButton.classList.add("Block")
    } else {
      downButton.classList.remove("Block")
      console.log("Down not shown")
    }
  }, [playerLocation])

  function UpButtonPress(index) {
    var currentLocation = playerLocation
    var newLocation = connections[currentLocation][index]
    setPlayerLocation(newLocation)
  }

  return (
    <>
      <div className='Content'>
        <div className='DirectionButtons'>
          <h1>Current Position is {playerLocation}</h1>
          
          <button id='UpButton' className="DirectionButton" onClick={() => UpButtonPress(0)}>Move Upwards</button>

          <button id='DownButton' className='DirectionButton' onClick={() => UpButtonPress(1)}>Move Downwards</button>
        </div>
      </div>
    </>
  )
}
