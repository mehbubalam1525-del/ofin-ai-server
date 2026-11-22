const express = require('express');
const { Vonage } = require('@vonage/server-sdk');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const privateKey = (process.env.VONAGE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: privateKey
});

app.get('/', (req, res) => {
  res.send('Ofin AI Vonage Server is LIVE 24/7!');
});

app.get('/call-me', async (req, res) => {
  try {
    const userNumber = process.env.USER_PHONE_NUMBER || '918527704501';
    const hostUrl = `https://${req.get('host')}`;

    const resp = await vonage.voice.createOutboundCall({
      from: { type: 'phone', number: userNumber },
      from: { type: 'phone', number: '12015550123' },
      answer_url: [`${hostUrl}/voice`],
      event_url: [`${hostUrl}/event`]
    });

    console.log('Call initiated:', resp);
    res.json({ status: 'Calling your phone now!', call: resp });
  } catch (err) {
    console.error('Call error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.all('/voice', (req, res) => {
  const ncco = [
    {
      action: 'talk',
      text: 'Namaste Altmash! Ofin AI server connect ho gaya hai.',
      language: 'hi-IN'
    }
  ];
  res.json(ncco);
});

app.all('/event', (req, res) => {
  console.log('Vonage Event:', req.body || req.query);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Ofin AI server running on port ${PORT}`);
});
