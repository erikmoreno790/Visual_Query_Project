const db = require('../config/db');

// Table: historico_requisiciones
/*Columns:
    Fecha DATE,
    Sede VARCHAR(50),
    Codigo VARCHAR(50),
    Tipo VARCHAR(50),
    Tamano VARCHAR(50),
    Base VARCHAR(50),
    Producto VARCHAR(100),
    UnidadesOrdenadas INT,  
    id SERIAL PRIMARY KEY
*/

// Consultas dinámicas basadas en parámetros
async function getDynamicSalesData(groupBy, filterBy, filterValue) {
    let query = `
    SELECT ${groupBy}, SUM(UnidadesOrdenadas) AS TotalUnidades
    FROM historico_requisiciones
`;
    const values = [];

    if (filterBy && filterValue) {
        query += ` WHERE ${filterBy} = $1`;
        values.push(filterValue);
    }
    query += ` GROUP BY ${groupBy} ORDER BY TotalUnidades DESC`;

    const result = await db.query(query, values);
    return result.rows;
}

// Consultas dinámicas basadas en rangos de fechas
async function getSalesDataByDateRange(groupBy, startDate, endDate) {
    let query = `
        SELECT ${groupBy}, SUM(UnidadesOrdenadas) AS TotalUnidades
        FROM historico_requisiciones
        WHERE Fecha BETWEEN $1 AND $2
        GROUP BY ${groupBy}
        ORDER BY TotalUnidades DESC
    `;
    const values = [startDate, endDate];
    const result = await db.query(query, values);
    return result.rows;
}

module.exports = {
    getDynamicSalesData,
    getSalesDataByDateRange
};