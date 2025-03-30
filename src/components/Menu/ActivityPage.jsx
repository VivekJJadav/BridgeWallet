import { useWallet } from "../../context/useWallet";

const ActivityPage = () => {
  const { filteredTransactions, networks } = useWallet();
  
  return (
    <div className="activity-content">
      <h2>Transaction History</h2>
      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <p>No transactions found on this network</p>
        </div>
      ) : (
        <ul className="transactions-list">
          {filteredTransactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <div className={`transaction-type ${transaction.type.toLowerCase()}`}>
                {transaction.type === "Sent" ? "↑" : "↓"}
              </div>
              <div className="transaction-details">
                <div className="transaction-title">
                  {transaction.type} {transaction.symbol}
                </div>
                <div className="transaction-date">{transaction.date}</div>
              </div>
              <div className="transaction-addresses">
                <div className="transaction-from">From: {transaction.from}</div>
                <div className="transaction-to">To: {transaction.to}</div>
              </div>
              <div className="transaction-amount-status">
                <div className="transaction-amount">
                  {transaction.type === "Sent" ? "-" : "+"}{transaction.amount} {transaction.symbol}
                </div>
                <div className="transaction-status">
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
              <div className="transaction-network">
                {networks.find(n => n.id === transaction.network)?.icon}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityPage;
