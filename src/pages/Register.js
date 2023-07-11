import { useState, useContext, useEffect } from "react";
import { baseUrl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
export default function Register() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.clear();
    setLoggedIn(false);
  }, []);

  function handleSignup(e) {
    e.preventDefault();
    const url = baseUrl + "/api/register/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //One of the most important concepts in web dev: Local storage↓
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        console.log(location);
        console.log(location.state);
        console.log(location?.state?.previousUrl); // question mark for conditional chaining
        setLoggedIn(true);
        navigate(
          location?.state?.previousUrl
            ? location.state.previousUrl
            : "/customers"
        );
      })
      .catch();
  }

  return (
    <form className="ml-2 w-full max-w-sm" id="login" onSubmit={handleSignup}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label htmlFor="email">Email</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="email"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label htmlFor="userName">Username</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="userName"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label htmlFor="password">Password</label>
        </div>

        <div className="md:w-3/4">
          <input
            id="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        form="login"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded no-underline"
      >
        Register
      </button>
    </form>
  );
}
