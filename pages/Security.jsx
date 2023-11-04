

const containerStyle = {
  marginTop: "5rem",
  display: "flex",
  justifyContent: "space-around",
};

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

const Security = () => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3 style={textStyle}>Security Steps</h3>
        <p>1. Choose strong and unique passwords.</p>
        <p>2. Enable two-factor authentication.</p>
        <p>3. Steer clear of public Wi-Fi.</p>
        <p>4. Sign up for banking alerts.</p>
        <p>5. Be wary of phishing scams.</p>
        <p>6. Choose trustworthy financial apps.</p>
      </div>
      <div style={cardStyle}>
        <h3 style={textStyle}>Our Side Security Measures</h3>
        <p>We have partnered with a security providing company.</p>
        <p>Our servers are highly secure and reliable.</p>
      </div>
    </div>
  );
}

export default Security;