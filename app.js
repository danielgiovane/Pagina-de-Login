const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1> Home page </h1>')
});


app.listen(5000, () => {
  console.log('server startado na porta 5000')
})