import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Changefp = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
  });

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleChangefp = async () => {
    if (password === cPassword) {
      const ChangefpData = {
        id: user.id,
        password: password,
      };

      await axios.post("http://localhost:8484/forgotpass", ChangefpData);
      nav('/login');
    }
  };

  return (
    <>
      <div className="container">
        <div className="card p-4 shadow" style={{ width: "400px",marginTop:"50mm" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangefp();
            }}
          >
            <fieldset disabled>
              <legend>Change Password</legend>
              <div className="mb-3">
                <label htmlFor="disabledTextInput" className="form-label">
                  Account ID
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
                  Account Holder
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
              <label htmlFor="Changefppassword" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Changefppassword"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="Changefpc_password" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showCPassword ? "text" : "password"}
                  id="Changefpc_password"
                  className="form-control"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  {showCPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Submit Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Changefp;