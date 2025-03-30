import { useWallet } from "../context/useWallet";

const NetworkSelector = () => {
  const { 
    selectedNetwork, 
    setSelectedNetwork, 
    networks,
    transferForm,
    setTransferForm,
    importForm,
    setImportForm
  } = useWallet();
  
  const handleNetworkChange = (e) => {
    const network = e.target.value;
    setSelectedNetwork(network);
    setTransferForm({...transferForm, network});
    setImportForm({...importForm, network});
  };
  
  return (
    <div className="network-selector">
      <label>Network:</label>
      <select 
        value={selectedNetwork} 
        onChange={handleNetworkChange}
      >
        <option value="all">All Networks</option>
        {networks.map(network => (
          <option key={network.id} value={network.id}>
            {network.icon} {network.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NetworkSelector; 