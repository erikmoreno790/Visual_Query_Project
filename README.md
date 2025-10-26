# 📊 Dashboard BI - Sistema Completo de Reportes

Sistema de análisis y visualización de datos de ventas construido con HTML, CSS, JavaScript vanilla y Chart.js.

## 🎯 Descripción General

Dashboard completo de Business Intelligence con dos páginas principales:

1. **Panel Principal** - Vista general con KPIs y métricas en tiempo real
2. **Reportes** - Análisis profundo con comparativas y exportaciones

## 📁 Estructura del Proyecto

```
├── index.html                  # Página principal del dashboard
├── index_updated.html          # Versión actualizada (usar esta)
├── reportes.html              # Página de reportes y análisis
├── styles.css                 # Estilos generales compartidos
├── reportes-styles.css        # Estilos específicos de reportes
├── main.js                    # Lógica del panel principal
├── reportes.js                # Lógica de la página de reportes
├── charts.js                  # Configuración de gráficos del dashboard
├── reportes-charts.js         # Configuración de gráficos de reportes
├── api.js                     # Funciones para conectar con backend
├── INSTRUCCIONES_API.md       # Guía de integración con API
├── REPORTES_GUIA.md          # Guía completa de reportes
└── README.md                  # Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos

1. **Servidor Backend** corriendo en `http://localhost:4000`
2. Navegador web moderno (Chrome, Firefox, Safari, Edge)
3. (Opcional) Servidor HTTP local para desarrollo

### Instalación

```bash
# Clona o descarga el proyecto
cd dashboard-bi

# Opción 1: Abre directamente index_updated.html en tu navegador

# Opción 2: Usa un servidor local
npx http-server -p 8080

# Navega a http://localhost:8080/index_updated.html
```

### Configuración de la API

Edita `api.js` si tu backend está en diferente URL:

```javascript
const API_URL_BASE = "http://tu-servidor:puerto/api/standard-queries";
```

## 📊 Páginas del Sistema

### 1. Panel Principal (`index_updated.html`)

**Características:**

- ✅ 4 tarjetas KPI con métricas principales
- ✅ Gráfico de tendencia de ventas por fecha
- ✅ Gráfico de distribución por sede
- ✅ Top 10 productos más vendidos
- ✅ Tabla detallada de ventas
- ✅ Filtros dinámicos (sede, producto, período)
- ✅ Actualización en tiempo real

**KPIs Mostrados:**

- Total Unidades Vendidas
- Total Productos Diferentes
- Total Sedes Activas
- Unidades del Producto Top

**[Ver Documentación Completa →](INSTRUCCIONES_API.md)**

### 2. Reportes (`reportes.html`)

**Características:**

- ✅ Filtros avanzados con rango de fechas
- ✅ Comparativas mes actual vs anterior
- ✅ Comparativas año actual vs anterior
- ✅ 4 gráficos especializados
- ✅ 2 tablas detalladas con métricas
- ✅ Exportación a PDF
- ✅ Exportación a Excel

**Análisis Disponibles:**

- Rentabilidad por línea de producto
- Tendencias mensuales
- Comparativos por producto
- Distribución por tamaño
- Rendimiento por sede

**[Ver Guía de Reportes →](REPORTES_GUIA.md)**

## 🔌 Integración con API

### Endpoints Utilizados

```javascript
// Ventas por producto
GET /api/standard-queries/total-sales-by-product

// Ventas por sede
GET /api/standard-queries/total-sales-by-location

// Ventas por fecha
GET /api/standard-queries/total-sales-by-date

// Ventas mensuales
GET /api/standard-queries/monthly-sales-by-product/:month/:year

// Ventas por tipo/tamaño/base
GET /api/standard-queries/sales-by-type-size-base

// Ventas por sede y producto
GET /api/standard-queries/sales-by-location-and-product
```

### Formato de Datos Esperado

**Ejemplo - Ventas por Producto:**

