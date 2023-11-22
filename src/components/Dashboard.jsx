import React from "react";
import logo from "../vote.png"

const Dashboard = (props) => {
    return (
        <div className="App">
            {/* Displays the logo and Title */}
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Decentralized Voting System</h1>

            {/* Confirms that the user is connected to their MetaMask wallet */}
            <p>You Are Connected To Your Metamask Wallet</p>

            {/* Displays the user's MetaMask account address */}
            <p className="connected">Account Address: {props.account}</p>

            {/* Displays the remaining time for voting */}
            <p className="connected">Remaining Time: {props.remainingTime} seconds</p>

            {/* Checks if the user has already casted their vote */}
            { props.canVote ?
                (<p className="">You have already casted your vote!</p>) :
                (<div>
                    {/* Displays an input field for entering the candidate index number */}
                    <input
                        className="input-box"
                        type="number"
                        placeholder="Enter candidate index number"
                        value={props.number}
                        onChange={props.handleNumberChange}>
                    </input>

                    <br/>

                    <button className="vote-button" onClick={props.voteFunction}>Vote</button>
                </div>)
            }
            
            <div>
            {/* Creates a table to display the list of candidates and their vote counts */}
                <table id="voteTable" className="content-table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Candidate Name</th>
                            <th>Candidate Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.candidates.map((candidate, index) => (
                            <tr key={index}>
                                <td>{candidate.index}</td>
                                <td>{candidate.name}</td>
                                <td>{candidate.voteCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;