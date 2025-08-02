import React, { useState } from "react";
import axios from "axios";

export default function StellarRemit() {
  const [fromAddress, setFromAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  const handleQuote = async () => {
    try {
      const response = await axios.get("http://localhost:5081/api/quote", {
        params: {
          fromTokenAddress: "0xA0b86991c6218b36c1d19d4a2e9Eb0cE3606eB48", // USDC
          toTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",   // ETH
          amount: amount * 1e6, // USDC has 6 decimals
        },
      });

      console.log("Quote response:", response.data);
      setQuote(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching quote:", err);
      setQuote(null);
      setError("Failed to fetch quote. Check API key, CORS, or amount.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">Stellar → Ethereum Remittance</h2>

      <input
        type="text"
        placeholder="From Stellar Address"
        value={fromAddress}
        onChange={(e) => setFromAddress(e.target.value)}
        className="w-full p-2 mb-2 border"
      />
      <input
        type="number"
        placeholder="Amount (USDC)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-2 border"
      />
      <input
        type="text"
        placeholder="To Ethereum Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        className="w-full p-2 mb-2 border"
      />

      <button
        onClick={handleQuote}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Get ETH Quote
      </button>

      <div className="mt-4">
        <h3 className="font-semibold text-lg">Estimated ETH Output:</h3>
        {quote ? (
          <p className="mt-2 text-lg font-semibold">
            {(parseFloat(quote.toAmount) / 1e18).toFixed(6)} ETH
          </p>
        ) : error ? (
          <p className="text-red-600 mt-2">{error}</p>
        ) : null}
      </div>
    </div>
  );
}