```json
[
  {
    "producto": "Arequipe sin azúcar",
    "totalunidades": "82"
  }
]
```

**[Ver Documentación API Completa →](INSTRUCCIONES_API.md)**

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
  --primary: #3b82f6; /* Color principal */
  --success: #10b981; /* Color de éxito */
  --warning: #f59e0b; /* Color de advertencia */
  --danger: #ef4444; /* Color de peligro */
  --sidebar-width: 256px; /* Ancho del sidebar */
}
```

### Agregar Nuevos Gráficos

1. Agrega el canvas en el HTML:

```html
<canvas id="miNuevoGrafico"></canvas>
```

2. Inicializa en `charts.js` o `reportes-charts.js`:

```javascript
const miGrafico = new Chart(ctx, {...});
```

3. Actualiza con datos en `main.js` o `reportes.js`

### Modificar Filtros

Los filtros se cargan dinámicamente desde la API. Para agregar filtros personalizados, edita la función `populateFilters()` en el archivo JavaScript correspondiente.

## 📱 Responsive Design

El dashboard es completamente responsive:

- **Desktop (>1024px)**: Vista completa, sidebar fijo
- **Tablet (768px-1024px)**: Gráficos apilados
- **Móvil (<768px)**: Sidebar colapsable, filtros apilados

## 🔧 Funcionalidades Avanzadas

### Exportación a PDF

Usa la librería jsPDF para generar reportes:

```javascript
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  // Agregar contenido...
  doc.save("reporte.pdf");
}
```

### Exportación a Excel

Usa la librería xlsx para exportar datos:

```javascript
function exportToExcel() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Datos");
  XLSX.writeFile(wb, "reporte.xlsx");
}
```

## 📊 Librerías Utilizadas

- **Chart.js v4.4.0** - Visualización de gráficos
- **jsPDF v2.5.1** - Generación de PDF
- **xlsx v0.18.5** - Exportación a Excel

Todas se cargan desde CDN, no requieren instalación.

## 🐛 Resolución de Problemas

### Error: Cannot read property 'getContext' of null

**Causa**: El canvas no existe en el DOM
**Solución**: Verifica que el ID del canvas coincida

### Error: CORS policy

**Causa**: El backend no permite peticiones desde tu origen
**Solución**: Configura CORS en tu backend:

```javascript
app.use(cors({ origin: "*" }));
```

### Los datos no se cargan

**Solución**:

1. Verifica que el servidor backend esté corriendo
2. Abre la consola del navegador (F12)
3. Revisa la pestaña Network
4. Confirma que las URLs sean correctas

### Los filtros no funcionan

**Solución**:

1. Verifica que hayas hecho clic en "Aplicar"
2. Asegúrate de que haya datos disponibles
3. Usa "Limpiar" y vuelve a intentar

## 🔒 Seguridad

**Importante**: Este es un dashboard frontend. NO almacenes datos sensibles aquí.

- Los datos se cargan desde una API backend
- No se guardan credenciales en el código
- Usa HTTPS en producción
- Implementa autenticación en el backend

## 📈 Roadmap Futuro

- [ ] Autenticación de usuarios
- [ ] Roles y permisos
- [ ] Modo oscuro
- [ ] Más tipos de gráficos
- [ ] Alertas y notificaciones
- [ ] Dashboard personalizable (drag & drop)
- [ ] Integración con más APIs
- [ ] Cache y modo offline
- [ ] Exportación programada

## 🤝 Contribución

Para contribuir al proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 📞 Soporte

¿Necesitas ayuda?

1. 📖 Lee la [Documentación de API](INSTRUCCIONES_API.md)
2. 📊 Consulta la [Guía de Reportes](REPORTES_GUIA.md)
3. 🔍 Revisa los comentarios en el código
4. 🐛 Reporta bugs en el sistema de issues

---

**Desarrollado con ❤️ para análisis de datos efectivo**

¡Disfruta analizando tus ventas! 📊✨
