const express = require('express');
const router = express.Router();

// @route GET api/actions/test
// @desc Tests personas routes
// @access Public
router.get('/test', (req, res) => res.json({msg: "Actions Works"}));

module.exports = router;
