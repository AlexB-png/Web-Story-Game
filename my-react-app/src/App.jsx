import { Routes, Route, Navigate, redirect, useNavigate, replace } from "react-router-dom";
import './App.scss'

var LoginStatus = false

function NewAccount() {
  if (LoginStatus) {
    return (
      <h1>Test</h1>
    )}
  else {
    return <Navigate to='/' replace />
  }
}

function LoginPage() {
  const navigate = useNavigate();

  async function NewPageRequest() {
    LoginStatus = true
    navigate("/Home", {replace: true})
  }
  
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
  </>
)}

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

export default App
