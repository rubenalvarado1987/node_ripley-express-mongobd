const HttpStatus = require("http-status-codes");
const Destinatario = require("../models/destinatarioModels");
const Transferencia = require("../models/transferenciaModels");

module.exports = {
  CreateDestinatario(req, res) {
    console.log("body!!!", req.body);
    console.log("req!!!", req);

    const reqBody = {
      banc: req.body.banc,
      email: req.body.email,
      name: req.body.name,
      numberAcount: req.body.numberAcount,
      phone: req.body.phone,
      rut: req.body.rut,
      typeAcount: req.body.typeAcount,
    };

    console.log("reBOdy!!!", reqBody);
    Destinatario.create(reqBody)
      .then((post) => {
        res
          .status(HttpStatus.OK)
          .json({ message: "Destinatario created", post });
      })
      .catch((err) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: "Error occured",
        });
      });
  },
  async GetAllDestinatarios(req, res) {
    try {
      const destinatarios = await Destinatario.find()
        .populate("destinatario")
        .sort({ created: -1 });

      return res.status(HttpStatus.OK).json({
        message: "All Destinatarios",
        destinatarios,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error occured",
      });
    }
  },
  CreateTransferencia(req, res) {
    console.log("body!!!", req.body);
    console.log("req!!!", req);

    const reqBody = {
      idDestinatario: req.body.destinatario,
      monto: req.body.monto,
    };

    console.log("reBOdy!!!", reqBody);
    Transferencia.create(reqBody)
      .then((post) => {
        res
          .status(HttpStatus.OK)
          .json({ message: "Transferencia created", post });
      })
      .catch((err) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: "Error occured",
        });
      });
  },
  async GetAllTransferencias(req, res) {
    bindCard = [];

    try {
      const transferencias = await Transferencia.find()
        .populate("transferencias")
        .sort({ created: -1 });

      transferencias.forEach(async (transf) => {
        const user = await Destinatario.findOne({
          name: transf.idDestinatario,
        });

        console.log("CICLO:", transf.idDestinatario);
        console.log("Invited:", user.rut);

        const e = await bindCard.push({
          name: transf.idDestinatario,
          rut: user.rut,
          banco: user.banc,
          tipoCuenta: user.typeAcount,
          monto: transf.monto
        });
      });
      //Se debe mejorar el tiempo de respuesta
      setTimeout((e) => {
        return res.status(HttpStatus.OK).json({
          message: "All Transferencias",
          bindCard,
        });
      }, 2500);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error occured",
      });
    }
  },
};
