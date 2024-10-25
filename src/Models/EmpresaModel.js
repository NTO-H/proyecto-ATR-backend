const mongoose = require("mongoose");

const DatosAtelierSchema = mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  redesSociales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RedesSociales", // Referencia al modelo RedesSociales
    },
    
  ],
  slogan: {
    type: String,
    maxlength: 100, // Límite de caracteres
  },
  tituloPagina: {
    type: String,
    maxlength: 60, // Límite de caracteres para el título de página
  },
  direccion: {
    type: String,
    required: true,
  },
  correoElectronico: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
  },
});
const redesSocialesSchema = mongoose.Schema({
  plataforma: {
    type: String,
    required: true, // Puedes marcarlo como requerido si es necesario
  },
  enlace: {
    type: String,
    required: true, // Asegúrate de que haya un enlace para la plataforma
  },
  activo: {
    type: Boolean,
    default: true, // Indica si la red social está activa
  },
});


module.exports = {
  DatosAtelier: mongoose.model("DatosAtelier", DatosAtelierSchema),
  RedesSociales: mongoose.model("RedesSociales", redesSocialesSchema),
};
