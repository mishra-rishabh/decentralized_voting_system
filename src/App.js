import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants/constants';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import VotingEnd from "./components/VotingEnd";
import Discord from "./services/discord";
import './App.css';

function App() {
  // Initialize Discord service
  const { Send } = Discord();

  // State variables for the application
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [canVote, setCanVote] = useState(true);

  // useEffect hook for initialization and cleanup
  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();

    // Add event listener for MetaMask account changes
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);
    }

    // Cleanup: Remove event listener
    return () => {
      if(window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
      }
    }
  }, []);

  // Function to handle MetaMask account changes
  function handleAccountChange(accounts) {
    if(accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      isAbleToVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  // Function to connect to MetaMask
  async function connectToMetamask() {
    if(window.ethereum) {
      try {
        // Create a Web3 provider and set it in the state
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        // Request MetaMask accounts
        await provider.send("eth_requestAccounts", []);

        // Get signer and address from the provider
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        // Set account details and connection status
        setAccount(address);
        setIsConnected(true);
        isAbleToVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser!");
    }
  }
  
  /* smart contract functions */

  // Function to initialize Web3 provider and smart contract instance
  async function initializeProviderAndContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return {contract, signer, provider};
  }

  // Function to get the current voting status from the smart contract
  async function getCurrentStatus() {
    const {contract} = await initializeProviderAndContract();

    const votingStatus = await contract.getVotingStatus();
    setVotingStatus(votingStatus);
  }

  // Function to get the remaining time for voting from the smart contract
  async function getRemainingTime() {
    const {contract} = await initializeProviderAndContract();

    const remainingTime = await contract.getRemainingTime();
    setRemainingTime(parseInt(remainingTime, 16));
  }

  // Function to get the list of candidates and their votes from the smart contract
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

  // Function to check if the user is able to vote
  async function isAbleToVote() {
    const {contract, signer} = await initializeProviderAndContract();
    const voteStatus = await contract.voters(await signer.getAddress());

    setCanVote(voteStatus);
  }

  // Function to cast a vote
  async function castYourVote() {
    const {contract} = await initializeProviderAndContract();

    const txn = await contract.castVote(number);
    await txn.wait();
    
    isAbleToVote();
    await getVoteEventDetails();
    alert("You have casted your vote");
  }

  // Function to handle the change in the vote input (candidateIndex)
  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  // Function to get details when a vote event occurs
  async function getVoteEventDetails() {
    const {contract} = await initializeProviderAndContract();
    
    contract.on("VoteCast", async (voter, candidateIndex, event) => {
      // const candidateName = await contract.candidates(candidateIndex.toString());

      let details = {
        voter: event.args.voter
      };

      // Send details to Discord using the Discord service
      Send(details);
    });
}

  // Render different components based on voting status and connection status
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
