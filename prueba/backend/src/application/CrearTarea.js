const Tarea = require('../domain/Tarea');

class CrearTarea {
  constructor(repositorio) { this.repositorio = repositorio; }

  async ejecutar(texto) {
    const tarea = new Tarea({ texto });
    return this.repositorio.guardar(tarea);
  }
}
module.exports = CrearTarea;
