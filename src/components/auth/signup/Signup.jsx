import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup(props) {
  const navigate = useNavigate("/profile");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const signupRoute = "http://localhost:4000/profile/signup";

  return (
    <div>
      <form>
        <input
          type="text "
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        /><br/>
        <input
          type="text"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        /><br/>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        /><br/>
        <input
          type="text"
          placeholder="bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <br/>
        {/* <label for="image" >
         Image    
        </label>  */}
        <input
          id="image"
          type="file"
          placeholder="image"
          onChange={(e) => setImage(e.target.value)}
        />
        <text>Upload a Profile Image</text>
        <br></br>
        <button id="create_account" type="submit" onClick={displayInputFields}>
          Create Account
        </button>
        {/* <button onClick={() => navigate('/login')}>Back to Login</button> */}
      </form>
    </div>
  );

  async function displayInputFields(e) {
    e.preventDefault();

    try {
      let response = await fetch(signupRoute, {
        headers: new Headers({
          "content-type": "application/json",
        }),
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          username,
          bio,
          image,
        }),
      });

      let results = await response.json();
      console.log(results);

      if (response.ok) {
        const userId = results.profile._id;
        props.setToken(results.token);
        props.setUserId(userId);
        localStorage.userId = userId;
        navigate(`/profile/${userId}`);  

      } else {
        console.log("Signup failed:", results.ERROR);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }
}

export default Signup;