const express = require('express');
const { getConsultaPersonalizada } = require('../controllers/dynamicQueriesController');

const router = express.Router();

router.get("/consulta-personalizada", getConsultaPersonalizada);

module.exports = router;
