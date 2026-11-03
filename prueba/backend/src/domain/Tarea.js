class Tarea {
  constructor({ id, texto }) {
    if (!texto || !texto.trim()) {
      throw new Error('El texto de la tarea es obligatorio');
    }
    if (texto.length > 100) {
      throw new Error('La tarea no puede tener más de 100 caracteres');
    }
    this.id = id;
    this.texto = texto.trim();
  }
}
module.exports = Tarea;
