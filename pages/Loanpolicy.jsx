

const Loanpolicy = () => {
  return (
    <div className="container mt-5 d-flex justify-content-around">
      <div className="col-sm-4">
        <div className="card p-4 shadow">
          <h3>Loan Eligibility</h3>
          <p>You should maintain a minimum balance to be eligible for a loan.</p>
          <p>We require collateral for large loan amounts.</p>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card p-4 shadow">
          <h3>Our Loan Policy</h3>
          <p>Our loan interest rates are competitive and low.</p>
          <p>We do not charge any extra taxes or hidden fees on loans.</p>
        </div>
      </div>
    </div>
  );
}

export default Loanpolicy;