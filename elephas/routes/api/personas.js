const express = require('express');
const router = express.Router();

// @route GET api/personas/test
// @desc Tests personas routes
// @access Public
router.get('/test', (req, res) => res.json({msg: "Personas Works"}));

module.exports = router;
