const Footer = () => {
  return (
    <footer className="wallet-footer">
      <div className="footer-item active">
        <span className="footer-icon">💰</span>
        <span className="footer-label">Wallet</span>
      </div>
      <div className="footer-item">
        <span className="footer-icon">🔄</span>
        <span className="footer-label">Swap</span>
      </div>
      <div className="footer-item">
        <span className="footer-icon">📈</span>
        <span className="footer-label">Market</span>
      </div>
      <div className="footer-item">
        <span className="footer-icon">⚙️</span>
        <span className="footer-label">Settings</span>
      </div>
    </footer>
  );
};

export default Footer; 