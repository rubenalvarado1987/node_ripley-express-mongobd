const mongoose = require("mongoose");

const destinatarioShema = mongoose.Schema({
  rut: { type: String, default: "" },
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  banc: { type: String, default: "" },
  typeAcount: { type: String, default: "" },
  numberAcount: { type: String, default: "" },
  updated: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Destinatario", destinatarioShema);
