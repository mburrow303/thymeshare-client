import Signup from "./signup/Signup";
import Login from "./login/Login";
import "./Auth.css";
//import { useState } from "react";

function handleClick(){
  document.getElementById("login").style.display = "none";
  document.getElementById("signup").style.display = "inline-block";
  document.getElementById("toggle").style.display = "none";
  document.getElementById("no_account").style.display = "none";
  document.getElementById("back_to_login").style.display = "block";
}

function backToLogin(){
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "inline-block";
  document.getElementById("back_to_login").style.display = "none";
  document.getElementById("no_account").style.display = "block";
  document.getElementById("toggle").style.display = "inline-block";
  //document.getElementById("no_account").style.display = "none";
}

function Auth(props) {
  return (
    <>
      <div id="login" style={{ width: "48%", display: "inline-block" }}>
        {/* Login Component */}
        <br />
        <h2>Login</h2>
        <Login setToken={props.setToken} setUserId={props.setUserId} />
      </div>

      <div>
        <p id="no_account">Don't have an account?</p>
        <button id="toggle" onClick={() => handleClick()}>Sign Up</button>
      </div>
      
      <div id="signup" style={{ width: "48%", display: "none" }}>
        {/* Signup Component */}
        <h2 id="signup_heading">Signup</h2>
        <Signup setToken={props.setToken} setUserId={props.setUserId} />
      </div>
      <div id="back_to_login" style={{display:"none"}}><p>Already have an account?</p>
      <button id="log_in"  onClick={() => backToLogin()}>Log in</button>
      </div>
    </>
  );
}

export default Auth;