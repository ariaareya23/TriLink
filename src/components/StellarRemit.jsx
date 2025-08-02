import React, { useState } from "react";
import axios from "axios";

export default function StellarRemit() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState(null);

  const handleQuote = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/quote", {
        params: {
          amount: amount * 1e6, // USDC has 6 decimals
        },
      });

      console.log("Quote response:", response.data);
      setQuote(response.data);
    } catch (error) {
      console.error("Failed to fetch quote:", error.message);
      setQuote(null);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Stellar → Ethereum Remittance</h2>

      <input
        className="border px-2 py-1 w-full mb-2"
        type="text"
        placeholder="Sender Stellar Address"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />

      <input
        className="border px-2 py-1 w-full mb-2"
        type="number"
        placeholder="Amount (USDC)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="border px-2 py-1 w-full mb-2"
        type="text"
        placeholder="Recipient Ethereum Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={handleQuote}
      >
        Get ETH Quote
      </button>

      <div>
        <strong>Estimated ETH Output:</strong>
        <p>
          {quote && quote.toTokenAmount
            ? `${(Number(quote.toTokenAmount) / 1e18).toFixed(6)} ETH`
            : "Failed to parse quote"}
        </p>
      </div>
    </div>
  );
}

