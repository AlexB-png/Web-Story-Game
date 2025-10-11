// Imports
import { Routes, Route, useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import './App.scss'
import {LoginPage, NewAccount, ForgotPassword} from './LoginPage/LoginPages'
//



// Runs when a delay is needed
function delay(miliseconds) {
  return new Promise(timeout => setTimeout(timeout, miliseconds));
}
//

function Home({ LoginStatus }) {
  return (
    <>
      <h1>{LoginStatus === true ? "True!" : "False!"}</h1>
    </>
  )
}

// Add routers here "/" is where the page begins
function App() {
  // Variables for preventing URL manipulation
  const [LoginStatus, setLoginStatus] = useState(false)  // Changes if the login was successful //
  // 

  return (
      <Routes>
        <Route path="/" element={<LoginPage LoginStatus={LoginStatus} setLoginStatus={setLoginStatus}/>} />
        <Route path="/NewAccount" element={<NewAccount />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Home" element={<Home  LoginStatus={LoginStatus}/>} />
      </Routes>
  )
}
//<Route path="/Home" element={<Home />} />

export default App
