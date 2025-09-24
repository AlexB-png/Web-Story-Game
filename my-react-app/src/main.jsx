import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

var elements = (
  <div>
    <div className='Div'>
      <h1>This is in a div</h1>
    </div>
    <h1>And this isn't</h1>
  </div>
)

createRoot(document.getElementById('root')).render(
  elements
)
