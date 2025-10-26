// Importar funciones de API
import { fetchConsultaPersonalizada } from './api.js';

// Variables globales
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');

// Filtros
const fechaInicio = document.getElementById('fechaInicio');
const fechaFin = document.getElementById('fechaFin');
const productoSearch = document.getElementById('productoSearch');
const applyFilters = document.getElementById('applyFilters');
const clearFilters = document.getElementById('clearFilters');
const toggleFilters = document.getElementById('toggleFilters');
const filtersContent = document.getElementById('filtersContent');

// Botones de exportación
const exportPdfBtn = document.getElementById('exportPdfBtn');
const exportExcelBtn = document.getElementById('exportExcelBtn');
const downloadTableBtn = document.getElementById('downloadTableBtn');

// Datos globales
let allData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 50;

// Estado de filtros
let selectedFilters = {
    sedes: new Set(),
    tipos: new Set(),
    tamanos: new Set(),
    bases: new Set()
};

// Toggle sidebar en móvil
function toggleSidebar() {
    sidebar?.classList.toggle('active');
    overlay?.classList.toggle('active');
}

function closeSidebarMenu() {
    sidebar?.classList.remove('active');
    overlay?.classList.remove('active');
}

if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarMenu);
if (overlay) overlay.addEventListener('click', closeSidebarMenu);

// Toggle filtros
if (toggleFilters) {
    toggleFilters.addEventListener('click', () => {
        filtersContent?.classList.toggle('expanded');
        document.getElementById('toggleIcon')?.classList.toggle('rotated');
    });
}

// Cargar datos iniciales
async function loadInitialData() {
    try {
        showLoading(true);

        // Cargar datos de los últimos 30 días por defecto
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        if (fechaFin) fechaFin.value = today.toISOString().split('T')[0];
        if (fechaInicio) fechaInicio.value = thirtyDaysAgo.toISOString().split('T')[0];

        const params = {
            fechaInicio: fechaInicio?.value,
            fechaFin: fechaFin?.value
        };

        allData = await fetchConsultaPersonalizada(params);
        filteredData = [...allData];

        // Inicializar filtros con los valores únicos
        initializeFilterOptions();

        // Expandir filtros por defecto
        filtersContent?.classList.add('expanded');

        // Actualizar visualización
        updateDashboard();

        showLoading(false);
    } catch (error) {
        console.error('Error cargando datos:', error);
        showLoading(false);
        alert('Error al cargar los datos. Verifica que el servidor esté corriendo en http://localhost:4000');
    }
}

// Inicializar opciones de filtros
function initializeFilterOptions() {
    const sedes = [...new Set(allData.map(item => item.sede))].filter(Boolean).sort();
    const tipos = [...new Set(allData.map(item => item.tipo))].filter(Boolean).sort();
    const tamanos = [...new Set(allData.map(item => item.tamano))].filter(Boolean).sort();
    const bases = [...new Set(allData.map(item => item.base))].filter(Boolean).sort();

    populateCheckboxes('sedesCheckboxes', sedes, selectedFilters.sedes);
    populateCheckboxes('tiposCheckboxes', tipos, selectedFilters.tipos);
    populateCheckboxes('tamanosCheckboxes', tamanos, selectedFilters.tamanos);
    populateCheckboxes('basesCheckboxes', bases, selectedFilters.bases);
}

// Poblar checkboxes
function populateCheckboxes(containerId, options, selectedSet) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allCheckbox = container.querySelector('input[value="all"]');
    if (allCheckbox) {
        allCheckbox.checked = true;
        allCheckbox.addEventListener('change', (e) => {
            const checkboxes = container.querySelectorAll('input[type="checkbox"]:not([value="all"])');
            checkboxes.forEach(cb => cb.checked = e.target.checked);
            if (e.target.checked) {
                selectedSet.clear();
            }
        });
    }

    options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = option;
        checkbox.checked = false;

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedSet.add(option);
                if (allCheckbox) allCheckbox.checked = false;
            } else {
                selectedSet.delete(option);
            }

            // Si no hay ninguno seleccionado, marcar "Todos"
            const anyChecked = Array.from(container.querySelectorAll('input[type="checkbox"]:not([value="all"])'))
                .some(cb => cb.checked);
            if (!anyChecked && allCheckbox) {
                allCheckbox.checked = true;
                selectedSet.clear();
            }
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(option));
        container.appendChild(label);
    });
}

