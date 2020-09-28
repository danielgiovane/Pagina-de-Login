exports.registrar = (req, res) => {
  if(req.body !== undefined){
    res.send('Formulario submetido com sucesso')
    console.log(req.body)
  }else {
    console.log('formulario undefined')
  }
}