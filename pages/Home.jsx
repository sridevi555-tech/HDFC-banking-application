

const cardStyle = {
  width: "100%",
  maxWidth: "18rem",
  margin: "0 auto",
  marginBottom: "20px",
  padding: "1rem",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
};

const textStyle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "5rem" }}>
      <div style={cardStyle}>
        <h3 style={textStyle}>Establish</h3>
        <p>This bank was established in the year <b>1995</b></p>
        <p>We have a century of experience in the banking field with 200 branches.</p>
      </div>
      <div style={cardStyle}>
        <h3 style={textStyle}>Owner</h3>
        <p>This Bank was established by the great <b><i>P.Sridevi Reddy</i></b></p>
        <p>He has a wealth of experience in bank software and the banking sector.</p>
      </div>
      <div style={cardStyle}>
        <h3 style={textStyle}>Partners</h3>
        <p>We have tied up with <b>RBI</b> for verified banking services.</p>
        <p>And we have partnered with <b>Google</b> for the security of our banks.</p>
      </div>
    </div>
  );
};

export default Home;