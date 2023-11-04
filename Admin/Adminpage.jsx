import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Adminnav from "./Adminnav";
import Adminpannel from "./Adminpannel";

const Adminpage = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    balance: 0,
    loan: 0,
  });

  const [welcomeMessages, setWelcomeMessages] = useState([
    "Thank you for choosing our 'HDFC Bank.' We are loyal to our loyal customers.",
    "Your financial journey is in good hands with 'SDFC Bank.'",
    "Welcome back to 'SDFC Bank,' where your financial dreams come true.",
    "We're dedicated to providing exceptional banking services at 'SDFC Bank.'",
    "Your trust in 'SDFC Bank' is greatly appreciated. Welcome, valued customer!",
  ]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const [bankStats, setBankStats] = useState({
    numAccounts: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalTransfers: 0,
    totalLoans: 0,
  });

  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalTransfers, setTotalTransfers] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  const loadBankStats = async () => {
    const response = await axios.get(`http://localhost:8484/bank-stats/all-users`);
    setBankStats(response.data);
  };

  const fetchTotalDeposits = async () => {
    const response = await axios.get(`http://localhost:8484/totaldeposits`);
    setTotalDeposits(response.data);
  };

  const fetchTotalTransfers = async () => {
    const response = await axios.get(`http://localhost:8484/totaltransfers`);
    setTotalTransfers(response.data);
  };

  const fetchTotalWithdrawals = async () => {
    const response = await axios.get(`http://localhost:8484/totalwithdrawals`);
    setTotalWithdrawals(response.data);
  };

  const fetchTotalLoans = async () => {
    const response = await axios.get(`http://localhost:8484/totalloans`);
    setTotalLoans(response.data);
  };

  useEffect(() => {
    loadUser();
    loadBankStats();
    fetchTotalDeposits();
    fetchTotalTransfers();
    fetchTotalWithdrawals();
    fetchTotalLoans();

    const intervalId = setInterval(() => {
      setCurrentMessageIndex((index) => (index + 1) % welcomeMessages.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  const renderLoanMessage = () => {
    const loanAmount = user.loan;

    let text = "Your loan amount is " + loanAmount;
    let color = "black";

    if (loanAmount >= 50000) {
      text = "Please repay your loan of " + loanAmount + " to avoid high interest!";
      color = "red";
    } else if (loanAmount < 50000) {
      text = "You are doing great, don't increase your loan amount of " + loanAmount + "!";
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
      <Adminnav userName={user.name} id={user.id} />
      <Adminpannel />
      <div className="card text-bg-success" style={{ height: "200px", width: "100%",marginTop:"50mm" }}>
        <div className="card-img-overlay">
          <h1 className="card-title">Welcome, {user.name}</h1>
          <p className="card-text welcome-message">{welcomeMessages[currentMessageIndex]}</p>
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
            <h5 className="card-title">Your Loans</h5>
            <p className="card-text">
              {user.name}, {renderLoanMessage()}
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
        <div className="card" style={{ flex: "1", width: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">Total No of Deposits</h5>
            <p className="card-text">
              Total number of deposits: <b>{totalDeposits}</b>
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card" style={{ flex: "1", width: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">Total No of Withdraws</h5>
            <p className="card-text">
              Total number of withdrawals: <b>{totalWithdrawals}</b>
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
        <div className="card" style={{ flex: "1", width: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">Total No of Loans</h5>
            <p className="card-text">
              Total number of loans: <b>{totalLoans}</b>
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card" style={{ flex: "1", width: "100%" }}>
  <div className="card-body">
    <h5 className="card-title">Number of Transactions</h5>
    <p className="card-text">
      Total number of transactions: <b>{totalTransfers}</b>
    </p>
  </div>
  <div className="card-footer">
    <small className="text-body-secondary">Last updated 3 mins ago</small>
  </div>
</div>

      </div>
    </>
  );
};

export default Adminpage;