// Imports
import {useNavigate, Link} from "react-router-dom";
import './LoginPages.scss'

// Runs when a delay is needed
function delay(miliseconds) {
    return new Promise(timeout => setTimeout(timeout, miliseconds));
}
//

// LOGIN PAGE //
// Put Route Pages Here
export function LoginPage({LoginStatus, setLoginStatus}) {
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
            body: JSON.stringify({'username':username, 'password':password})  // Converts { } to JSON formatting
        })
        //

        const result = await response.json()  // Converts response data to a json without the headers//
        
        // Bad input returns False, Correct input return True
        //console.log(result)
        //

        // Debugging
        //console.log(result.message)
        //
        
        // If result.message == True (Boolean)
        if (result.message) {
            SuccessRequest()
            await delay(2000)
            setLoginStatus(true)
            navigate("/Home")  // Send user to main page //
        //
        } else {  // If result.message is not True (Boolean)
            FailedRequest()
        }  //
    }
    //
    
    // Successful login
    function SuccessRequest() {
        // Gets the text thats going to change
        const SuccessDiv = document.getElementById('StatusDiv')
        const SuccessText = document.getElementById('StatusMessage')
        SuccessText.classList.toggle('visible')
        SuccessDiv.classList.toggle('visible')
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
        const FailedDiv = document.getElementById('StatusDiv')
        const FailedText = document.getElementById('StatusMessage')
        
        FailedDiv.classList.add('visible')
        FailedText.classList.add('visible')
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
        
        // If logged in (True) DO NOT hide the text
        if (!LoginStatus){
            FailedText.classList.remove('visible')
            FailedDiv.classList.remove('visible')
        }
        //
    }
    //

    // Webpage for login
    return (
    <div className='LoginWrapper'>
    
    <div className='LoginPage'>
        
        <div className='Username'>
          <h1 className='title'>Username:</h1>
          <input type="text" id='UsernameInput'></input>
        </div>

        <div className='Password'>
          <h1>Password:</h1>
          <input type="password" id='PasswordInput'></input>
        </div>

        <div className='LoginButton'>
          <button onClick={NewPageRequest}>Login!</button>
        </div>

        <div className='Links'>
          <Link to="/ForgotPassword">Forgot Password?</Link>
          <Link to="/NewAccount">Make an account?</Link>
        </div>

        <div className='Status' id='StatusDiv'>
          <h1 id='StatusMessage' className="StatusMessage">Test</h1>
        </div>
    
    </div>
    
    </div>
    )
}
//

// The Account Creation Page
export function NewAccount() {
    // This is needed for redirecting through router
    const navigate = useNavigate();
    //

    async function CreateButtonClicked() {
        const Username = document.getElementById('NewUser').value
        const Password = document.getElementById('NewPass').value
        
        const StatusDiv = document.getElementsByClassName("StatusBar")[0]
        const StatusMsg = document.getElementById("StatusText")
        
        const response = await fetch("http://127.0.0.1:5000/create", {
            method: 'POST',  // Allows flask to recieve data from the request //
            headers : {
            "Content-Type": "application/json"  // Tells the server that its recieving JSON data //
            },
            body: JSON.stringify({username:Username, password:Password})  // Converts { } to JSON formatting
        })

        
        const result = await response.json()
        console.log(result.Status)
        
        const message = result.Message
        console.log(message)

        if (result.Status === true) {
            StatusMsg.innerHTML = message
            StatusDiv.classList.add("visible")
            StatusMsg.classList.add("visible")
            StatusDiv.style.color = "rgba(92, 182, 70, 1)"
            await delay(5000)
            navigate("/", {replace: true})
        } else {
            StatusMsg.innerHTML = message
            StatusDiv.style.color = "rgba(253, 99, 99, 1)"
            console.log(result.Status)
        }
        
        StatusDiv.classList.add("visible")
        StatusMsg.classList.add("visible")

        await delay(1000)

        StatusDiv.classList.remove("visible")
        StatusMsg.classList.remove("visible")
    }
    
    function Return() {
    navigate("/", {replace: true})
    }
    
    // Webpage for Sign Up
    return (
    <div className="SignUpWrapper">
        <div className="SignUp">
        
        <div className="NewUserInput">
            <h1 className="NewTitle">Username:</h1>
            <input type="text" id='NewUser'></input>
        </div>

        <div className="NewPassInput">
            <h1>Password:</h1>
            <input type="password" id='NewPass'></input>
        </div>

        <div className="CreateNewButton">
            <button onClick={CreateButtonClicked} className="CreateButton">Create Account!</button>
        </div>

        <div className="ReturnDiv">
            <button className="ReturnButton" onClick={Return}>Return!</button>
        </div>

        <div className="StatusBar">
            <h1 id='StatusText' className="StatusText">Status!</h1>
        </div>

        </div>
    </div>
    )
    //
    }
//

// The Forgotten Password Page
export function ForgotPassword() {
    const navigate = useNavigate();

    function redirect() {
        navigate("/", {replace: true})}

    async function OnClick() {
        const StatusDiv = document.getElementById("ForgotStatus")
        const StatusMessage = document.getElementById("ForgotStatusMessage")

        const Username = document.getElementById("Username").value
        const Password = document.getElementById("Password").value
        const Code = document.getElementById("Code").value

        const response = await fetch("http://127.0.0.1:5000/change", {
            method: 'POST',  // Allows flask to recieve data from the request //
            headers : {
            "Content-Type": "application/json"  // Tells the server that its recieving JSON data //
            },
            body: JSON.stringify({username:Username, password:Password, code:Code})  // Converts { } to JSON formatting
        })

        const result = await response.json()
        console.log(result.Status)
        console.log(result.Message)

        async function ButtonPress(redirect) {
            StatusDiv.classList.add("visible")
            StatusMessage.classList.add("visible")
            
            if (redirect === true) {
              StatusMessage.style.color = "rgba(88, 212, 77, 1)"
            } else {
              StatusMessage.style.color = "rgba(212, 77, 77, 1)"
            }

            StatusMessage.innerHTML = result.Message
            await delay(1000)
            StatusDiv.classList.remove("visible")
            StatusMessage.classList.remove("visible")

            if (redirect == true) {
              redirect()
            }
        }

        if (result.Status == true) {
            ButtonPress(true)
        } else {
            ButtonPress(false)
        }
    }
    
    return (
    <div className="ForgotDiv">
        <div className="ForgotBackingDiv">
        <div className="ForgotContent">
            
            <div className="ForgotUser">
            <h1>Username:</h1>
            <input type="text" id="Username"></input>
            </div>

            <div className="ForgotPass">
            <h1>New Password:</h1>
            <input type="password" id="Password"/>
            </div>

            <div className="ForgotCode">
            <h1>Secret Code:</h1>
            <input type="password" id="Code"/>
            </div>
            
            <div className="ForgotButton">
            <button onClick={OnClick}>Change!</button>
            </div>

            <div className="ForgotButton">
            <button onClick={redirect}>Return!</button>
            </div>

            <div className="ForgotStatus" id="ForgotStatus">
              <h1 className="ForgotStatusMessage" id="ForgotStatusMessage">Test</h1>
            </div>
        
        </div>
        </div>
    </div>
    )
    }
//
// 