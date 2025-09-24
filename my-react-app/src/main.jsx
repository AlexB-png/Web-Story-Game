import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Button(Text) {
  const MyFunc = () => {
    alert('Hello World')
  };
  return (
    <button onClick={MyFunc} disabled={false}>{Text.text}</button>
  );
}

createRoot(document.getElementById('root')).render(
  <Button text='Hello Button'/>
)
