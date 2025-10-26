const API_URL_BASE = 'http://localhost:4000/api';

// Ventas totales por producto
export async function fetchTotalSalesByProduct() {
    const response = await fetch(`${API_URL_BASE}/standard-queries/total-sales-by-product`);
    return response.json();
    {/* [
  {
    "producto": "Arequipe sin ",
    "totalunidades": "82"
  },
  {
    "producto": "Dulce manjar ",
    "totalunidades": "72"
  }
] */ }
}

// Ventas totales por sede
export async function fetchTotalSalesByLocation() {
    const response = await fetch(`${API_URL_BASE}/standard-queries/total-sales-by-location`);
    return response.json();
    {/*[
  {
    "sede": "ESPER",
    "totalunidades": "517"
  },
  {
    "sede": "FUNDA",
    "totalunidades": "454"
  },
] */}
}

// Ventas totales por fecha
export async function fetchTotalSalesByDate() {
    const response = await fetch(`${API_URL_BASE}/standard-queries/total-sales-by-date`);
    return response.json();
    {/*
        [
  {
    "fecha": "2025-10-19T05:00:00.000Z",
    "totalunidades": "2099"
  }
] */}
}
// Ventas mensuales por producto
export async function fetchMonthlySalesByProduct(month, year) {
    const response = await fetch(`${API_URL_BASE}/standard-queries/monthly-sales-by-product/${month}/${year}`);
    return response.json();
    {/*
        [
  {
    "producto": "Arequipe sin ",
    "totalunidades": "82"
  },
  {
    "producto": "Dulce manjar ",
    "totalunidades": "72"
  }
] */}
}
// Ventas por combinación de Tipo, Tamaño y Base
export async function fetchSalesByTypeSizeBase() {
    const response = await fetch(`${API_URL_BASE}/standard-queries/sales-by-type-size-base`);
    return response.json();
    {/*
        [
  {
    "tipo": "Postres",
    "tamano": "Personal",
    "base": "N/A",
    "totalunidades": "459"
  },
  {
    "tipo": "Panaderia",
    "tamano": "Individual",
    "base": "N/A",
    "totalunidades": "335"
  }
] */}
}
// Ventas por sede y producto
export async function fetchSalesByLocationAndProduct() {
    const response = await fetch(`${API_URL_BASE}/standard-queries/sales-by-location-and-product`);
    return response.json();
    {/*
        [
  {
    "sede": "COFFE",
    "producto": "Enyucado ",
    "totalunidades": "16"
  },
  {
    "sede": "COFFE",
    "producto": "FANTASIA NEGLE PERSONAL",
    "totalunidades": "10"
  },
  {
    "sede": "COFFE",
    "producto": "NAPOLEON PERSONAL",
    "totalunidades": "10"
  }
] */}
}
// Promedio de unidades ordenadas por producto y mes
export async function fetchAverageUnitsByProductAndMonth() {
    const response = await fetch(`${API_URL_BASE}/standard-queries/average-units-by-product-and-month`);
    return response.json();
}

/*export async function fetchConsultaPersonalizada(params) {
    let url = `${API_URL_BASE}/api/consulta-personalizada?`;
    if (params.fechaInicio) url += `fechaInicio=${params.fechaInicio}&`;
    if (params.fechaFin) url += `fechaFin=${params.fechaFin}&`;
    if (params.sede) url += `sede=${params.sede}&`;
    if (params.producto) url += `producto=${params.producto}`;
    const response = await fetch(url);
    return response.json();
}*/

export async function fetchConsultaPersonalizada(params) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL_BASE}/dynamic-queries/consulta-personalizada?${queryParams}`);
    return response.json();
}
