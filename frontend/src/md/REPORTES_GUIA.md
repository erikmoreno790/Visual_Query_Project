# 📊 Página de Reportes - Guía Completa

## 🎯 Objetivo

La página de Reportes permite profundizar en los datos históricos y realizar análisis comparativos avanzados de las ventas.

## 📁 Archivos Creados

1. **`reportes.html`** - Estructura HTML de la página
2. **`reportes.js`** - Lógica y funcionalidad JavaScript
3. **`reportes-charts.js`** - Configuración de gráficos Chart.js
4. **`reportes-styles.css`** - Estilos específicos para reportes

## 🔹 Funcionalidades Principales

### 1. Filtros Personalizados

#### Filtros Disponibles:

- **📅 Fecha Inicio/Fin**: Selecciona un rango de fechas específico
- **🏢 Sede**: Filtra por ubicación específica
- **📦 Producto**: Filtra por producto específico
- **🏷️ Tipo**: Filtra por tipo de producto (Postres, Panadería, etc.)

#### Cómo usar:

1. Selecciona los filtros deseados
2. Haz clic en el botón "Aplicar"
3. Los datos se actualizarán automáticamente
4. Usa "Limpiar" para resetear todos los filtros

### 2. Análisis Comparativo

#### Comparaciones Disponibles:

**📊 Mes Actual vs Mes Anterior**

- Muestra unidades vendidas del mes en curso
- Compara con el mes anterior
- Calcula porcentaje de cambio
- Indicador visual (verde = positivo, rojo = negativo)

**📈 Año Actual vs Año Anterior**

- Total de unidades del año en curso
- Compara con el año anterior completo
- Porcentaje de crecimiento anual
- Ayuda a identificar tendencias anuales

### 3. Gráficos Avanzados

#### Gráfico 1: Rentabilidad por Línea de Producto

- **Tipo**: Barras horizontales
- **Datos**: Top 8 tipos de productos por unidades vendidas
- **Uso**: Identificar qué líneas son más rentables
- **Decisión**: Priorizar producción de líneas más exitosas

#### Gráfico 2: Tendencia de Ventas Mensual

- **Tipo**: Línea con área
- **Datos**: Evolución de ventas mes a mes
- **Uso**: Identificar patrones estacionales
- **Decisión**: Planificar inventario según demanda

#### Gráfico 3: Comparativo Mensual

- **Tipo**: Barras agrupadas
- **Datos**: Top 10 productos comparando mes actual vs anterior
- **Uso**: Ver qué productos están creciendo o decreciendo
- **Decisión**: Ajustar estrategias de marketing

#### Gráfico 4: Distribución por Tamaño

- **Tipo**: Dona
- **Datos**: Porcentaje de ventas por tamaño (Personal, Individual, etc.)
- **Uso**: Entender preferencias de clientes
- **Decisión**: Optimizar producción por tamaño

### 4. Tablas Detalladas

#### Tabla 1: Detalle de Ventas por Producto

**Columnas:**

- Producto
- Tipo
- Tamaño
- Total Unidades
- Promedio/Mes
- Tendencia (↑ Subiendo, → Estable, ↓ Bajando)

**Uso**: Análisis detallado de rendimiento individual

#### Tabla 2: Rendimiento por Sede

**Columnas:**

- Sede
- Total Unidades
- Productos Únicos
- Promedio/Producto
- Rendimiento (Excelente, Bueno, Promedio, Bajo)

**Uso**: Comparar eficiencia entre ubicaciones

### 5. Exportación de Reportes

#### 📄 Exportar a PDF

- Genera un documento PDF con:
  - Título y fecha de generación
  - Análisis comparativo resumido
  - Métricas clave
- **Uso**: Compartir reportes con stakeholders
- **Botón**: "Exportar PDF" (rojo)

#### 📊 Exportar a Excel

- Genera un archivo Excel (.xlsx) con múltiples hojas:
  - **Hoja 1**: Detalle por Producto (tipo, tamaño, base, unidades)
  - **Hoja 2**: Por Sede (sede, total unidades)
- **Uso**: Análisis avanzado en Excel, pivotes, etc.
- **Botón**: "Exportar Excel" (verde)

## 🧠 Decisiones que Permite Tomar

### 1. Evaluación de Rentabilidad

