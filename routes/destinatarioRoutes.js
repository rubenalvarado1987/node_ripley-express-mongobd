const express = require("express");
const router = express.Router();

const DestinatarioCtrl = require("../controllers/destinatarioControllers");

router.post("/destinatario/add-new", DestinatarioCtrl.CreateDestinatario);
router.get("/all-destinatarios", DestinatarioCtrl.GetAllDestinatarios);
router.post("/destinatario/transferir", DestinatarioCtrl.CreateTransferencia);
router.get("/destinatario/transferencias", DestinatarioCtrl.GetAllTransferencias);

module.exports = router;
