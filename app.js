const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');


dotenv.config({path: './.env'})

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USUARIO,
  password: process.env.DATABASE_SENHA,
  database: process.env.DATABASE
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

app.set('view engine', 'hbs');


app.listen(5000, () => {
  console.log('server startado na porta 5000')
})