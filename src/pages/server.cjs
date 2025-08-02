const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const StellarSdk = require('stellar-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARE ===
app.use(cors()); // You can also restrict it: cors({ origin: 'https://your-vercel-site.vercel.app' })
app.use(bodyParser.json());

// === API ENDPOINT ===
app.post('/api/send-stellar', async (req, res) => {
  const { fromSecret, toAddress, amount } = req.body;

  console.log('📥 Request received:', { fromSecret, toAddress, amount });

  try {
    const sourceKeypair = StellarSdk.Keypair.fromSecret(fromSecret);
    const sourcePublicKey = sourceKeypair.publicKey();

    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    StellarSdk.Networks.TESTNET;

    // Load sender account
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();

    // Build transaction
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: toAddress,
        asset: StellarSdk.Asset.native(),
        amount: amount,
      }))
      .setTimeout(30)
      .build();

    // Sign & Submit
    transaction.sign(sourceKeypair);
    const txResult = await server.submitTransaction(transaction);

    console.log('✅ Transaction Success:', txResult.hash);

    res.json({ txHash: txResult.hash });

  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Transaction failed' });
  }
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`👋 server.cjs is running`);
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

