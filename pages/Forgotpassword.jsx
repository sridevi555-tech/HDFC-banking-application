import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const nav = useNavigate();
  const [fp, setFp] = useState({
    id:"",  
    name: "",
    securityq: "",
    securitya:"",
  });

  const {id, name, password, c_password,securityq,securitya} = fp;

  const onInputChange = (e) => {
    setFp({ ...fp, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === c_password) {
      const response = await axios.post("http://localhost:8484/forgot", fp);
      const id = response.data.id;
      nav(`/change/${id}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow">
        <h1 style={{ color: "green" }}>Forgot Password</h1>
        <form className="row g-3" onSubmit={(e) => onSubmit(e)}>
        <div className="col-6">
            <label htmlFor="Id" className="form-label">
              Id
            </label>
            <input
              type={"number"}
              className="form-control"
              id="inputAddress"
              name="id"
              placeholder="Enter Your id"
              value={id}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>        
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
              <option value="fname">What is your father name?</option>
              <option value="mothername">What is your mother name?</option>
              <option value="bestiename">What is your Bestie name?</option>
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
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;