const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

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

app.get('/', (req, res) => {
  res.render("index")
});

app.set('view engine', 'hbs');

const diretorioPublico = path.join(__dirname,'./public')
app.use(express.static(diretorioPublico));


app.listen(5000, () => {
  console.log('server startado na porta 5000')
})