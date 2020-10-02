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
      console.log(resultado)
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

    db.query('INSERT INTO usuarios SET ?', { nome: nome, email: email, senha: senhaComHash }, (error, resultado) => {
      if (error) {
        console.log(error)
      } else {
        console.log(resultado)
        return res.render('registrar', {
          message: 'Registrado com suceeso'
        });
      }
    })
  })

}

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).render('login', {
        message: 'Por favor forneça email e senha'
      })
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, resultado) => {

      if (!resultado || !(await bcrypt.compare(senha, resultado[0].senha))) {
        res.status(401).render('login', {
          message: 'Email ou senha incorreto'
        })
        return
      }
      const id = resultado[0].id;

      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      console.log('o token é', token)

      const configurarCookies = {
        expires: new Date(
          Date.now + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
      }

      res.cookie('jwt', token, configurarCookies);
      res.status(200).redirect('/');
    })


  } catch (error) {
    console.log(error)
  }

};