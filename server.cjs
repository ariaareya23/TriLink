const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendXLM } = require('./stellar.cjs');

const app = express();
const PORT = 3000;

console.log('👋 server.cjs is running');

app.use(cors());
app.use(bodyParser.json());

app.post('/api/quote', (req, res) => {
  const { amount } = req.body;
  const toAmount = (Number(amount) * 0.015).toFixed(6);
  res.json({ toAmount });
});

app.post('/api/send-stellar', async (req, res) => {
  const { fromSecret, toAddress, amount } = req.body;

  if (!fromSecret || !toAddress || !amount) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const result = await sendXLM({ fromSecret, toPublic: toAddress, amount });

  if (result.success) {
    res.json({ txHash: result.hash });
  } else {
    res.status(500).json({ error: result.error });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

