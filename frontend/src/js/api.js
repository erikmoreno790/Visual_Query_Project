const API_URL_BASE = 'https://localhost:4000/api/standard-queries';

// Ventas totales por producto
export async function fetchTotalSalesByProduct() {
    const response = await fetch(`${API_URL_BASE}/total-sales-by-product`);
    return response.json();
}

// Ventas totales por sede
export async function fetchTotalSalesByLocation() {
    const response = await fetch(`${API_URL_BASE}/total-sales-by-location`);
    return response.json();
}

// Ventas totales por fecha
export async function fetchTotalSalesByDate() {
    const response = await fetch(`${API_URL_BASE}/total-sales-by-date`);
    return response.json();
}
// Ventas mensuales por producto
export async function fetchMonthlySalesByProduct(month, year) {
    const response = await fetch(`${API_URL_BASE}/monthly-sales-by-product/${month}/${year}`);
    return response.json();
}
// Ventas por combinación de Tipo, Tamaño y Base
export async function fetchSalesByTypeSizeBase() {
    const response = await fetch(`${API_URL_BASE}/sales-by-type-size-base`);
    return response.json();
}
// Ventas por sede y producto
export async function fetchSalesByLocationAndProduct() {
    const response = await fetch(`${API_URL_BASE}/sales-by-location-and-product`);
    return response.json();
}
// Promedio de unidades ordenadas por producto y mes
export async function fetchAverageUnitsByProductAndMonth() {
    const response = await fetch(`${API_URL_BASE}/average-units-by-product-and-month`);
    return response.json();
}

module.exports = {
    fetchTotalSalesByProduct,
    fetchTotalSalesByLocation,
    fetchTotalSalesByDate,
    fetchMonthlySalesByProduct,
    fetchSalesByTypeSizeBase,
    fetchSalesByLocationAndProduct,
    fetchAverageUnitsByProductAndMonth
};