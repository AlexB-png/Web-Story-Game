import { BrowserRouter } from 'react-router-dom'
import './App.scss'

const loginRequest = async () => {await fetch("http://127.0.0.1:5000/login")}

var message = await fetch("http://127.0.0.1:5000/login", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({username:'Test', password:'Test2'})
}
)
message = await message.json()
const Final = message.message

function LoginPage() {
  return (
  <div className='LoginPage'>
    <div className='username'>
      <div className='user'>
        <h1>Username:</h1>
        <input type='text' id='Username'></input>
      </div>
    </div>
    
    <div className='password'>
      <div className='pass'>
        <h1>Password:</h1>
        <input type='password' id='Password'></input>
      </div>
    </div>
  </div>
)}

function App() {
  return (
    <>
      <header>
        <LoginPage />
      </header>
    </>
  )
}

export default App
