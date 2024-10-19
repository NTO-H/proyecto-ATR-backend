const { Usuario } = require("../Models/UsuarioModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const webpush = require("../Shareds/webpush");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let usuario;
    
    usuario = await Usuario.findOne({ email });
    console.table(["correo recibido:", email, "password recibido:", password]);


    if (!usuario) return res.status(401).send("El correo no existe");
    // if (usuario) return res.status(200).send("El correo  existe");


    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) return res.status(401).send("Contraseña incorrecta");

    // Verificar si el usuario tiene un rol
    if (!usuario.rol) {
      // Si el usuario no tiene un rol, enviar un mensaje de error
      return res.status(401).send("El usuario no tiene un rol asignado");
    }

    // Si el usuario tiene un rol, firmar el token JWT con el rol incluido
    const token = jwt.sign({ _id: usuario._id, rol: usuario.rol }, "secret");
    return res.status(200).json({ token, rol: usuario.rol });
  } catch (error) {
    console.log("ohh no :", error);
    return res.status(500).send("Error en el servidor: " + error);
  }
};
