import { useWallet } from "../../context/useWallet";

const AssetPage = () => {
  const { 
    filteredCurrencies, 
    networks, 
    setActiveTab, 
    transferForm, 
    setTransferForm 
  } = useWallet();
  
  return (
    <div className="assets-content">
      <h2>Your Assets</h2>
      {filteredCurrencies.length === 0 ? (
        <div className="empty-state">
          <p>No assets found on this network</p>
          <button
            className="secondary-button"
            onClick={() => setActiveTab("import")}
          >
            Import Token
          </button>
        </div>
      ) : (
        <ul className="assets-list">
          {filteredCurrencies.map((currency) => (
            <li key={currency.id} className="asset-item">
              <div className="asset-icon">{currency.icon}</div>
              <div className="asset-details">
                <div className="asset-name">{currency.name}</div>
                <div className="asset-network">
                  {networks.find((n) => n.id === currency.network)?.name}
                </div>
              </div>
              <div className="asset-balances">
                <div className="asset-balance">
                  {currency.balance} {currency.symbol}
                </div>
                <div className="asset-value">
                  $
                  {currency.value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              <button
                className="asset-action-button"
                onClick={() => {
                  setActiveTab("transfer");
                  setTransferForm({
                    ...transferForm,
                    currency: currency.symbol,
                    network: currency.network,
                  });
                }}
              >
                Send
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssetPage;
