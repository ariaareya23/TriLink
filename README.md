# 🌉 TriLink: Cross-Chain Swap & Remittance Portal

> Send funds from **Stellar** to **Ethereum** and **NEAR**, with seamless swap simulation powered by **1inch API** — bridging speed, liquidity, and decentralization.

---

## 🚀 Live Demo

[🔗 Vercel frontend link (coming soon)](https://trilink.vercel.app)  
[🔗 Render backend link (coming soon)](https://trilink-api.onrender.com)

---

## 🏆 Submitting For:

| Prize Track                         | How We Qualify |
|------------------------------------|----------------|
| **Stellar × 1inch** ($10,000)      | Uses Stellar SDK + 1inch APIs for cross-chain swap simulation |
| **1inch API dApp** ($30,000)       | Implements `/quote`, `/swap`, `/tokens` endpoints |
| **Extend Fusion+ to NEAR** ($32,000) | Integrates NEAR ↔ Ethereum HTLC smart contract UI |

---

## 🧠 What TriLink Does

### 1. 🔁 Stellar ➞ Ethereum Remittance (Testnet)
- User enters:
  - `Stellar Secret Key`
  - `Stellar Recipient Address`
  - `Amount`
- App uses `stellar-sdk` to send XLM on **Stellar Testnet**
- ETH output estimated in real-time using `1inch /quote`
- Displays successful TX hash (linked to explorer)

### 2. 💱 1inch API Swap Viewer
- Uses 3+ endpoints:
  - `/tokens` to show token options
  - `/quote` to simulate swap
  - `/swap` to preview raw TX
- Swap simulation without executing actual on-chain call

### 3. 🔐 NEAR ↔ Ethereum HTLC Bridge UI
- Lock NEAR tokens using `new_swap`
- Redeem funds with secret
- Refund with timeout
- Shows tx status, explorer links

---

## 🧱 Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Express.js, Node.js
- **APIs:** 
  - [Stellar SDK (testnet)](https://developers.stellar.org/docs)
  - [1inch API](https://docs.1inch.io/)
  - [Custom NEAR HTLC Smart Contract] (via friend’s testnet deployment)

---

## 📦 Folder Structure

```bash
TriLink/
├── public/
├── src/
│   ├── pages/
│   │   └── StellarRemit.jsx     # Stellar sender UI
│   ├── components/
│   │   └── SwapViewer.jsx       # 1inch API swap simulator
│   └── App.jsx
├── server.cjs                   # Express API backend
├── stellar.cjs                  # Stellar SDK helper
├── package.json
└── README.md

🧪 How to Run Locally
1. Install dependencies
npm install
2. Start backend (port 3000)
node server.cjs
3. Start frontend (port 5173+)
npm run dev
