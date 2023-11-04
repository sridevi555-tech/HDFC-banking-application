import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = ({ userName, id }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-success d-flex" style={{ position: 'fixed', right: "2%", top: 150, width: '95%', zIndex: 1000 }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="">
          SDFC
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav d-flex justify-content-between" style={{ width: "100%" }}>
            <li className="nav-item" style={{ width: "16%" }}>
              <Link className="nav-link text-white" to={`/dashhome/${id}`}>
                Home
              </Link>
            </li>
            <li className="nav-item" style={{ width: "16%" }}>
              <Link to={`/balance/${id}`} className="nav-link text-white">
                Balance
              </Link>
            </li>
            <li className="nav-item" style={{ width: "16%" }}>
              <Link to={`/deposit/${id}`} className="nav-link text-white">
                Deposit
              </Link>
            </li>
            <li className="nav-item" style={{ width: "16%" }}>
              <Link to={`/withdraw/${id}`} className="nav-link text-white">
                Withdraw
              </Link>
            </li>
            <li className="nav-item" style={{ width: "16%" }}>
              <Link to={`/transfer/${id}`} className="nav-link text-white">
                Transfer
              </Link>
            </li>
            <li className="nav-item" style={{ width: "16%" }}>
              <Link to={`/loan/${id}`} className="nav-link text-white">
                Loan
              </Link>
            </li>
            <li className="nav-item" style={{ width: "16%" }}>
              <Link to={`/transferstatment/${id}`} className="nav-link text-white">
                E-Passbook
              </Link>
            </li>
            <li className="nav-item" style={{ width: "30%" }}>
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic" style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.680-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
              </svg> Welcome, {userName}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ zIndex: 1001 }}>
                  <Dropdown.Item href={`/usersettings/${id}`} className="text-success">Settings</Dropdown.Item>
                  <Dropdown.Item href={`/close/${id}`} className="text-success">Close Account</Dropdown.Item>
                  <Dropdown.Item href="/" className="text-success">Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;