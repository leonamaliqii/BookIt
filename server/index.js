 const express = require('express');
const app = express();
const port = 3001;

// Rruga bazë
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Serveri dëgjon në portin 3001
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

