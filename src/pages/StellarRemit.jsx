import React, { useState } from 'react';
import axios from 'axios';

function StellarRemit() {
  const [fromSecret, setFromSecret] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      const response = await axios.post('http://localhost:3000/api/send-stellar', {
        fromSecret,
        toAddress,
        amount,
      });

      setTxHash(response.data.txHash);
    } catch (err) {
      setError(err.response?.data?.error || 'Transaction failed');
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Stellar → ETH Remittance</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Stellar From Secret (S...)"
        value={fromSecret}
        onChange={(e) => setFromSecret(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Stellar To Address (G...)"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Amount (XLM)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={handleSend}
        disabled={loading || !fromSecret || !toAddress || !amount}
      >
        {loading ? 'Sending...' : 'Send via Stellar'}
      </button>

      {txHash && (
        <div className="text-green-600 mt-2">
          ✅ Success! TX Hash: <br />
          <a
            href={`https://testnet.steexp.com/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-700 break-words"
          >
            {txHash}
          </a>
        </div>
      )}

      {error && <div className="text-red-600 mt-2">❌ {error}</div>}
    </div>
  );
}

export default StellarRemit;

