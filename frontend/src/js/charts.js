// Configuración de Chart.js
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
Chart.defaults.color = '#6b7280';

// Configuración común
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                padding: 15,
                usePointStyle: true,
                pointStyle: 'circle'
            }
        }
    }
};

// Variables globales para los gráficos
let salesChart = null;
let revenueChart = null;
let categoryChart = null;

// Inicializar gráficos vacíos
function initializeCharts() {
    // Gráfico de Ventas por Fecha (Línea)
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx && !salesChart) {
        salesChart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Unidades Vendidas',
                    data: [],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e7eb'
                        },
                        ticks: {
                            callback: function (value) {
                                return value.toLocaleString() + ' u';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return 'Unidades: ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Gráfico de Ventas por Producto (Barras)
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx && !revenueChart) {
        revenueChart = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Unidades Vendidas',
                    data: [],
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                }]
            },
            options: {
                ...commonOptions,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e7eb'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return 'Unidades: ' + context.parsed.x.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Gráfico de Ventas por Sede (Dona)
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx && !categoryChart) {
        categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6',
                        '#ec4899',
                        '#14b8a6'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                ...commonOptions,
                cutout: '60%',
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return label + ': ' + value.toLocaleString() + ' u (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Actualizar gráfico de ventas por fecha
function updateSalesChart(data) {
    if (!salesChart) return;

    // Ordenar por fecha
    const sortedData = [...data].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    const labels = sortedData.map(item => {
        const date = new Date(item.fecha);
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    });

    const values = sortedData.map(item => parseInt(item.totalunidades));

    salesChart.data.labels = labels;
    salesChart.data.datasets[0].data = values;
    salesChart.update('active');
}

// Actualizar gráfico de ventas por producto
function updateRevenueChart(data) {
    if (!revenueChart) return;

    // Ordenar por unidades vendidas (descendente) y tomar top 10
    const sortedData = [...data]
        .sort((a, b) => parseInt(b.totalunidades) - parseInt(a.totalunidades))
        .slice(0, 10);

    const labels = sortedData.map(item => {
        // Truncar nombres largos
        const name = item.producto || 'Sin nombre';
        return name.length > 30 ? name.substring(0, 30) + '...' : name;
    });

    const values = sortedData.map(item => parseInt(item.totalunidades));

    revenueChart.data.labels = labels;
    revenueChart.data.datasets[0].data = values;
    revenueChart.update('active');
}

// Actualizar gráfico de ventas por sede
function updateCategoryChart(data) {
    if (!categoryChart) return;

    const labels = data.map(item => item.sede || 'Sin sede');
    const values = data.map(item => parseInt(item.totalunidades));

    categoryChart.data.labels = labels;
    categoryChart.data.datasets[0].data = values;
    categoryChart.update('active');
}

// Actualizar gráfico de ventas por tipo/tamaño/base
function updateTypeSizeBaseChart(data) {
    if (!categoryChart) return;

    // Agrupar por tipo y sumar unidades
    const groupedByType = data.reduce((acc, item) => {
        const tipo = item.tipo || 'Otros';
        if (!acc[tipo]) {
            acc[tipo] = 0;
        }
        acc[tipo] += parseInt(item.totalunidades);
        return acc;
    }, {});

    const labels = Object.keys(groupedByType);
    const values = Object.values(groupedByType);

    categoryChart.data.labels = labels;
    categoryChart.data.datasets[0].data = values;
    categoryChart.update('active');
}

// Exportar funciones
window.chartFunctions = {
    initializeCharts,
    updateSalesChart,
    updateRevenueChart,
    updateCategoryChart,
    updateTypeSizeBaseChart
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initializeCharts);
