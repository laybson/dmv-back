const express = require("express");
const router = express.Router();

/** GET api/usuario/test
 * @desc    Testa a rota de Usuário
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({ msg: "You're so small" })
);

/** POST api/usuario/signin
 * @desc    Cadastrar usuário
 * @access  Public
 */
router.post("/signin", (req, res) => {});

/** POST api/usuario/login
 * @desc    Login de usuário
 * @access  Public
 */
router.post("/login", (req, res) => {});

/** GET api/usuario/current
 * @desc   Usuário corrente
 * @access  Public
 */
router.get("/current", (req, res) => {});

module.exports = router
