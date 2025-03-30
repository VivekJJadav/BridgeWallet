import { useWallet } from "../context/useWallet";
import Login from "./Login";
import WalletLayout from "./WalletLayout";

const WalletApp = () => {
  const { isAuthenticated } = useWallet();
  
  return isAuthenticated ? <WalletLayout /> : <Login />;
};

export default WalletApp; 