// Aplicar filtros
async function applyDataFilters() {
    try {
        showLoading(true);

        const params = {};

        // Filtros de fecha
        if (fechaInicio?.value) params.fechaInicio = fechaInicio.value;
        if (fechaFin?.value) params.fechaFin = fechaFin.value;

        // Filtro de producto (búsqueda de texto)
        if (productoSearch?.value.trim()) params.producto = productoSearch.value.trim();

        // Cargar datos con filtros de API
        allData = await fetchConsultaPersonalizada(params);

        // Aplicar filtros locales (checkboxes)
        filteredData = allData.filter(item => {
            // Filtrar por sedes
            if (selectedFilters.sedes.size > 0 && !selectedFilters.sedes.has(item.sede)) {
                return false;
            }

            // Filtrar por tipos
            if (selectedFilters.tipos.size > 0 && !selectedFilters.tipos.has(item.tipo)) {
                return false;
            }

            // Filtrar por tamaños
            if (selectedFilters.tamanos.size > 0 && !selectedFilters.tamanos.has(item.tamano)) {
                return false;
            }

            // Filtrar por bases
            if (selectedFilters.bases.size > 0 && !selectedFilters.bases.has(item.base)) {
                return false;
            }

            return true;
        });

        currentPage = 1;
        updateDashboard();

        showLoading(false);
    } catch (error) {
        console.error('Error aplicando filtros:', error);
        showLoading(false);
        alert('Error al aplicar filtros. Intenta nuevamente.');
    }
}

// Limpiar filtros
function clearAllFilters() {
    // Limpiar campos de fecha
    if (fechaInicio) fechaInicio.value = '';
    if (fechaFin) fechaFin.value = '';
    if (productoSearch) productoSearch.value = '';

    // Limpiar checkboxes
    selectedFilters.sedes.clear();
    selectedFilters.tipos.clear();
    selectedFilters.tamanos.clear();
    selectedFilters.bases.clear();

    // Marcar todos los "Todos"
    document.querySelectorAll('input[value="all"]').forEach(cb => cb.checked = true);
    document.querySelectorAll('input[type="checkbox"]:not([value="all"])').forEach(cb => cb.checked = false);

    filteredData = [...allData];
    currentPage = 1;
    updateDashboard();
}

// Actualizar dashboard
function updateDashboard() {
    updateKPIs();
    updateCharts();
    updateTable();
}

// Actualizar KPIs
function updateKPIs() {
    const totalUnidades = filteredData.reduce((sum, item) =>
        sum + parseInt(item.unidadesordenadas || 0), 0
    );

    const productosUnicos = new Set(filteredData.map(item => item.producto)).size;
    const sedesUnicas = new Set(filteredData.map(item => item.sede)).size;

    // Calcular promedio diario
    const fechasUnicas = new Set(filteredData.map(item =>
        new Date(item.fecha).toDateString()
    )).size;
    const promedioDiario = fechasUnicas > 0 ? Math.round(totalUnidades / fechasUnicas) : 0;

    // Animar valores
    animateValue('totalUnidades', 0, totalUnidades, 800, val => val.toLocaleString());
    animateValue('totalProductos', 0, productosUnicos, 800, val => val.toLocaleString());
    animateValue('totalSedes', 0, sedesUnicas, 800, val => val.toLocaleString());
    animateValue('promedioDiario', 0, promedioDiario, 800, val => val.toLocaleString());
}

// Animar valores numéricos
function animateValue(elementId, start, end, duration, formatter) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(start + (end - start) * progress);
        element.textContent = formatter ? formatter(currentValue) : currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Actualizar gráficos
function updateCharts() {
    if (window.reportChartFunctions) {
        // Gráfico de tendencia por fecha
        const dataByDate = aggregateByDate(filteredData);
        window.reportChartFunctions.updateTrendChart(dataByDate);

        // Gráfico por sede
        const dataBySede = aggregateBySede(filteredData);
        window.reportChartFunctions.updateSedeChart(dataBySede);

        // Top 10 productos
        const dataByProduct = aggregateByProduct(filteredData);
        window.reportChartFunctions.updateProductosChart(dataByProduct);

        // Por tipo
        const dataByTipo = aggregateByTipo(filteredData);
        window.reportChartFunctions.updateTiposChart(dataByTipo);
    }
}

