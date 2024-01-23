import { useState } from "react";
import { createUserWithEmailAndPassword,onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import "./App.css";

function App() {
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
  });
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [user,setUser]=useState({})

  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
  })

  const registerChange = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const loginChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const resetPassword=async(e)=>{
    e.preventDefault()
      const emailValue=e.target.email.value;
      sendPasswordResetEmail(auth,emailValue).then(data=>alert("Check your email")).catch(error=>alert(error.code))
  }

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerDetails.email,
        registerDetails.password
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth)
  };
  return (
    <div className="App" style={{textAlign:"center"}}>
      <div>
        <h1>Register User</h1>
        <input
          placeholder="Enter Email"
          name="email"
          onChange={(e)=>registerChange(e)}
        />
        <input
          placeholder="Enter Password"
          name="password"
          onChange={(e)=>registerChange(e)}
        />
        <button onClick={register}>Create User</button>
      </div>
      <div>
        <h1>Login</h1>
        <input placeholder="Enter Email" name="email" onChange={(e)=>loginChange(e)} />
        <input
          placeholder="Enter Password"
          name="password"
          onChange={(e)=>loginChange(e)}
        />
        <button onClick={login}>Login</button>
      </div>
      <h1>User Logged In:</h1>
      {user?.email}
      <button onClick={logout}>Logout</button>
      <div>
        <h1>Forgot Password</h1>
        <form onSubmit={(e)=>resetPassword(e)}>
          <input name="email"/>
        <button>Forgot Password</button>
        </form>
      </div>
    </div>
  );
}

export default App;
