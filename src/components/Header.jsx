import { useWallet } from "../context/useWallet";

const Header = () => {
  const { balance, logout } = useWallet();
  
  return (
    <header className="wallet-header">
      <img src="/logo.jpg" alt="BridgeWallet" className="logo"/>
      <div className="logo">BridgeWallet</div>
      <div className="wallet-balance">
        <span className="balance-label">Total Balance</span>
        <span className="balance-amount">
          ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
      <div className="profile">
        <span className="profile-icon" onClick={logout}>👤</span>
      </div>
    </header>
  );
};

export default Header; 