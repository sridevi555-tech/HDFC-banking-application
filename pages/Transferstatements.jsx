import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const TransferStatements = () => {
    const { id } = useParams();

    const [user, setUser] = useState({
        id: "",
        name: "",
    });

    const [statements, setStatements] = useState([]);

    const loadUser = async () => {
        const res = await axios.get(`http://localhost:8484/bank/${id}`);
        setUser(res.data);
    };

    const loadStatements = async () => {
        const res = await axios.get(`http://localhost:8484/statements/${id}`);
        setStatements(res.data);
    };

    useEffect(() => {
        loadUser();
        loadStatements();
    }, [id]);

    return (
        <>
            <Navbar userName={user.name} id={user.id} />
            <div className="container" style={{ marginTop: '50mm' }}>
                <h2>Bank Statements for {user.name}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Reference ID</th>
                            <th scope="col">Receiver Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date&time</th>

                        </tr>
                    </thead>
                    <tbody>
                        {statements.map((statement) => (
                            <tr key={statement.referid}>
                                <th scope="row">{statement.referid}</th>
                                <td>{statement.recivername}</td>
                                <td>{statement.send_amt}</td>
                                <td>{statement.amt_status}</td>
                                <td>{statement.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TransferStatements;