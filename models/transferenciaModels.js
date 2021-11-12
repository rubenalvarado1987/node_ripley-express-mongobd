const mongoose = require("mongoose");

const transferenciaShema = mongoose.Schema({
  idDestinatario: { type: String, default: "" },
  monto: { type: String, default: "" },
  updated: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Transferencia", transferenciaShema);
