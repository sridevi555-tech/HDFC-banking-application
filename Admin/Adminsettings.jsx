import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Adminnav from "./Adminnav";

const Adminsettings = () => {
  const navigate = useNavigate(); // Hook for navigation

  const { id } = useParams();

  const [user, setUser] = useState({
    id: "",
    name: "",
    balance: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8484/bank/${id}`);
    setUser(res.data);
  };

  const handlePasswordChange = async () => {
    if (newPassword === confirmNewPassword) {
      try {
        const url = `http://localhost:8484/pass/${id}/${oldPassword}/${newPassword}`;
        await axios.put(url);
        setSuccessMessage("Password changed successfully");
        setErrorMessage(null);
        setTimeout(() => {
          setSuccessMessage(null);
          // Navigate to the home page after 3 seconds
          navigate('/');
        }, 3000);
      } catch (error) {
        setErrorMessage("Error changing password");
        setSuccessMessage(null);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } else {
      setErrorMessage("New password and confirm password do not match");
      setSuccessMessage(null);
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <Adminnav userName={user.name} id={user.id} />
      <div className="container">
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <form>
            <fieldset disabled>
              <legend>User Settings</legend>
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
          </form>

          {/* Password change form */}
          <h3>Password Change</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordChange();
            }}
          >
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">
                Old Password
              </label>
              <div className="input-group">
                <input
                  type={showOldPassword ? "text" : "password"}
                  className="form-control"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">
                Confirm New Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                >
                  {showConfirmNewPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Change Password
            </button>
          </form>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </div>
      </div>
    </>
  );
};

export default Adminsettings;