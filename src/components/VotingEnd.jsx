import React from "react";
import logo from "../vote.png"

const VotingEnd = (props) => {
    return (
        <div className="App">
            {/* Displays the logo and Title */}
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Decentralized Voting System</h1>
            
            <p>Voting is ended now!</p>
        </div>
    )
}

export default VotingEnd;