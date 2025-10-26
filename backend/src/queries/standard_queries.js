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

// Ventas totales por producto
async function getTotalSalesByProduct() {
    const query = `
        SELECT Producto, SUM(UnidadesOrdenadas) AS TotalUnidades
        FROM historico_requisiciones
        GROUP BY Producto
        ORDER BY TotalUnidades DESC
    `;
    const result = await db.query(query);
    return result.rows;
}

// Ventas totales por sede
async function getTotalSalesByLocation() {
    const query = `
        SELECT Sede, SUM(UnidadesOrdenadas) AS TotalUnidades
        FROM historico_requisiciones
        GROUP BY Sede
        ORDER BY TotalUnidades DESC
    `;
    const result = await db.query(query);
    return result.rows;
}

// Ventas totales por fecha
async function getTotalSalesByDate() {
    const query = `
        SELECT Fecha, SUM(UnidadesOrdenadas) AS TotalUnidades
        FROM historico_requisiciones
        GROUP BY Fecha
        ORDER BY Fecha DESC
    `;
    const result = await db.query(query);
    return result.rows;
}

// Ventas mensuales por producto
async function getMonthlySalesByProduct(month, year) {
    const query = `
        SELECT Producto, SUM(UnidadesOrdenadas) AS TotalUnidades
        FROM historico_requisiciones
        WHERE EXTRACT(MONTH FROM Fecha) = $1 AND EXTRACT(YEAR FROM Fecha) = $2
        GROUP BY Producto
        ORDER BY TotalUnidades DESC
    `;
    const result = await db.query(query, [month, year]);
    return result.rows;
}

// Ventas por combinación de Tipo, Tamaño y Base
async function getSalesByTypeSizeBase() {
    const query = `
        SELECT Tipo, Tamano, Base, SUM(UnidadesOrdenadas) AS TotalUnidades
        FROM historico_requisiciones
        GROUP BY Tipo, Tamano, Base
        ORDER BY TotalUnidades DESC
    `;
    const result = await db.query(query);
    return result.rows;
}

// Ventas por sede y producto
async function getSalesByLocationAndProduct() {
    const query = `
    SELECT Sede, Producto, SUM(UnidadesOrdenadas) as TotalUnidades
    FROM historico_requisiciones
    GROUP BY Sede, Producto
    ORDER BY Sede, TotalUnidades DESC `;
    const result = await db.query(query);
    return result.rows;
}

// Promedio de unidades ordenadas por producto y mes
async function getAverageSalesByProductAndMonth() {
    const query = `
    SELECT Producto, EXTRACT(MONTH FROM Fecha) AS Mes, AVG(UnidadesOrdenadas) AS PromedioUnidades
    FROM historico_requisiciones
    GROUP BY Producto, Mes
    ORDER BY Producto, Mes`;
    const result = await db.query(query);
    return result.rows;
}

// Productos con menos ventas
async function getLowSellingProducts(threshold) {
    const query = `
    SELECT Producto, SUM(UnidadesOrdenadas) AS TotalUnidades
    FROM historico_requisiciones
    GROUP BY Producto
    HAVING SUM(UnidadesOrdenadas) < $1
    ORDER BY TotalUnidades ASC`;
    const result = await db.query(query, [threshold]);
    return result.rows;
}

// Días con mayor volumen de pedidos
async function getDaysWithHighestOrderVolume() {
    const query = `
    SELECT Fecha, SUM(UnidadesOrdenadas) AS TotalUnidades
    FROM historico_requisiciones
    GROUP BY Fecha
    ORDER BY TotalUnidades DESC
    LIMIT 10`;
    const result = await db.query(query);
    return result.rows;
}

// Ventas por tamaño
async function getSalesBySize() {
    const query = `
    SELECT Tamano, SUM(UnidadesOrdenadas) AS TotalUnidades
    FROM historico_requisiciones
    GROUP BY Tamano
    ORDER BY TotalUnidades DESC`;
    const result = await db.query(query);
    return result.rows;
}

module.exports = {
    getTotalSalesByProduct,
    getTotalSalesByLocation,
    getTotalSalesByDate,
    getMonthlySalesByProduct,
    getSalesByTypeSizeBase,
    getSalesByLocationAndProduct,
    getAverageSalesByProductAndMonth,
    getLowSellingProducts,
    getDaysWithHighestOrderVolume,
    getSalesBySize
};