// Agregar datos por fecha
function aggregateByDate(data) {
    const grouped = data.reduce((acc, item) => {
        const date = new Date(item.fecha).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += parseInt(item.unidadesordenadas || 0);
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([fecha, total]) => ({ fecha, total }))
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}

// Agregar datos por sede
function aggregateBySede(data) {
    const grouped = data.reduce((acc, item) => {
        const sede = item.sede || 'Sin sede';
        if (!acc[sede]) {
            acc[sede] = 0;
        }
        acc[sede] += parseInt(item.unidadesordenadas || 0);
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([sede, total]) => ({ sede, total }))
        .sort((a, b) => b.total - a.total);
}

// Agregar datos por producto
function aggregateByProduct(data) {
    const grouped = data.reduce((acc, item) => {
        const producto = item.producto || 'Sin producto';
        if (!acc[producto]) {
            acc[producto] = 0;
        }
        acc[producto] += parseInt(item.unidadesordenadas || 0);
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([producto, total]) => ({ producto, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);
}

// Agregar datos por tipo
function aggregateByTipo(data) {
    const grouped = data.reduce((acc, item) => {
        const tipo = item.tipo || 'Sin tipo';
        if (!acc[tipo]) {
            acc[tipo] = 0;
        }
        acc[tipo] += parseInt(item.unidadesordenadas || 0);
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([tipo, total]) => ({ tipo, total }))
        .sort((a, b) => b.total - a.total);
}

// Actualizar tabla
function updateTable() {
    const tbody = document.getElementById('dataTableBody');
    const tableCount = document.getElementById('tableCount');

    if (!tbody) return;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredData.slice(start, end);

    if (pageData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: #6b7280;">
                    No hay datos para mostrar. Ajusta los filtros.
                </td>
            </tr>
        `;
        if (tableCount) tableCount.textContent = '0 registros';
        updatePagination(0);
        return;
    }

    tbody.innerHTML = pageData.map(item => {
        const fecha = new Date(item.fecha).toLocaleDateString('es-ES');
        return `
            <tr>
                <td>${fecha}</td>
                <td>${item.sede || 'N/A'}</td>
                <td>${item.codigo || 'N/A'}</td>
                <td>${item.producto || 'N/A'}</td>
                <td>${item.tipo || 'N/A'}</td>
                <td>${item.tamano || 'N/A'}</td>
                <td>${item.base || 'N/A'}</td>
                <td class="text-right">${parseInt(item.unidadesordenadas || 0).toLocaleString()}</td>
            </tr>
        `;
    }).join('');

    if (tableCount) {
        tableCount.textContent = `${filteredData.length.toLocaleString()} registros`;
    }

    updatePagination(filteredData.length);
}

// Actualizar paginación
function updatePagination(totalItems) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="window.reportUtils.changePage(${currentPage - 1})">
            Anterior
        </button>
    `;

    // Mostrar máximo 5 páginas
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
        html += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="window.reportUtils.changePage(${i})">
                ${i}
            </button>
        `;
    }

    html += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.reportUtils.changePage(${currentPage + 1})">
            Siguiente
        </button>
    `;

    pagination.innerHTML = html;
}

// Cambiar página
function changePage(page) {
    currentPage = page;
    updateTable();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Exportar a PDF
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Reporte de Requisiciones', 14, 20);

    // Fecha
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleString('es-ES')}`, 14, 28);
    doc.text(`Total Registros: ${filteredData.length}`, 14, 34);

    // Resumen
    doc.setFontSize(12);
    doc.text('Resumen', 14, 44);

    doc.setFontSize(10);
    const totalUnidades = filteredData.reduce((sum, item) => sum + parseInt(item.unidadesordenadas || 0), 0);
    doc.text(`Total Unidades: ${totalUnidades.toLocaleString()}`, 14, 52);

    // Guardar
    doc.save(`reporte_requisiciones_${new Date().toISOString().split('T')[0]}.pdf`);

    alert('Reporte PDF generado exitosamente');
}

// Exportar a Excel
function exportToExcel() {
    const excelData = filteredData.map(item => ({
        'Fecha': new Date(item.fecha).toLocaleDateString('es-ES'),
        'Sede': item.sede || 'N/A',
        'Código': item.codigo || 'N/A',
        'Producto': item.producto || 'N/A',
        'Tipo': item.tipo || 'N/A',
        'Tamaño': item.tamano || 'N/A',
        'Base': item.base || 'N/A',
        'Unidades': parseInt(item.unidadesordenadas || 0)
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(wb, ws, 'Requisiciones');
    XLSX.writeFile(wb, `requisiciones_${new Date().toISOString().split('T')[0]}.xlsx`);

    alert('Reporte Excel generado exitosamente');
}

// Event Listeners
if (applyFilters) {
    applyFilters.addEventListener('click', applyDataFilters);
}

if (clearFilters) {
    clearFilters.addEventListener('click', clearAllFilters);
}

if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', exportToPDF);
}

if (exportExcelBtn) {
    exportExcelBtn.addEventListener('click', exportToExcel);
}

if (downloadTableBtn) {
    downloadTableBtn.addEventListener('click', exportToExcel);
}

// Funciones auxiliares
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.toggle('hidden', !show);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    console.log('Página de Reportes cargada');
    loadInitialData();
});

// Exportar funciones globales
window.reportUtils = {
    loadInitialData,
    applyDataFilters,
    clearAllFilters,
    exportToPDF,
    exportToExcel,
    changePage
};
