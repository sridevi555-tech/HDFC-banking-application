import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [luser, setLuser] = useState({
    id: "",
    name: "",
    password: "",
  });

  const [userNotFoundError, setUserNotFoundError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [accountNotFoundError, setAccountNotFoundError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { id, name, password } = luser;

  const onInputChange = (e) => {
    setLuser({ ...luser, [e.target.name]: e.target.value });
  };

  const showUserNotFoundError = (message) => {
    setUserNotFoundError(message);
    setTimeout(() => setUserNotFoundError(null), 3000);
  };

  const showPasswordError = (message) => {
    setPasswordError(message);
    setTimeout(() => setPasswordError(null), 3000);
  };

  const showAccountNotFoundError = (message) => {
    setAccountNotFoundError(message);
    setTimeout(() => setAccountNotFoundError(null), 3000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8484/login", luser);
      const id = response.data.id;
      if (response != null) {
        if (id === 1 && name === 'Admin' && password === 'vishal') {
          nav(`/admin/${id}`);
        } else {
          nav( `/dashhome/${id}`);
        }
      }
    } catch (error) {
      if (error.response.status === 404) {
        showUserNotFoundError("User not found.");
      } else if (error.response.status === 401) {
        showPasswordError("Wrong Credentials.");
      } else if (error.response.status === 403) {
        showAccountNotFoundError("Account not found.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow">
        <h1 style={{ color: "green" }}>Login</h1>
        {userNotFoundError && <div className="alert alert-danger">{userNotFoundError}</div>}
        {passwordError && <div className="alert alert-danger">{passwordError}</div>}
        {accountNotFoundError && <div className="alert alert-danger">{accountNotFoundError}</div>}
        <form className="row g-3" onSubmit={(e) => onSubmit(e)}>
          <div className="col-12">
            <label htmlFor="validationDefault01" className="form-label">
              Id
            </label>
            <input
              type="number"
              className="form-control"
              id="validationDefault01"
              name="id"
              placeholder="Enter Your ID"
              value={id}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="validationDefault02" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault02"
              name="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="validationDefault03" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="validationDefault03"
                name="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => onInputChange(e)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-success" type="submit">
              Login
            </button>
          </div>
        </form>
        <Link to={"/forgot"} className="nav-link text-success">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;