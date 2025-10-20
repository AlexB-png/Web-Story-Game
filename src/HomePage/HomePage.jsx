import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './HomePage.scss'

export function Home({ LoginStatus }) {
  const navigate = useNavigate();

  const [playerLocation, setPlayerLocation] = useState("A3")

  const nodesHeight = {
    1: ["Down"],
    2: ["Up", "Down"],
    3: ["Up", "Down"],
    4: ["Up", "Down"],
    5: ["Up"]
  }

  const connections = {
    "A3": ["B2", "B4"],
    "B2": ["C1", "C3"],
    "B4": ["C5", "C3"],
    "C1": ["D2"],
    "C3": ["D2", "D4"],
    "C5": ["D4"],
    "D2": ["E1", "E3"],
    "D4": ["E3", "E5"],
    "E1": ["F2"],
    "E3": ["F2", "F4"],
    "E5": ["F1"],
    "F2": ["G1", "G3"],
    "F4": ["G3", "G5"],
    "G1": ["H2"],
    "G3": ["H2", "H4"],
    "G5": ["H4"],
    "H2": ["BOSS"],
    "H4": ["BOSS"]
  }

  const dangerous = ["C1", "C5", "E1", "E5", "G1", "G5"]

  useEffect(() => {
    if (LoginStatus === false) {
      navigate("/")
    } else {
      console.log("Thanks For Logging In")
    }
  })

  useEffect(() => {
    var pos = playerLocation
    var column = parseInt(pos[1])
    var directions = nodesHeight[column]

    var upButton = document.getElementById("UpButton")
    var downButton = document.getElementById("DownButton")

    console.log(directions)

    if (directions.includes("Up")) {
      upButton.classList.add("Block")
    } else {
      console.log("Up Button Not Shown")
    }

    if (directions.includes("Down")) {
      downButton.classList.add("Block")
    } else {
      console.log("Down not shown")
    }
  }, [playerLocation])

  function UpButtonPress() {
    console.log("Up Button Pressed")
  }

  return (
    <>
      <div className='Content'>
        <div className='DirectionButtons'>
          <h1>Current Position is {playerLocation}</h1>
          
          <button id='UpButton' className="DirectionButton">Move Upwards</button>

          <button id='DownButton' className='DirectionButton'>Move Downwards</button>
        </div>
      </div>
    </>
  )
}
