import { useWallet } from "../../context/useWallet";

const ImportPage = () => {
  const { 
    importForm, 
    handleImportChange, 
    handleImportToken, 
    networks 
  } = useWallet();
  
  return (
    <div className="import-content">
      <h2>Import Token</h2>
      <form onSubmit={handleImportToken} className="import-form">
        <div className="form-group">
          <label htmlFor="tokenAddress">Token Contract Address</label>
          <input
            type="text"
            id="tokenAddress"
            name="tokenAddress"
            value={importForm.tokenAddress}
            onChange={handleImportChange}
            placeholder="0x..."
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="tokenSymbol">Token Symbol</label>
          <input
            type="text"
            id="tokenSymbol"
            name="tokenSymbol"
            value={importForm.tokenSymbol}
            onChange={handleImportChange}
            placeholder="e.g., LINK"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="tokenDecimals">Token Decimals</label>
          <input
            type="number"
            id="tokenDecimals"
            name="tokenDecimals"
            value={importForm.tokenDecimals}
            onChange={handleImportChange}
            placeholder="18"
            min="0"
            max="36"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="network">Network</label>
          <select
            id="network"
            name="network"
            value={importForm.network}
            onChange={handleImportChange}
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
            Import Token
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportPage;
