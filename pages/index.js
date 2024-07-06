import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  // State variables
  const [ethWallet, setEthWallet] = useState(undefined); //Wallet
  const [account, setAccount] = useState(undefined); //Account
  const [atm, setATM] = useState(undefined); //Smart contract functionality
  const [balance, setBalance] = useState(undefined); //Balance
  const [investment, setInvest] = useState(undefined); //Balance


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };
  // Gets the provider and signer needed for the contract to work
  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  // Checks that atm object exists and then calls for the balance
  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const getInvest = async() => {
    if (atm) {
      setInvest((await atm.getInvest()).toNumber());
    }
  }

  const deposit1 = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  }

  const deposit5 = async() => {
    if (atm) {
      let tx = await atm.deposit(5);
      await tx.wait();
      getBalance();
    }
  }


  const withdraw1 = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
      
    }
  }

  const withdraw5 = async() => {
    if (atm) {
      let tx = await atm.withdraw(5);
      await tx.wait();
      getBalance();
      
    }
  }



  const collect = async() => {
    if (atm) {
      let tx = await atm.collectInvest(4);
      await tx.wait();
      getBalance();
      getInvest();
      
    }
  }

  const invest = async() => {
    if (atm) {
      let tx = await atm.investy(5);
      await tx.wait();
      getBalance();
      getInvest();
      
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    if (investment == undefined) {
      getInvest();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Your Invested Amt: {investment}</p>
        <p>Investment Return Value: {investment*4}</p>
        <button onClick={deposit1}>Deposit 1 ETH</button> &nbsp;
        <button onClick={withdraw1}>Withdraw 1 ETH</button>
        <br></br>
        <br></br>
        <button onClick={deposit5}>Deposit 5 ETH</button> &nbsp;
        <button onClick={withdraw5}>Withdraw 5 ETH</button>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={collect}>Receive Investment</button> &nbsp;
        <button onClick={invest}>Invest 5 ETH</button> 
        <br></br>
        <br></br>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <style jsx>{`
        .container {
          text-align: center;
          background-color: lavender;
          font-family: 'Courier New', Courier, monospace;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}
      </style>
      <br></br>
        <br></br>
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <br></br>
        <br></br>
    </main>
  )
}