- ✅ Identificar líneas de producto más rentables
- ✅ Detectar productos de bajo rendimiento
- ✅ Decidir qué descontinuar o promover

### 2. Planificación de Compras y Producción

- ✅ Ver tendencias de demanda por mes
- ✅ Identificar productos con mayor rotación
- ✅ Optimizar inventario según patrones históricos

### 3. Identificación de Tendencias Estacionales

- ✅ Detectar meses de alta/baja demanda
- ✅ Preparar campañas para temporadas específicas
- ✅ Ajustar personal según períodos

### 4. Optimización por Sede

- ✅ Comparar rendimiento entre ubicaciones
- ✅ Replicar estrategias de sedes exitosas
- ✅ Dar soporte a sedes con bajo rendimiento

### 5. Gestión de Portafolio

- ✅ Ver distribución de ventas por tipo/tamaño
- ✅ Ajustar oferta según preferencias
- ✅ Introducir nuevos productos basado en datos

## 💡 Mejores Prácticas

### Análisis Semanal

1. Revisa el comparativo mes actual vs anterior
2. Identifica productos con tendencia negativa
3. Toma acciones correctivas rápidamente

### Análisis Mensual

1. Genera reporte Excel completo
2. Analiza rendimiento por sede
3. Comparte insights con equipo

### Análisis Trimestral

1. Revisa tendencias de últimos 90 días
2. Identifica patrones estacionales
3. Planifica inventario para próximo trimestre

### Análisis Anual

1. Compara año actual vs anterior
2. Evalúa crecimiento general
3. Establece objetivos para siguiente año

## 🔧 Personalización

### Agregar Nuevos Filtros

En `reportes.html`, agrega un nuevo filtro en `.filters-container`:

```html
<div class="filter-group">
  <label class="filter-label">Nuevo Filtro</label>
  <select id="nuevoFiltro" class="filter-input">
    <option value="all">Todos</option>
  </select>
</div>
```

En `reportes.js`, actualiza la función `applyDataFilters()`.

### Agregar Nuevos Gráficos

1. Agrega canvas en `reportes.html`
2. Inicializa gráfico en `reportes-charts.js`
3. Actualiza con datos en `reportes.js`

### Personalizar Exportaciones

Modifica las funciones `exportToPDF()` y `exportToExcel()` en `reportes.js` para incluir más datos.

## 🚀 Navegación

### Desde Panel Principal

Haz clic en "Reportes" en el sidebar o ve directamente a:

```
reportes.html
```

### Volver al Dashboard

Haz clic en "Panel Principal" en el sidebar o usa:

```
index.html
```

## 📱 Responsive

La página es completamente responsive:

- **Desktop**: Vista completa con todos los gráficos
- **Tablet**: Gráficos apilados, tablas con scroll horizontal
- **Móvil**: Filtros apilados, sidebar colapsable

## 🐛 Troubleshooting

### Los datos no cargan

1. Verifica que el servidor backend esté corriendo
2. Revisa la consola del navegador (F12)
3. Confirma que las URLs en `api.js` sean correctas

### Los filtros no funcionan

1. Asegúrate de hacer clic en "Aplicar"
2. Verifica que haya datos para los filtros seleccionados
3. Usa "Limpiar" y vuelve a intentar

### Las exportaciones fallan

1. Verifica que las librerías jsPDF y xlsx estén cargadas
2. Revisa la consola para ver errores
3. Asegúrate de que haya datos para exportar

## 📊 Métricas de Rendimiento

Los badges de rendimiento se calculan así:

- **Excelente**: > 500 unidades
- **Bueno**: 300-500 unidades
- **Promedio**: 100-300 unidades
- **Bajo**: < 100 unidades

Puedes ajustar estos umbrales en `reportes.js`, función `updateLocationTable()`.

## 🎨 Personalización Visual

Los colores principales están definidos en `styles.css`:

```css
--primary: #3b82f6;
--success: #10b981;
--warning: #f59e0b;
--danger: #ef4444;
```

Modifícalos según tu marca.

## 📞 Soporte

Para problemas o sugerencias:

1. Revisa esta documentación
2. Consulta `INSTRUCCIONES_API.md`
3. Revisa los comentarios en el código

---

¡Disfruta analizando tus datos! 📈✨
