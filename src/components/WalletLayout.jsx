import { useWallet } from "../context/useWallet";
import Header from "./Header";
import NetworkSelector from "./NetworkSelector";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AssetPage from "./Menu/AssetPage";
import ActivityPage from "./Menu/ActivityPage";
import TransferPage from "./Menu/TransferPage";
import ImportPage from "./Menu/ImportPage";

const WalletLayout = () => {
  const { activeTab } = useWallet();

  return (
    <div className="wallet-container">
      <Header />
      <NetworkSelector />
      <Navigation />
      
      <main className="wallet-content">
        {activeTab === "assets" && <AssetPage />}
        {activeTab === "activity" && <ActivityPage />}
        {activeTab === "transfer" && <TransferPage />}
        {activeTab === "import" && <ImportPage />}
      </main>
      
      <Footer />
    </div>
  );
};

export default WalletLayout; 