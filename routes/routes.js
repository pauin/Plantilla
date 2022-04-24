const express = require('express')
const fs = require('fs').promises
const { agenda, get_agenda, host } = require('../db.js')


const router = express.Router()

function protected_route (req, res, next) {
  if (!req.session.user) {
    // si quiere trabajar sin rutas prptegidas, comente la siguiente línea
    return res.redirect('/login')
  }
  next()
}

// RUTAS
router.get('/', protected_route, async(req, res) => {
  const usuario = req.session.user.name
  const hospedador= req.body.usuario
  res.render('index.html', {usuario, hospedador})
})

router.post('/appointments', async (req, res) => {
  const fecha= req.body.fecha
  const horas= req.body.horas
  const usuario = req.session.user.id
  const comentarios= req.body.comentarios
  const agendado= await agenda(fecha, horas, usuario, comentarios)
  res.redirect('/')
});

router.get('/appointments', protected_route, async (req, res) => {

  res.render('appointments.html')
})

module.exports = router
