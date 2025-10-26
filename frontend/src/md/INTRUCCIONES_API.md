# Dashboard BI - Integración con API

## Archivos Modificados

### 1. `api.js` (NUEVO)

Contiene todas las funciones para conectarse a tu API backend:

- `fetchTotalSalesByProduct()` - Ventas totales por producto
- `fetchTotalSalesByLocation()` - Ventas totales por sede
- `fetchTotalSalesByDate()` - Ventas totales por fecha
- `fetchMonthlySalesByProduct(month, year)` - Ventas mensuales por producto
- `fetchSalesByTypeSizeBase()` - Ventas por tipo/tamaño/base
- `fetchSalesByLocationAndProduct()` - Ventas por sede y producto
- `fetchConsultaPersonalizada(params)` - Consulta personalizada

### 2. `charts.js` (MODIFICADO)

Ahora los gráficos se inicializan vacíos y se actualizan con datos reales:

- `updateSalesChart(data)` - Actualiza gráfico de ventas por fecha
- `updateRevenueChart(data)` - Actualiza gráfico top 10 productos
- `updateCategoryChart(data)` - Actualiza gráfico de distribución por sede

### 3. `main.js` (MODIFICADO)

Gestiona la carga de datos y filtros dinámicos:

- Carga datos de la API al iniciar
- Actualiza KPIs automáticamente
- Filtros dinámicos por sede, producto y período
- Actualización de tabla con datos reales

### 4. `index_updated.html` (NUEVO)

HTML actualizado con:

- Filtro de sedes dinámico
- Filtro de productos dinámico
- KPIs ajustados a tus datos
- Títulos de gráficos actualizados

## Cómo Usar

### Paso 1: Asegúrate de que tu API esté corriendo

```bash
# Tu servidor debe estar corriendo en http://localhost:4000
# Y responder en: http://localhost:4000/api/standard-queries
```

### Paso 2: Reemplaza tu index.html actual

```bash
# Renombra el archivo index_updated.html a index.html
mv index_updated.html index.html
```

### Paso 3: Abre el dashboard

```bash
# Simplemente abre index.html en tu navegador
# O usa un servidor local como:
npx http-server -p 8080
```

## Funcionalidades

### 📊 KPIs Dinámicos

- **Total Unidades**: Suma de todas las unidades vendidas
- **Total Productos**: Cantidad de productos diferentes
- **Total Sedes**: Cantidad de sedes diferentes
- **Producto Top**: Unidades del producto más vendido

### 📈 Gráficos Interactivos

1. **Tendencia de Ventas por Fecha**: Gráfico de líneas mostrando evolución temporal
2. **Distribución por Sede**: Gráfico de dona mostrando porcentaje por ubicación
3. **Top 10 Productos**: Gráfico de barras horizontal con los más vendidos

### 🔍 Filtros Dinámicos

- **Por Sede**: Filtra todos los datos por sede específica
- **Por Producto**: Filtra todos los datos por producto específico
- **Por Período**: Opción para implementar filtro temporal

### 📋 Tabla Detallada

Muestra las top 20 combinaciones de producto y sede ordenadas por unidades vendidas.

## Estructura de Datos Esperada

### Ventas por Producto

```javascript
[
  {
    producto: "Arequipe sin ",
    totalunidades: "82",
  },
];
```

### Ventas por Sede

```javascript
[
  {
    sede: "ESPER",
    totalunidades: "517",
  },
];
```

### Ventas por Fecha

```javascript
[
  {
    fecha: "2025-10-19T05:00:00.000Z",
    totalunidades: "2099",
  },
];
```

### Ventas por Sede y Producto

```javascript
[
  {
    sede: "COFFE",
    producto: "Enyucado ",
    totalunidades: "16",
  },
];
```

## Manejo de Errores

Si la API no está disponible:

1. El dashboard mostrará valores en 0
2. Se mostrará un mensaje de error en consola
3. Los filtros se mantendrán pero sin opciones

## Próximas Mejoras Sugeridas

1. **Filtro por Fecha**: Implementar filtro de rango de fechas real
2. **Exportación**: Agregar funcionalidad para exportar datos
3. **Cache**: Implementar cache local para mejorar rendimiento
4. **Gráficos adicionales**: Agregar más visualizaciones según necesidad
5. **Modo Offline**: Guardar últimos datos para trabajar sin conexión

## Troubleshooting

### Error CORS

Si ves errores de CORS en la consola, asegúrate de que tu backend permite peticiones desde el origen del frontend:

```javascript
// En tu backend Express
app.use(
  cors({
    origin: "*", // O especifica el origen exacto
  })
);
```

### Datos no se actualizan

1. Verifica que el servidor backend esté corriendo
2. Abre la consola del navegador (F12) y revisa errores
3. Verifica que las URLs de la API sean correctas en `api.js`

### Gráficos vacíos

1. Verifica que la API esté devolviendo datos con la estructura correcta
2. Revisa la consola para ver qué datos están llegando
3. Asegúrate de que los campos se llamen exactamente como se esperan

## Contacto

Si tienes problemas, revisa:

1. Consola del navegador (F12)
2. Network tab para ver las peticiones HTTP
3. Respuestas de la API

¡El dashboard está listo para usar con tus datos reales! 🚀
