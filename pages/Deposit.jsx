import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Deposit = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    balance: "",
  });

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleDeposit = async () => {
    // Prepare the data to send to the server
    const depositData = {
      id: user.id,
      balance: parseFloat(user.balance),
    };

    try {
      // Send a POST request to the server
      const response = await axios.post("http://localhost:8484/depo", depositData);
      setUser({ ...user, balance: response.data.balance });
    } catch (error) {
      console.error("Error depositing funds:", error);
    }
  };

  return (
    <>
      <Navbar userName={user.name} id={user.id} />
      <div className="container" style={{marginTop:"50mm"}}>
        <div className="card p-4 shadow">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleDeposit();
          }}>
            <fieldset disabled>
              <legend>Deposit Funds</legend>
              <div className="mb-3">
                <label htmlFor="disabledTextInput" className="form-label">
                  Account id
                </label>
                <input
                  type="number"
                  id="disabledTextInput"
                  className="form-control"
                  value={user.id}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="disabledTextInput" className="form-label">
                  Account holder
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  value={user.name}
                />
              </div>
            </fieldset>
            <div className="mb-3">
              <label htmlFor="depositAmount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                id="depositAmount"
                name="balance"
                className="form-control"
                value={user.balance}
                onChange={(e) => setUser({ ...user, balance: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit Deposit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Deposit;