import { useContext } from "react";
import { WalletContext } from "./WalletContext";

// Custom hook for accessing the wallet context
export const useWallet = () => useContext(WalletContext); 