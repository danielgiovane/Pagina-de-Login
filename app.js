const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login'
});

db.connect((err) => {
  if(err){
    console.log(err)
  }else {
    console.log('Mysql Conectado...')
  }
})

const app = express();

app.get('/', (req, res) => {
  res.send('<h1> Pagina Home </h1>')
});


app.listen(5000, () => {
  console.log('server startado na porta 5000')
})