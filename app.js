const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

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

app.use(cookieParser())
app.use(bodyParser.urlencoded({extend: false}));

// parseando os dados do body para json
app.use(bodyParser.json());


// definindo rotas
app.use('/', require('./routes/paginas'))

app.use('/autenticacao', require('./routes/autenticacao'));

const diretorioPublico = path.join(__dirname,'./public')

app.use(express.static(diretorioPublico));

app.set('view engine', 'hbs');

// Startando o banco
app.listen(5000, () => {
  console.log('server startado na porta 5000')
})