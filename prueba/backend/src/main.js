const express = require('express');
const { PrismaClient } = require('@prisma/client');
const PrismaTareaRepository = require('./infrastructure/PrismaTareaRepository');
const CrearTarea = require('./application/CrearTarea');
const ListarTareas = require('./application/ListarTareas');
const tareaRoutes = require('./presentation/tareaRoutes');

const repositorio = new PrismaTareaRepository(new PrismaClient());

const app = express();
app.use(express.json());
app.use('/api/tareas', tareaRoutes({
  crearTarea: new CrearTarea(repositorio),
  listarTareas: new ListarTareas(repositorio)
}));

app.listen(3001, () => console.log('API en http://localhost:3001'));
