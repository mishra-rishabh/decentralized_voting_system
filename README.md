# Decentralized Voting System with Integrated Discord Bot
## Overview
This project is a decentralized voting system built on the Ethereum blockchain. Leveraging smart contracts for secure and transparent voting, users can cast votes via MetaMask, view real-time results, and receive Discord notifications.

## Features
* **Ethereum Smart Contracts**: Utilizes smart contracts for secure vote recording.
* **MetaMask Integration**: Allows users to authenticate and cast votes securely.
* **Real-time Results**: Provides a web interface for users to view current voting tallies.
* **Discord Integration**: Sends notifications to a Discord channel when a vote is cast.
* **Backend Logic**: Implements backend logic to facilitate communication between components.
* **Security**: Prioritizes security considerations in smart contract development and wallet integration.

## Technologies Used
* Ethereum (Solidity)
* ethers library
* React.js
* Discord webhook
* Node.js (Backend)
* MetaMask

## Contract Repository
[Decentralized Voting Smart Contract](https://github.com/mishra-rishabh/voting_smart_contract)


### NOTE
* To make things easy to understand all the constants and urls are made public and not stored in env file (ideally it should be in env file to make things more secure).
* Referesh the application manually if votes are not updated even after transaction is confirmed on the blockchain.

## Getting Started with Create React App

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.