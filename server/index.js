const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Ofin AI Server is running 24/7!');
});

// Jab Twilio se call connect hogi
app.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({ language: 'hi-IN' }, 'Ofin AI bridge connected.');
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Ofin AI server listening on port ${PORT}`);
});
