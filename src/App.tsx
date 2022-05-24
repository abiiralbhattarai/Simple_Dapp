import { useState, useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./App.css";

function App() {


  const [greeting, doGreeting] = useState<string>();
  const [contract, setContract] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    const loadProvider = async () => {
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const url = "http://localhost:8545";
      const providers:any = new ethers.providers.JsonRpcProvider(url);
      const contracts:any = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        providers
      );
      setContract(contracts);
      setProvider(providers);
     
    };
    loadProvider();
  },[]);
  useEffect(() => {
    const getGreetings = async () => {
      const greeting = await contract.greet();
      doGreeting(greeting);

    };
    contract && getGreetings();
  }, [contract]);

  const changeGreetings = async () => {
    const input:any = document.querySelector("#value");
    const signer = contract.connect(provider.getSigner());
    
    setTimeout(function () {
      window.location.reload();
    }, 500);
    setTimeout(signer.setGreeting(input.value));
  };
 
  return (
    <div className="center">
      <h3>{greeting}</h3>
    <input className="input" type="text" id="value"></input>
    <button className="button" onClick={changeGreetings}>
  Change
  </button>
     
    </div>
  );
}

export default App;