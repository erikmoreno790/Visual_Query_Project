// Importar funciones de API
import {
    fetchTotalSalesByProduct,
    fetchTotalSalesByLocation,
    fetchTotalSalesByDate,
    fetchMonthlySalesByProduct,
    fetchSalesByTypeSizeBase,
    fetchSalesByLocationAndProduct
} from './api.js';

// Variables globales
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const refreshBtn = document.getElementById('refreshBtn');
const periodFilter = document.getElementById('periodFilter');
const categoryFilter = document.getElementById('categoryFilter');
const sedeFilter = document.getElementById('sedeFilter');


// Estado global de filtros
let currentFilters = {
    period: 'all',
    sede: 'all',
    producto: 'all'
};

// Datos cargados
let allData = {
    salesByProduct: [],
    salesByLocation: [],
    salesByDate: [],
    salesByTypeSizeBase: [],
    salesByLocationAndProduct: []
};

// Toggle sidebar en móvil
function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Cerrar sidebar
function closeSidebarMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Event listeners para el menú
if (menuToggle) {
    menuToggle.addEventListener('click', toggleSidebar);
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', closeSidebarMenu);
}

if (overlay) {
    overlay.addEventListener('click', closeSidebarMenu);
}

// Cerrar sidebar al hacer clic en un item de navegación en móvil
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
            closeSidebarMenu();
        }

        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Función de refresh
if (refreshBtn) {
    refreshBtn.addEventListener('click', async function () {
        this.classList.add('refresh-active');

        await loadAllData();

        setTimeout(() => {
            this.classList.remove('refresh-active');
        }, 1000);
    });
}

// Cargar todos los datos de la API
async function loadAllData() {
    try {
        showLoading(true);

        // Cargar datos en paralelo
        const [
            salesByProduct,
            salesByLocation,
            salesByDate,
            salesByTypeSizeBase,
            salesByLocationAndProduct
        ] = await Promise.all([
            fetchTotalSalesByProduct(),
            fetchTotalSalesByLocation(),
            fetchTotalSalesByDate(),
            fetchSalesByTypeSizeBase(),
            fetchSalesByLocationAndProduct()
        ]);

        allData = {
            salesByProduct,
            salesByLocation,
            salesByDate,
            salesByTypeSizeBase,
            salesByLocationAndProduct
        };

        // Actualizar filtros dinámicos
        updateFilters();

        // Actualizar dashboard
        updateDashboard();

        showLoading(false);
    } catch (error) {
        console.error('Error cargando datos:', error);
        showLoading(false);
        showError('Error al cargar los datos. Por favor, verifica que el servidor esté corriendo.');
    }
}

// Actualizar filtros dinámicos
function updateFilters() {
    // Actualizar filtro de sedes
    if (sedeFilter && allData.salesByLocation.length > 0) {
        const sedes = allData.salesByLocation.map(item => item.sede);
        updateSelectOptions(sedeFilter, sedes, 'Todas las sedes');
    }

    // Actualizar filtro de productos
    if (categoryFilter && allData.salesByProduct.length > 0) {
        const productos = allData.salesByProduct.map(item => item.producto).slice(0, 20);
        updateSelectOptions(categoryFilter, productos, 'Todos los productos');
    }
}

// Actualizar opciones de un select
function updateSelectOptions(selectElement, options, defaultText) {
    const currentValue = selectElement.value;
    selectElement.innerHTML = `<option value="all">${defaultText}</option>`;

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });

    // Restaurar valor si existe
    if (currentValue && options.includes(currentValue)) {
        selectElement.value = currentValue;
    }
}

// Actualizar KPIs
function updateKPIs() {
    // Calcular métricas
    const totalUnits = allData.salesByDate.reduce((sum, item) => sum + parseInt(item.totalunidades || 0), 0);
    const totalProducts = allData.salesByProduct.length;
    const totalLocations = allData.salesByLocation.length;

    // Calcular producto más vendido
    const topProduct = allData.salesByProduct.reduce((max, item) => {
        return parseInt(item.totalunidades) > parseInt(max.totalunidades || 0) ? item : max;
    }, { totalunidades: 0 });

    // Actualizar valores en el DOM
    const kpiCards = document.querySelectorAll('.kpi-card');

    if (kpiCards[0]) {
        const valueEl = kpiCards[0].querySelector('.kpi-value');
        if (valueEl) {
            animateValue(valueEl, 0, totalUnits, 800, (val) => val.toLocaleString() + ' u');
        }
    }

    if (kpiCards[1]) {
        const valueEl = kpiCards[1].querySelector('.kpi-value');
        if (valueEl) {
            animateValue(valueEl, 0, totalProducts, 800, (val) => val.toLocaleString());
        }
    }

    if (kpiCards[2]) {
        const valueEl = kpiCards[2].querySelector('.kpi-value');
        if (valueEl) {
            animateValue(valueEl, 0, totalLocations, 800, (val) => val.toLocaleString());
        }
    }

    // Mostrar el nombre del producto más vendido y su cantidad
    if (kpiCards[3]) {
        const valueEl = kpiCards[3].querySelector('.kpi-value');
        if (valueEl) {
            animateValue(valueEl, 0, parseInt(topProduct.totalunidades || 0), 800, (val) => val.toLocaleString() + ' u');
        }
    }

}

