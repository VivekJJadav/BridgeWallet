import "./App.css";
import { WalletProvider } from "./context/WalletProvider";
import WalletApp from "./components/WalletApp";

function App() {
  return (
    <WalletProvider>
      <WalletApp />
    </WalletProvider>
  );
}

export default App;