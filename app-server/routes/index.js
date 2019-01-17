const app = module.exports = require('express')();
const path = require('path');

app.use(require('./room'));
app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});
