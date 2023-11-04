

import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Withdraw = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    balance: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleWithdraw = async () => {
    const withdrawData = {
      id: user.id,
      balance: parseFloat(user.balance),
    };

    const response = await axios.post("http://localhost:8484/wepo", withdrawData);

    if (response === null) {
      // Display an error message for insufficient funds
      setErrorMessage("Insufficient Funds");
      window.location.reload();
    } else {
      setUser({ ...user, balance: response.data.balance });
      // Clear the error message if the withdrawal is successful
      setErrorMessage(null);
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar userName={user.name} id={user.id} />
      <div className="container" style={{marginTop:"50mm"}}>
        <div className="card p-4 shadow">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleWithdraw();
          }}>
            <fieldset disabled>
              <legend>Withdraw Funds</legend>
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
              <label htmlFor="withdrawAmount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                id="withdrawAmount"
                name="balance"
                className="form-control"
                value={user.balance}
                onChange={(e) => setUser({ ...user, balance: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit Withdrawal
            </button>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Withdraw;