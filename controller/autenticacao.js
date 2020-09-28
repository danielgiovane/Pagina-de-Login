const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USUARIO,
  password: process.env.DATABASE_SENHA,
  database: process.env.DATABASE
});


exports.registrar = (req, res) => {
  console.log(req.body)

  const { nome, email, senha, confirmaSenha } = req.body;

  db.query('SELECT email FROM usuarios WHERE email = ?', [email], async (error, resultado) => {
    if (error) {
      console.log(error);
    }

    if (resultado.length > 0) {
      return res.render('registrar', {
        message: 'Email em uso'
      })
    } else if (senha !== confirmaSenha) {
      return res.render('registrar', {
        message: 'Senha não confere'
      });
    }

    const senhaComHash = await bcrypt.hash(senha, 8);
    console.log(senhaComHash)

    db.query('INSERT INTO usuarios SET ?', {nome: nome, email: email, senha: senhaComHash}, (error, resultado) => {
      if(error){
        console.log(error)
      }else {
        console.log(resultado)
        return res.render('registrar', {
          message: 'Registrado com suceeso'
        });
      }
    })
  })

}