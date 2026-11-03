const express = require('express');

module.exports = function tareaRoutes({ crearTarea, listarTareas }) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    res.json(await listarTareas.ejecutar());
  });

  router.post('/', async (req, res) => {
    try {
      const tarea = await crearTarea.ejecutar(req.body.texto);
      res.status(201).json(tarea);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  return router;
};
