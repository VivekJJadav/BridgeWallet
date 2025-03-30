import { useWallet } from "../../context/useWallet";

const TransferPage = () => {
  const { 
    transferForm, 
    handleTransferChange, 
    handleTransfer, 
    currencies, 
    networks, 
    selectedNetwork 
  } = useWallet();
  
  // Filter currencies for the selected network for the dropdown
  const networkCurrencies = currencies.filter(
    currency => selectedNetwork === "all" || currency.network === selectedNetwork
  );
  
  return (
    <div className="transfer-content">
      <h2>Transfer Tokens</h2>
      <form onSubmit={handleTransfer} className="transfer-form">
        <div className="form-group">
          <label htmlFor="recipient">Recipient Address</label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            value={transferForm.recipient}
            onChange={handleTransferChange}
            placeholder="0x..."
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transferForm.amount}
            onChange={handleTransferChange}
            placeholder="0.0"
            min="0"
            step="0.000001"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="currency">Token</label>
          <select
            id="currency"
            name="currency"
            value={transferForm.currency}
            onChange={handleTransferChange}
            required
          >
            <option value="">Select token</option>
            {networkCurrencies.map(currency => (
              <option key={`${currency.symbol}-${currency.network}`} value={currency.symbol}>
                {currency.icon} {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="network">Network</label>
          <select
            id="network"
            name="network"
            value={transferForm.network}
            onChange={handleTransferChange}
            required
          >
            {networks.map(network => (
              <option key={network.id} value={network.id}>
                {network.icon} {network.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="primary-button">
            Send Tokens
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferPage; 