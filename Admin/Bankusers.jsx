import  { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Adminnav from "./Adminnav";
import Button from "react-bootstrap/esm/Button";

const Bankusers = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    balance: 0,
  });

  const [allusers, setAllUsers] = useState([]);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  const loadAllUsers = async () => {
    const res = await axios.get(`http://localhost:8484/all`);
    setAllUsers(res.data);
  };

  const deleteUsers = async (userId) => {
    try {
      await axios.delete(`http://localhost:8484/delete/${userId}`);
      loadAllUsers();
      window.location.reload(); // Reload the page after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    loadUser();
    loadAllUsers();
  }, []);

  return (
    <>
      <Adminnav userName={user.name} id={user.id} />
      <div className="container" style={{marginTop:"50mm"}}>
        <div className="card p-4 shadow">
          <h2>All Bank Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Balance</th>
                <th>Loan</th>
                <th>Address</th>
                <th>No Of Deposits</th>
                <th>No Of Withdraws</th>
                <th>No Of Transfers</th>
                <th>No of Loans</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allusers.map((userData, index) => (
                <tr key={userData.id}>
                  <td>{userData.id}</td>
                  <td>{userData.name}</td>
                  <td>{userData.balance}</td>
                  <td>{userData.loan}</td>
                  <td>{userData.address}</td>
                  <td>{userData.no_depo}</td>
                  <td>{userData.no_withdraw}</td>
                  <td>{userData.no_transfer}</td>
                  <td>{userData.no_loan}</td>
                  <td>{userData.mobile}</td>
                  <td>{userData.status}</td>
                  <td>
                    {index !== allusers.length - 1 ? (
                      <div style={{ display: "flex" }}>
                        <Link className="btn btn-outline-success mx-2" to={`/admintransferstatment/${userData.id}`}>
                          View
                        </Link>
                        <button type="button" className="btn btn-outline-danger" onClick={() => deleteUsers(userData.id)}>
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Bankusers;