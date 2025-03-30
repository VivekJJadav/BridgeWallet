import { useState, useEffect } from "react";
import { WalletContext } from "./WalletContext";

export const WalletProvider = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Wallet state
  const [activeTab, setActiveTab] = useState("assets");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [balance, setBalance] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Transfer form state
  const [transferForm, setTransferForm] = useState({
    recipient: "",
    amount: "",
    currency: "",
    network: "ethereum",
  });

  // Import token form state
  const [importForm, setImportForm] = useState({
    tokenAddress: "",
    tokenSymbol: "",
    tokenDecimals: "18",
    network: "ethereum",
  });

  // Available networks with their details
  const networks = [
    { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "🔷" },
    { id: "solana", name: "Solana", symbol: "SOL", icon: "🟢" },
  ];

  // Mock data for demonstration
  useEffect(() => {
    // Simulate fetching wallet data
    const mockCurrencies = [
      { id: 1, name: "Ethereum", symbol: "ETH", balance: 1.234, value: 4567.89, network: "ethereum", icon: "🔷" },
      { id: 2, name: "USD Coin", symbol: "USDC", balance: 250.00, value: 250.00, network: "ethereum", icon: "💵" },
      { id: 3, name: "Solana", symbol: "SOL", balance: 1.234, value: 4567.89, network: "solana", icon: "🟢" },
    ];
    
    const mockTransactions = [
      { id: 1, type: "Received", amount: 0.5, symbol: "ETH", from: "0x1a2...3b4c", to: "You", date: "2025-03-28", status: "completed", network: "ethereum" },
      { id: 2, type: "Sent", amount: 100, symbol: "USDC", from: "You", to: "0x5d6...7e8f", date: "2025-03-27", status: "completed", network: "ethereum" },
      { id: 3, type: "Received", amount: 2, symbol: "BNB", from: "0x9g0...1h2i", to: "You", date: "2025-03-25", status: "completed", network: "binance" },
      { id: 4, type: "Sent", amount: 0.1, symbol: "ETH", from: "You", to: "0x3j4...5k6l", date: "2025-03-23", status: "pending", network: "ethereum" },
    ];
    
    setCurrencies(mockCurrencies);
    setTransactions(mockTransactions);
    
    // Calculate total balance in USD
    const totalBalance = mockCurrencies.reduce((total, currency) => total + currency.value, 0);
    setBalance(totalBalance);
    
    // Check if user is authenticated (in a real app, this would check for a valid token)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Filter currencies by selected network
  const filteredCurrencies = currencies.filter(currency => 
    selectedNetwork === "all" || currency.network === selectedNetwork
  );
  
  // Filter transactions by selected network
  const filteredTransactions = transactions.filter(transaction => 
    selectedNetwork === "all" || transaction.network === selectedNetwork
  );

  // Handle transfer form input changes
  const handleTransferChange = (e) => {
    setTransferForm({
      ...transferForm,
      [e.target.name]: e.target.value
    });
  };

  // Handle currency transfer
  const handleTransfer = (e) => {
    e.preventDefault();
    // Here you would connect to the blockchain and perform the transfer
    // For demo purposes, we'll just add a new transaction
    const newTransaction = {
      id: transactions.length + 1,
      type: "Sent",
      amount: parseFloat(transferForm.amount),
      symbol: transferForm.currency,
      from: "You",
      to: transferForm.recipient,
      date: new Date().toISOString().split('T')[0],
      status: "pending",
      network: transferForm.network
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    // Update the currency balance
    const updatedCurrencies = currencies.map(currency => {
      if (currency.symbol === transferForm.currency && currency.network === transferForm.network) {
        return {
          ...currency,
          balance: currency.balance - parseFloat(transferForm.amount),
          value: currency.value - (parseFloat(transferForm.amount) * (currency.value / currency.balance))
        };
      }
      return currency;
    });
    
    setCurrencies(updatedCurrencies);
    
    // Recalculate total balance
    const newTotalBalance = updatedCurrencies.reduce((total, currency) => total + currency.value, 0);
    setBalance(newTotalBalance);
    
    // Reset form
    setTransferForm({
      recipient: "",
      amount: "",
      currency: "",
      network: selectedNetwork,
    });
    
    alert("Transfer initiated!");
  };

  // Handle import token form
  const handleImportToken = (e) => {
    e.preventDefault();
    // In a real app, you would validate the token exists on the blockchain
    // For demo purposes, we'll just add it to our list
    const newToken = {
      id: currencies.length + 1,
      name: importForm.tokenSymbol,
      symbol: importForm.tokenSymbol,
      balance: 0,
      value: 0,
      network: importForm.network,
      icon: "🪙"
    };
    
    setCurrencies([...currencies, newToken]);
    
    // Reset form
    setImportForm({
      tokenAddress: "",
      tokenSymbol: "",
      tokenDecimals: "18",
      network: selectedNetwork,
    });
    
    alert("Token imported successfully!");
    setActiveTab("assets");
  };

  // Handle import form changes
  const handleImportChange = (e) => {
    setImportForm({
      ...importForm,
      [e.target.name]: e.target.value
    });
  };

  const login = () => {
    localStorage.setItem("token", "demo-token");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <WalletContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      activeTab,
      setActiveTab,
      selectedNetwork,
      setSelectedNetwork,
      balance,
      networks,
      currencies,
      filteredCurrencies,
      transactions,
      filteredTransactions,
      transferForm,
      setTransferForm,
      handleTransferChange,
      handleTransfer,
      importForm,
      setImportForm,
      handleImportChange,
      handleImportToken,
      login,
      logout
    }}>
      {children}
    </WalletContext.Provider>
  );
}; 