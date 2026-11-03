class ListarTareas {
  constructor(repositorio) { this.repositorio = repositorio; }

  async ejecutar() {
    return this.repositorio.listar();
  }
}
module.exports = ListarTareas;
