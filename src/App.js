import  React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants/constants';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import VotingEnd from "./components/VotingEnd";
import './App.css';

// const ethers = require("ethers");

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [canVote, setCanVote] = useState(true);

  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);
    }

    return () => {
      if(window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
      }
    }
  }, []);

  function handleAccountChange(accounts) {
    if(accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      isAbleToVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if(window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        setAccount(address);
        setIsConnected(true);
        isAbleToVote();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.error("Metamask is not detected in the browser!");
    }
  }
  
  /* smart contract functions */
  async function initializeProviderAndContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return {contract, signer, provider};
  }

  async function getCurrentStatus() {
    const {contract} = await initializeProviderAndContract();

    const votingStatus = await contract.getVotingStatus();
    setVotingStatus(votingStatus);
    console.log(votingStatus);
  }

  async function getRemainingTime() {
    const {contract} = await initializeProviderAndContract();

    const remainingTime = await contract.getRemainingTime();
    setRemainingTime(parseInt(remainingTime, 16));
  }

  async function getCandidates() {
    const {contract} = await initializeProviderAndContract();
    
    const listOfCandidates = await contract.getAllCandidatesVotes();
    const formattedCandidates = listOfCandidates.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    });

    setCandidates(formattedCandidates);
  }

  async function isAbleToVote() {
    const {contract, signer} = await initializeProviderAndContract();
    const voteStatus = await contract.voters(await signer.getAddress());

    setCanVote(voteStatus);
  }

  async function castYourVote() {
    const {contract} = await initializeProviderAndContract();

    const txn = await contract.castVote(number);
    await txn.wait();
    isAbleToVote();
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          votingStatus ?
          (isConnected ?
            (<Dashboard
              account = {account}
              candidates = {candidates}
              remainingTime = {remainingTime}
              number = {number}
              handleNumberChange = {handleNumberChange}
              voteFunction = {castYourVote}
              canVote = {canVote}/>
            ) :
            (<Login connectWallet = {connectToMetamask}/>)
          ) :
          (<VotingEnd/>)
        }
      </header>
    </div>
  );
}

export default App;
