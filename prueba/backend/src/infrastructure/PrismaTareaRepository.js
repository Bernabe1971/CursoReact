const Tarea = require('../domain/Tarea');

class PrismaTareaRepository {
  constructor(prisma) { this.prisma = prisma; }

  async guardar(tarea) {
    const fila = await this.prisma.tarea.create({ data: { texto: tarea.texto } });
    return new Tarea(fila);
  }

  async listar() {
    const filas = await this.prisma.tarea.findMany();
    return filas.map(f => new Tarea(f));
  }
}
module.exports = PrismaTareaRepository;
