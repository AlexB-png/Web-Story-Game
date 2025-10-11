import { useEffect } from 'react';
import {useNavigate, Link} from "react-router-dom";

export function Home({ LoginStatus }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (LoginStatus === false) {
      navigate("/")
    } else {
      console.log("Thanks For Logging In")
    }
  })
  
  return (
    <>
      <h1>{LoginStatus === true ? "True!" : "False!"}</h1>
    </>
  )
}
