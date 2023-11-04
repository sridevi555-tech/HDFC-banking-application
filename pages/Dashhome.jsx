import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashhome = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    balance: 0,
    loan: 0,
  });

  const [welcomeMessages, setWelcomeMessages] = useState([
    "Thank you for choosing our 'SDFC Bank.' We are loyal to our loyal customers.",
    "Your financial journey is in good hands with 'SDFC Bank.'",
    "Welcome back to 'SDFC Bank,' where your financial dreams come true.",
    "We're dedicated to providing exceptional banking services at 'SDFC Bank.'",
    "Your trust in 'SDFC Bank' is greatly appreciated. Welcome, valued customer!",
  ]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    loadUser();

    // Refresh welcome messages and animate every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((index) => (index + 1) % welcomeMessages.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Function to display messages based on user's balance
  const renderBalanceMessage = () => {
    const balanceAmount = user.balance;

    let text = "Your account balance is ";
    let color = "black";

    if (balanceAmount === 0) {
      text = "Your account balance is zero. Please make a deposit.";
      color = "red";
    } else if (balanceAmount > 50000) {
      text = "Maintain a good balance to enjoy benefits!";
      color = "green";
    } else if (balanceAmount < 50000) {
      text = "Consider investing in shares and mutual funds to grow your wealth!";
      color = "blue";
    }

    return (
      <p className="card-text" style={{ color }}>
        {text}
      </p>
    );
  };

  // Function to display messages based on user's loan
  const renderLoanMessage = () => {
    const loanAmount = user.loan;

    let text = "Your loan amount is " + loanAmount; // Display the loan amount
    let color = "black";

    if (loanAmount >= 50000) {
      text = "Please repay your loan of " + loanAmount + " to avoid high interest!"; // Include loan amount
      color = "red";
    } else if (loanAmount < 50000) {
      text = "You are doing great, don't increase your loan amount of " + loanAmount + "!"; // Include loan amount
      color = "green";
    }

    return (
      <p className="card-text" style={{ color }}>
        {text}
      </p>
    );
  };

  return (
    <>
      <Navbar userName={user.name} id={user.id} />
      <div className="card text-bg-success" style={{ height: "200px", width: "100%" ,marginTop:"50mm"}}>
        <div className="card-img-overlay">
          <h1 className="card-title">Welcome, {user.name}</h1>
          <p className="card-text welcome-message">
            {welcomeMessages[currentMessageIndex]}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
        <div className="card" style={{ flex: "1", width: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">Your Balance</h5>
            <p className="card-text">
              Your account balance is <b>{user.balance}</b>. {renderBalanceMessage()}
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card" style={{ flex: "1", width: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">Your Loan</h5>
            {renderLoanMessage()}
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashhome;