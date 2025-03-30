import React from "react";
import { useWallet } from "../../context/useWallet";

const TransferPage = () => {
  const { 
    transferForm,
    handleTransferChange,
    handleTransfer,
    currencies,
    networks
  } = useWallet();
    
  return (
    <div className="transfer-content">
      <h2>Transfer Funds</h2>
      <form className="transfer-form" onSubmit={handleTransfer}>
        <div className="form-group">
          <label htmlFor="network">Network</label>
          <select
            id="network"
            name="network"
            value={transferForm.network}
            onChange={handleTransferChange}
            required
          >
            {networks.map((network) => (
              <option key={network.id} value={network.id}>
                {network.icon} {network.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="currency">Asset</label>
          <select
            id="currency"
            name="currency"
            value={transferForm.currency}
            onChange={handleTransferChange}
            required
          >
            <option value="">Select an asset</option>
            {currencies
              .filter((currency) => currency.network === transferForm.network)
              .map((currency) => (
                <option key={currency.id} value={currency.symbol}>
                  {currency.symbol} ({currency.balance} available)
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recipient">Recipient Address</label>
          <input
            id="recipient"
            name="recipient"
            type="text"
            placeholder="0x..."
            value={transferForm.recipient}
            onChange={handleTransferChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="0.0"
            min="0"
            step="any"
            value={transferForm.amount}
            onChange={handleTransferChange}
            required
          />
          {transferForm.currency && (
            <div className="available-balance">
              Available:{" "}
              {currencies.find((c) => c.symbol === transferForm.currency)
                ?.balance || 0}{" "}
              {transferForm.currency}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={
            !transferForm.recipient ||
            !transferForm.amount ||
            !transferForm.currency
          }
        >
          Send Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferPage;
