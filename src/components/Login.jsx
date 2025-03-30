import { useWallet } from "../context/useWallet";

const Login = () => {
  const { login } = useWallet();
  
  return (
    <div className="login-container">
      <h1>BridgeWallet</h1>
      <p>Please login to access your wallet</p>
      <button 
        className="primary-button" 
        onClick={login}
      >
        Login
      </button>
    </div>
  );
};

export default Login; 