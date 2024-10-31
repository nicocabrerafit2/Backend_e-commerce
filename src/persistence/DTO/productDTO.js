export class productDTOReq {
  constructor(product) {
    {
      this.title =
        product.title ||
        product.name ||
        product.nombre ||
        "Producto sin nombre";
      this.description =
        product.description ||
        product.descripcion ||
        "Producto sin descripcion";
      this.code = product.code || product.codigo;
      this.price = product.price || product.precio;
      this.stock = product.stock || product.quantity || product.cantidad;
      this.category = product.category || product.categoria;
      this.thumbnails = product.thumbnails || product.imagen;
    }
  }
}

export class productDTORes {
  constructor(product) {
    this.nombre = product.title;
    this.descripcion = product.description;
    this.codigo = product.code;
    this.precio = product.price;
    this.cantidad = product.stock;
    this.categoria = product.category;
    this.imagen = product.thumbnails;
  }
}
