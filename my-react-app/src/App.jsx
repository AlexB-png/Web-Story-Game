// Imports
import { Routes, Route, Navigate, redirect, useNavigate, replace } from "react-router-dom";
import './App.scss'
//

// Variables for preventing URL manipulation
var LoginStatus = false  // Changes if the login was successful //
// 

// TBA The redirect for the login page
function NewAccount() {
  if (LoginStatus) {
    return (
      <h1>Test</h1>
    )}
  else {
    return <Navigate to='/' replace />
  }
}
//

// Runs when a delay is needed
function delay(miliseconds) {
  return new Promise(timeout => setTimeout(timeout, miliseconds));
}
//

function LoginPage() {
  // This is needed for redirecting through router
  const navigate = useNavigate();
  //

  // This runs when login button is pressed
  async function NewPageRequest() {
    // Get data from the text input boxes
    const username = document.getElementById('UsernameInput').value
    const password = document.getElementById('PasswordInput').value
    //

    // Fetch data from the flask app (sends variables username and password)
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: 'POST',  // Allows flask to recieve data from the request //
      headers : {
        "Content-Type": "application/json"  // Tells the server that its recieving JSON data //
      },
      body: JSON.stringify({username, password})  // Converts { } to JSON formatting
    })
    //

    const result = await response.json()  // Converts response data to a json without the headers//
    
    // Bad input returns False, Correct input return True
    console.log(result)
    //

    // Debugging
    console.log(result.message)
    //
    
    // If result.message == True (Boolean)
    if (result.message) {
      LoginStatus = true
      SuccessRequest()
      await delay(2000)
      navigate("/Home", {replace: true})
    //
    } else {  // If result.message is not True (Boolean)
      console.log('Failed')
      if (!LoginStatus){
        FailedRequest()
      }
    }  //
  }
  //
  
  // Successful login
  function SuccessRequest() {
    // Gets the text thats going to change
    const SuccessText = document.getElementById('StatusMessage')
    //

    // Changes said text 
    SuccessText.innerHTML = 'Success! Redirecting...'
    //

    // Display text and change color
    SuccessText.style.display = 'block'
    SuccessText.style.color = "rgba(126, 245, 195, 1)"
    }
    //
  //

  // Failed Login
  async function FailedRequest() {
    // Gets the text thats going to change
    const FailedText = document.getElementById('StatusMessage')
    //
    
    // Changes said text 
    FailedText.innerHTML = 'Incorrect Username Or Password'
    //
    
    // Display text and change color
    FailedText.style.display = 'block'
    FailedText.style.color = "rgba(189, 99, 99, 1)";
    //

    // Wait 2 seconds
    await delay(2000)
    //
    
    // If logged in DO NOT hide the text
    if (!LoginStatus){
      FailedText.style.display = 'None'
    }
    //
  }
  //

  // Webpage for login
  return (
  <>
  <div className='TransWrapper'>
    <div className='LoginPage'>
      <div className='Username'>
        <h1 className='title'>Username:</h1>
        <input type="text" id='UsernameInput'></input>
      </div>

      <div className='Password'>
        <h1>Password:</h1>
        <input type="text" id='PasswordInput'></input>
      </div>

      <div className='LoginButton'>
        <button onClick={NewPageRequest}>Login!</button>
      </div>

      <div className='Links'>
        <a href=''>Forgot Password?</a>
        <a href=''>Make an account?</a>
      </div>

      <div className='Status'>
        <h1 id='StatusMessage'>Test</h1>
      </div>
    </div>
  </div>
  </>)}
  //

// Add routers here "/" is where the page begins
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<NewAccount />} />
      </Routes>
    </>
  )
}
//

export default App
