import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

function Login({ setToken, setUserId }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/profile/login", {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const results = await response.json();
    console.log(results);

    if (response.status === 200 && results.profile._id) {
      const { profile: { _id: userId }, token } = results;
      setToken(token);
      setUserId(userId);
      localStorage.userId = userId;
      navigate(`/profile/${userId}`);
    } else {
      console.error("Invalid response format or missing userId");
    }
  }

  return (
    <div>
      <br />
      <form onSubmit={loginUser}>
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {/* button:s */}
        <button id="submit_button" type="submit">Login to Account</button>
        {/* <button onClick={() => navigate('/profile')}>create account</button> */}
        {/* end button:s */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}

export default Login;