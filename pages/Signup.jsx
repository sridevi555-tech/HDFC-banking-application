import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const [accop, setAccop] = useState({
    name: "",
    password: "",
    c_password: "",
    gender: "",
    mobile: "",
    address: "",
    balance: 2000.0,
    loan: 0.0,
    status: "active",
    securityq: "",
    securitya: "",
  });

  const {
    name,
    password,
    c_password,
    gender,
    mobile,
    address,
    securityq,
    securitya,
  } = accop;

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const onInputChange = (e) => {
    setAccop({ ...accop, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === c_password) {
      const response = await axios.post("http://localhost:8484/bank", accop);
      const id = response.data.id;
      nav( `/dashhome/${id}`);
    } else {
      setPasswordMatchError(true);
      // Clear the error after 3 seconds
      setTimeout(() => setPasswordMatchError(false), 3000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh",marginTop:"10mm" }}>
      <div className="card p-4 shadow">
        <h1 style={{ color: "green" }}>Register Account</h1>
        {passwordMatchError && (
          <div className="alert alert-danger">Password and Confirm Password do not match.</div>
        )}
        <form className="row g-3" onSubmit={(e) => onSubmit(e)}>
          <div className="col-6">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type={"text"}
              className="form-control"
              id="inputAddress"
              name="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="inputPassword4"
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
          <div className="col-md-6">
            <label htmlFor="C_Password" className="form-label">
              Confirm Password
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="inputPassword4"
                name="c_password"
                placeholder="Enter Your Confirm Password"
                value={c_password}
                onChange={(e) => onInputChange(e)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputState" className="form-label">
              Gender
            </label>
            <select
              id="inputState"
              className="form-select"
              name="gender"
              value={gender}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option selected disabled value="">
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="inputAddress" className="form-label">
              Mobile
            </label>
            <input
              type={"number"}
              className="form-control"
              id="inputAddress"
              name="mobile"
              placeholder="Enter Your Mobile"
              value={mobile}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type={"text"}
              className="form-control"
              id="inputAddress"
              name="address"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputState" className="form-label">
              Security Question
            </label>
            <select
              id="inputState"
              className="form-select"
              name="securityq"
              value={securityq}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option selected disabled value="">
                Select Question
              </option>
              <option value="fname">What is your fathers name?</option>
              <option value="mothername">What is your mothers name?</option>
              <option value="bestiename">What is your Besties name?</option>
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="Name" className="form-label">
              Security Answer
            </label>
            <input
              type={"text"}
              className="form-control"
              id="inputAddress"
              name="securitya"
              placeholder="Enter Your Answer"
              value={securitya}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;