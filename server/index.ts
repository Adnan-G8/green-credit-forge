// Temporary server file to prevent build errors
// This will be replaced when you sync from your GitHub branch

import express from 'express';

console.log('Temporary server running - please sync from your GitHub branch');

const port = process.env.PORT || 3001;
const app = express();

app.get('*', (req, res) => {
  res.send('Temporary server - please sync from GitHub branch');
});

app.listen(port, () => {
  console.log(`Temporary server running on port ${port}`);
});