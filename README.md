# Bridge Wallet Extension

A browser extension that provides a bridge between web applications and blockchain networks, allowing users to manage wallets, check balances, and perform transactions directly from their browser.

## Features

- Create and import wallets using private keys or seed phrases
- Securely store encrypted wallet information locally
- View wallet balances across multiple networks
- Send transactions to any blockchain address
- Integrate easily with web applications using the bridgeWallet provider
- Event listeners for connection status, account changes, and network changes
- Compatible with most Ethereum-based applications

## Installation

### From Chrome Web Store

1. Visit the Chrome Web Store (link coming soon)
2. Click "Add to Chrome"
3. Follow the prompts to complete installation

### Manual Installation (Development)

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/bridge-wallet-extension.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top-right corner

4. Click "Load unpacked" and select the repository folder

5. The extension should now be installed and visible in your extensions list

## Usage

### Extension Interface

1. Click the Bridge Wallet icon in your browser toolbar to open the wallet interface
2. Create a new wallet or import an existing one
3. View your account details, balances, and transaction history
4. Send transactions by entering recipient address and amount

### For Developers (Using the bridgeWallet Provider)

The extension injects a `window.bridgeWallet` object into web pages, which can be used to interact with the user's wallet.

#### Installation

Install the npm package to easily integrate with the extension:

```bash
npm install bridgewallet
```

or

```bash
yarn add bridgewallet
```

#### Basic Usage

```javascript
import { WalletManager } from 'bridgewallet';

// Create a wallet manager instance
const walletManager = new WalletManager();

// Connect to the wallet
async function connectWallet() {
  try {
    const accounts = await walletManager.connect();
    console.log('Connected accounts:', accounts);
    
    // Get the current balance
    const balance = await walletManager.getBalance(accounts[0]);
    console.log('Balance:', balance);
    
    // Listen for account changes
    walletManager.onAccountsChanged((accounts) => {
      console.log('Accounts changed:', accounts);
    });
  } catch (error) {
    console.error('Failed to connect:', error);
  }
}

// Send a transaction
async function sendTransaction() {
  try {
    const txHash = await walletManager.sendTransaction({
      to: '0xRecipientAddress',
      value: '0x38D7EA4C68000', // 0.001 ETH in hex
      gas: '0x5208', // 21000 gas
    });
    console.log('Transaction sent:', txHash);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}
```

#### Available Methods

The `bridgeWallet` provider supports these methods through `walletManager`:

- `connect()` - Prompts the user to connect their wallet, returns accounts array
- `getAccounts()` - Gets the current connected accounts
- `getBalance(address)` - Gets the balance for the specified address
- `getChainId()` - Gets the current chain ID
- `signMessage(message)` - Signs a message
- `sendTransaction(txParams)` - Sends a transaction
- `importWallet(privateKey)` - Imports a wallet (requires user approval)
- `createWallet()` - Creates a new wallet (requires user approval)

#### Event Listeners

Set up listeners to respond to wallet events:

```javascript
// Listen for connection status changes
walletManager.onConnect((chainId) => {
  console.log('Connected to chain:', chainId);
});

// Listen for disconnection
walletManager.onDisconnect((error) => {
  console.log('Disconnected:', error);
});

// Listen for account changes
walletManager.onAccountsChanged((accounts) => {
  console.log('Accounts changed:', accounts);
});

// Listen for chain changes
walletManager.onChainChanged((chainId) => {
  console.log('Chain changed to:', chainId);
});
```

## Development

### Project Structure

```
bridge-wallet-extension/
├── manifest.json        # Extension manifest
├── background.js        # Background service worker
├── content.js           # Content script to inject provider
├── inject.js            # Script that defines the bridgeWallet object
├── popup/               # Extension UI
│   ├── popup.html       # Popup HTML
│   ├── popup.js         # Popup logic
│   └── styles.css       # Popup styles
├── wallet/              # Wallet implementation
│   ├── wallet.js        # Wallet logic
│   ├── keystore.js      # Key storage and encryption
│   └── networks.js      # Network definitions
└── icons/               # Extension icons
```

### Building from Source

1. Install dependencies:
   ```
   npm install
   ```

2. Build the extension:
   ```
   npm run build
   ```

3. The built extension will be in the `dist/` directory

## Security

- Private keys are encrypted and stored locally
- The extension never sends private keys over the network
- Transactions must be confirmed by the user before being signed
- Connection requests from websites require explicit user approval

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Disclaimer

This extension is provided as-is without warranties. Always backup your wallet and private keys. The developers are not responsible for any loss of funds.
