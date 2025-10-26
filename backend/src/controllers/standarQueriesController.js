const standard_queries = require("../queries/standard_queries");

// Ventas totales por producto
async function getTotalSalesByProduct(req, res) {
    try {
        const data = await standard_queries.getTotalSalesByProduct();
        res.json(data);
    } catch (error) {
        console.error('Error fetching total sales by product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Ventas totales por sede
async function getTotalSalesByLocation(req, res) {
    try {
        const data = await standard_queries.getTotalSalesByLocation();
        res.json(data);
    } catch (error) {
        console.error('Error fetching total sales by location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Ventas totales por fecha
async function getTotalSalesByDate(req, res) {
    try {
        const data = await standard_queries.getTotalSalesByDate();
        res.json(data);
    } catch (error) {
        console.error('Error fetching total sales by date:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Ventas mensuales por producto
async function getMonthlySalesByProduct(req, res) {
    const { month, year } = req.params;
    try {
        const data = await standard_queries.getMonthlySalesByProduct(month, year);
        res.json(data);
    } catch (error) {
        console.error('Error fetching monthly sales by product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Ventas por combinación de Tipo, Tamaño y Base
async function getSalesByTypeSizeBase(req, res) {
    try {
        const data = await standard_queries.getSalesByTypeSizeBase();
        res.json(data);
    } catch (error) {
        console.error('Error fetching sales by type, size, and base:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Ventas por sede y producto
async function getSalesByLocationAndProduct(req, res) {
    try {
        const data = await standard_queries.getSalesByLocationAndProduct();
        res.json(data);
    } catch (error) {
        console.error('Error fetching sales by location and product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Promedio de unidades ordenadas por producto y mes
async function getAverageUnitsByProductAndMonth(req, res) {
    try {
        const data = await standard_queries.getAverageSalesByProductAndMonth();
        res.json(data);
    } catch (error) {
        console.error('Error fetching average units by product and month:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//Productos con menos ventas
async function getProductsWithLowestSales(req, res) {
    const { threshold } = req.params;
    try {
        const data = await standard_queries.getLowSellingProducts(threshold);
        res.json(data);
    } catch (error) {
        console.error('Error fetching products with lowest sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Días con mayor volumen de pedidos
async function getDaysWithHighestOrderVolume(req, res) {
    try {
        const data = await standard_queries.getDaysWithHighestOrderVolume();
        res.json(data);
    } catch (error) {
        console.error('Error fetching days with highest order volume:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Ventas por tamaño
async function getSalesBySize(req, res) {
    try {
        const data = await standard_queries.getSalesBySize();
        res.json(data);
    } catch (error) {
        console.error('Error fetching sales by size:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getTotalSalesByProduct,
    getTotalSalesByLocation,
    getTotalSalesByDate,
    getMonthlySalesByProduct,
    getSalesByTypeSizeBase,
    getSalesByLocationAndProduct,
    getAverageUnitsByProductAndMonth,
    getProductsWithLowestSales,
    getDaysWithHighestOrderVolume,
    getSalesBySize
};




