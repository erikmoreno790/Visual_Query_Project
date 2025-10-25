const standardQueriesController = require('../controllers/standarQueriesController');
const express = require('express');
const router = express.Router();

// Ventas totales por producto
router.get('/total-sales-by-product', standardQueriesController.getTotalSalesByProduct);

// Ventas totales por sede
router.get('/total-sales-by-location', standardQueriesController.getTotalSalesByLocation);

// Ventas totales por fecha
router.get('/total-sales-by-date', standardQueriesController.getTotalSalesByDate);

// Ventas mensuales por producto
router.get('/monthly-sales-by-product/:month/:year', standardQueriesController.getMonthlySalesByProduct);

// Ventas por combinación de Tipo, Tamaño y Base
router.get('/sales-by-type-size-base', standardQueriesController.getSalesByTypeSizeBase);

// Ventas por sede y producto
router.get('/sales-by-location-and-product', standardQueriesController.getSalesByLocationAndProduct);

// Promedio de unidades ordenadas por producto y mes
router.get('/average-units-by-product-and-month', standardQueriesController.getAverageUnitsByProductAndMonth);

//Productos con menos ventas
router.get('/products-with-lowest-sales', standardQueriesController.getProductsWithLowestSales);

// Días con mayor volumen de pedidos
router.get('/days-with-highest-order-volume', standardQueriesController.getDaysWithHighestOrderVolume);

// Ventas por tamaño
router.get('/sales-by-size', standardQueriesController.getSalesBySize);

module.exports = router;