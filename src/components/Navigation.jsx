import { useWallet } from "../context/useWallet";

const Navigation = () => {
  const { activeTab, setActiveTab } = useWallet();
  
  return (
    <nav className="wallet-tabs">
      <button
        className={`tab-button ${activeTab === "assets" ? "active" : ""}`}
        onClick={() => setActiveTab("assets")}
      >
        Assets
      </button>
      <button
        className={`tab-button ${activeTab === "activity" ? "active" : ""}`}
        onClick={() => setActiveTab("activity")}
      >
        Activity
      </button>
      <button
        className={`tab-button ${activeTab === "transfer" ? "active" : ""}`}
        onClick={() => setActiveTab("transfer")}
      >
        Transfer
      </button>
      <button
        className={`tab-button ${activeTab === "import" ? "active" : ""}`}
        onClick={() => setActiveTab("import")}
      >
        Import Token
      </button>
    </nav>
  );
};

export default Navigation;
