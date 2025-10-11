// Imports
import { Routes, Route, useNavigate, Link} from "react-router-dom";
import { useEffect } from "react";
import './App.scss'
import {LoginPage, NewAccount, ForgotPassword} from './LoginPage/LoginPages'
//

// Variables for preventing URL manipulation
var LoginStatus = false  // Changes if the login was successful //
// 

// Runs when a delay is needed
function delay(miliseconds) {
  return new Promise(timeout => setTimeout(timeout, miliseconds));
}
//

// Add routers here "/" is where the page begins
function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/NewAccount" element={<NewAccount />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        
        
      </Routes>
  )
}
//<Route path="/Home" element={<Home />} />

export default App
