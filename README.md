# Project: Function Frontend
In this project I created a smart contract with two unique additional functions I added. I created two new additional frontend where the function's results can be seen by the user.


## Description
In this project, I completed the requirements for my ETH+AVAX Metacrafters course, Module 2, by creating a smart contract project with a frontend that reflects the results of functions. The contract in question contains a total of four different functions and an added Investment variable. Deposit and withdraw are functions that both come pre-built in the given configuration. However, there are two new functions I have added: one to invest, and one to collect on the return on investment. The inclusion of an investing and collect returns feature was intended to simulate what it is like to perform investments. In the given code, it is set so that 5 ETH are transferred from the account Balance to the account Investment using the function for investing. Additionally, the function that collects the return is currently set to collect 4 times the investment amount from Investment and put it back into Balance, simulating how investment value grows. 

## Getting Started
### How/where to download your program and MetaMask prerequisite.
You can download my program directly from GitHub via the download button in the upper right.
Ensure that you have a Metamask account and have added the extension to your browser. The Metamask account can be created using the official website. The extension can be downloaded from the Chrome extension store.

### Executing program
This program can be run using the website GitPod linked here: [https://www.gitpod.io/](https://www.gitpod.io/). It should be possible to upload the downloaded GitHub repo directly onto GitPod.

### How to run the program
At this point, it is assumed that the GitPod environment is loaded with the code from this repository and that you have a Metamask wallet. Follow the below instructions to run the code:
1. Open 3 terminals which will be referred to as terminals A, B, and C.
2. In terminal A, type: npm i
3. In terminal B, type: npx hardhat node
4. In terminal C, type: npx hardhat run --network localhost scripts/deploy.js
5. In terminal A, type: npm run dev
This should launch the front-end. It will run on the localhost, typically at http://localhost:3000/

## Help
- Ensure that Metamask browser variables are reset each time localhost is run. This is achieved by clicking  Settings > Advanced > Clear Activity Tab Data, then refreshing the page.
- Ensure that of the given hardhat addresses, the first address is used to perform interactions.

