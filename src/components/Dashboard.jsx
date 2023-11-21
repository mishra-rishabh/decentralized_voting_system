import React from "react";
import logo from "../vote.png"

const Dashboard = (props) => {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Decentralized Voting System</h1>

            <p>You Are Connected To Your Metamask Wallet</p>
            <p className="connected">Account Address: {props.account}</p>
            <p className="connected">Remaining Time: {props.remainingTime} seconds</p>

            { props.canVote ?
                (<p className="">You have already casted your vote!</p>) :
                (<div>
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