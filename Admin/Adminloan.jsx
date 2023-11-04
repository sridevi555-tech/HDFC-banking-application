import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Adminnav from "./Adminnav";

const Adminloan = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    loan: "",
  });

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loanAmount = async () => {
    const loanAmt = {
      id: user.id,
      balance: parseFloat(user.loan),
    };

    try {
      const response = await axios.post("http://localhost:8484/loan", loanAmt);
      setUser({ ...user, balance: response.data.balance });
      window.location.reload();
    } catch (error) {
      console.error("Error depositing funds:", error);
    }
  };

  return (
    <>
      <Adminnav userName={user.name} id={user.id} />
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 64px)" ,marginTop:"40mm" }}>
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            loanAmount();
          }}>
            <fieldset disabled>
              <legend>Loan</legend>
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
              <label htmlFor="loanAmount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                id="loanAmount"
                name="balance"
                className="form-control"
                value={user.loan}
                onChange={(e) => setUser({ ...user, loan: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Request Loan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Adminloan;