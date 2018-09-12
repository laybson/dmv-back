const express = require("express");
const router = express.Router();

/** @route   GET api/deputado/test
 * @desc    Testa a rota de Deputado
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({ msg: "I'm living happily, but I'm feeling guilty" })
);

module.exports = router;
