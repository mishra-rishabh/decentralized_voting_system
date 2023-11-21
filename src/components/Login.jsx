import React from "react";
import logo from "../vote.png"

const Login = (props) => {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Decentralized Voting System</h1>

            <p>Please Login To Your Metamask Account</p>
            <button className="login-button" onClick={props.connectWallet}>Login</button>
        </div>
    )
}

export default Login;