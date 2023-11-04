import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Adminnav from "./Adminnav";

const Admintransfer = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    balance: "",
  });

  const [receiver, setReceiver] = useState({
    id: "",
    name: "",
    balance: "",
  });

  const [transferAmount, setTransferAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [asuccessMessage, setAsuccessMessage] = useState(null);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  const handleFindReceiver = async () => {
    try {
      const response = await axios.get(`http://localhost:8484/bank/${receiver.id}`);
      setReceiver(response.data);
    } catch (error) {
      console.error("Error finding the receiver:", error);
      setReceiver({ id: "", name: "", balance: "" });
      setAsuccessMessage("Account number not found.");
      // Clear the asuccessMessage after 3 seconds
      setTimeout(() => {
        setAsuccessMessage(null);
      }, 3000);
    }
  };

  const handleTransfer = async () => {
    const transferData = {
      senderId: user.id,
      receiverId: receiver.id,
      amount: parseFloat(transferAmount),
    };

    try {
      const response = await axios.post("http://localhost:8484/transfer", transferData);
      if (response.data) {
        setUser({ ...user, balance: response.data.senderBalance });
        setReceiver({ ...receiver, balance: response.data.receiverBalance });
        setErrorMessage(null);
        setSuccessMessage("Transfer successful.");
        // Clear the successMessage after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
          window.location.reload();
        }, 3000);
      } else {
        setAsuccessMessage("Account number not found.");
        setTimeout(() => {
          setAsuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage("Transfer failed. Please try again.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <>
     <Adminnav userName={user.name} id={user.id} />
      <div className="container" style={{marginTop:"50mm"}}>
        <form onSubmit={(e) => e.preventDefault()} className="mt-5">
          <fieldset disabled>
            <legend>Transfer Funds</legend>
            <div className="mb-3">
              <label htmlFor="senderAccountId" className="form-label">
                Your Account ID
              </label>
              <input
                type="number"
                id="senderAccountId"
                className="form-control"
                value={user.id}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senderAccountName" className="form-label">
                Your Account Holder
              </label>
              <input
                type="text"
                id="senderAccountName"
                className="form-control"
                value={user.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senderAccountBalance" className="form-label">
                Your Account Balance
              </label>
              <input
                type="number"
                id="senderAccountBalance"
                className="form-control"
                value={user.balance}
                readOnly
              />
            </div>
          </fieldset>
          <div className="mb-3">
            <label htmlFor="receiverAccountId" className="form-label">
              Receivers Account ID
            </label>
            <div className="input-group">
              <input
                type="number"
                id="receiverAccountId"
                className="form-control"
                value={receiver.id}
                onChange={(e) => setReceiver({ id: e.target.value, name: "", balance: "" })}
              />
              <button type="button" className="btn btn-success" onClick={handleFindReceiver}>
                Find Receiver
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="receiverAccountName" className="form-label">
              Receivers Account Holder
            </label>
            <input
              type="text"
              id="receiverAccountName"
              className="form-control"
              value={receiver.name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="transferAmount" className="form-label">
              Amount to Transfer
            </label>
            <input
              type="number"
              id="transferAmount"
              className="form-control"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-success" onClick={handleTransfer}>
            Submit Transfer
          </button>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {asuccessMessage && (
            <div className="alert alert-danger">{asuccessMessage}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default Admintransfer;