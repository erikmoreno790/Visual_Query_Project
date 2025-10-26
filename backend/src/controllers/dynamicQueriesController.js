const pool = require("../config/db.js");
const { buildConsultaPersonalizadaQuery } = require("../queries/dynamic_queries.js");

const getConsultaPersonalizada = async (req, res) => {
    try {
        const params = req.query;
        const { query, values } = buildConsultaPersonalizadaQuery(params);

        const result = await pool.query(query, values);

        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error en getConsultaPersonalizada:", error);
        res.status(500).json({ message: "Error al obtener la consulta personalizada" });
    }
};

module.exports = {
    getConsultaPersonalizada,
};
