import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Balance= () => {
  const [user, setUser] = useState({
    id: "",
    name: "", // Add the user's name to the state
  });

  const { id } = useParams();

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <Navbar userName={user.name} id={ user.id} /> {/* Pass the user's name as a prop */}
      <div className="container">
        <div className="p-5">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Address</th>
                <th scope="col">Balance</th>
                <th scope="col">Loan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.address}</td>
                <td>{user.balance}</td>
                <td>{user.loan}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Balance;