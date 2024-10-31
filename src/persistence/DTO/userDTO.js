export class userDTOReq {
  constructor(user) {
    {
      this.name = user.name || user.nombre || "Sin nombre";
      this.last_name = user.last_name || user.apellido || "Sin apellido";
      this.email = user.email || user.correo;
      this.rol = user.rol || user.tipo;
      this.password = user.password || user.contraseña;
    }
  }
}

export class userDTORes {
  constructor(user) {
    this.nombre = user.name;
    this.apellido = user.last_name;
    this.correo = user.email;
    this.rol = user.rol;
    this.carts = user.carts;
  }
}