// Animar valores numéricos
function animateValue(element, start, end, duration, formatter) {
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

// Actualizar tabla de datos
function updateTable() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    // Obtener datos filtrados de ventas por sede y producto
    let data = [...allData.salesByLocationAndProduct];

    // Aplicar filtros
    if (currentFilters.sede !== 'all') {
        data = data.filter(item => item.sede === currentFilters.sede);
    }

    if (currentFilters.producto !== 'all') {
        data = data.filter(item => item.producto === currentFilters.producto);
    }

    // Ordenar por unidades (descendente) y tomar top 20
    data = data.sort((a, b) => parseInt(b.totalunidades) - parseInt(a.totalunidades)).slice(0, 20);

    // Generar HTML
    tableBody.innerHTML = data.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.producto || 'N/A'}</td>
            <td>${item.sede || 'N/A'}</td>
            <td class="text-right">${parseInt(item.totalunidades).toLocaleString()}</td>
            <td><span class="badge ${getBadgeClass(parseInt(item.totalunidades))}">
                ${getStatusText(parseInt(item.totalunidades))}
            </span></td>
        </tr>
    `).join('');
}

// Obtener clase de badge según unidades
function getBadgeClass(units) {
    if (units > 50) return 'badge-success';
    if (units > 20) return 'badge-info';
    return 'badge-warning';
}

// Obtener texto de estado según unidades
function getStatusText(units) {
    if (units > 50) return 'Alto';
    if (units > 20) return 'Medio';
    return 'Bajo';
}

// Actualizar todo el dashboard
function updateDashboard() {
    updateKPIs();
    updateCharts();
    updateTable();
}

// Actualizar gráficos
function updateCharts() {
    if (window.chartFunctions) {
        // Aplicar filtros a los datos
        let salesByDate = [...allData.salesByDate];
        let salesByProduct = [...allData.salesByProduct];
        let salesByLocation = [...allData.salesByLocation];

        // Filtrar por sede si es necesario
        if (currentFilters.sede !== 'all') {
            const filteredByLocation = allData.salesByLocationAndProduct.filter(
                item => item.sede === currentFilters.sede
            );

            // Reagrupar por producto
            salesByProduct = Object.entries(
                filteredByLocation.reduce((acc, item) => {
                    if (!acc[item.producto]) acc[item.producto] = 0;
                    acc[item.producto] += parseInt(item.totalunidades);
                    return acc;
                }, {})
            ).map(([producto, totalunidades]) => ({ producto, totalunidades: totalunidades.toString() }));
        }

        // Filtrar por producto si es necesario
        if (currentFilters.producto !== 'all') {
            const filteredByProduct = allData.salesByLocationAndProduct.filter(
                item => item.producto === currentFilters.producto
            );

            // Reagrupar por sede
            salesByLocation = Object.entries(
                filteredByProduct.reduce((acc, item) => {
                    if (!acc[item.sede]) acc[item.sede] = 0;
                    acc[item.sede] += parseInt(item.totalunidades);
                    return acc;
                }, {})
            ).map(([sede, totalunidades]) => ({ sede, totalunidades: totalunidades.toString() }));
        }

        window.chartFunctions.updateSalesChart(salesByDate);
        window.chartFunctions.updateRevenueChart(salesByProduct);
        window.chartFunctions.updateCategoryChart(salesByLocation);
    }
}

// Event listeners para filtros
if (periodFilter) {
    periodFilter.addEventListener('change', function () {
        currentFilters.period = this.value;
        updateDashboard();
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', function () {
        currentFilters.producto = this.value;
        updateDashboard();
    });
}

if (sedeFilter) {
    sedeFilter.addEventListener('change', function () {
        currentFilters.sede = this.value;
        updateDashboard();
    });
}

// Mostrar/ocultar indicador de carga
function showLoading(show) {
    const content = document.querySelector('.dashboard-content');
    if (content) {
        content.style.opacity = show ? '0.5' : '1';
        content.style.pointerEvents = show ? 'none' : 'auto';
    }
}

// Mostrar error
function showError(message) {
    alert(message);
}

// Manejar resize de ventana
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (window.innerWidth >= 1024) {
            closeSidebarMenu();
        }
    }, 250);
});

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    console.log('Dashboard BI cargado correctamente');

    // Cargar datos iniciales
    loadAllData();

    // Animar la aparición de las tarjetas KPI
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.3s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });

    // Animar la aparición de las tarjetas de gráficos
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.3s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, (kpiCards.length + index) * 100);
    });
});

// Exportar funciones globales
window.dashboardUtils = {
    toggleSidebar,
    closeSidebarMenu,
    updateKPIs,
    updateDashboard,
    loadAllData
};
