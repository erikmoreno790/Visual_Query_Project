// Configuración de Chart.js para Reportes
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
Chart.defaults.color = '#6b7280';

// Variables globales para los gráficos
let trendChart = null;
let sedeChart = null;
let productosChart = null;
let tiposChart = null;

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
                pointStyle: 'circle',
                font: {
                    size: 11
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
                size: 13
            },
            bodyFont: {
                size: 12
            },
            cornerRadius: 6
        }
    }
};

// Paleta de colores
const colors = [
    '#3b82f6', // Azul
    '#10b981', // Verde
    '#f59e0b', // Naranja
    '#ef4444', // Rojo
    '#8b5cf6', // Púrpura
    '#ec4899', // Rosa
    '#14b8a6', // Turquesa
    '#f97316', // Naranja oscuro
    '#6366f1', // Índigo
    '#84cc16'  // Lima
];

// Inicializar gráficos
function initializeReportCharts() {
    // Gráfico de Tendencia (Línea)
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx && !trendChart) {
        trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Unidades Ordenadas',
                    data: [],
                    borderColor: colors[0],
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: colors[0],
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e7eb',
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        ...commonOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return 'Unidades: ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Gráfico de Sede (Torta/Dona)
    const sedeCtx = document.getElementById('sedeChart');
    if (sedeCtx && !sedeChart) {
        sedeChart = new Chart(sedeCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 10
                }]
            },
            options: {
                ...commonOptions,
                cutout: '65%',
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        position: 'right'
                    },
                    tooltip: {
                        ...commonOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Gráfico de Productos (Barras horizontales)
    const productosCtx = document.getElementById('productosChart');
    if (productosCtx && !productosChart) {
        productosChart = new Chart(productosCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Unidades',
                    data: [],
                    backgroundColor: colors[0],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                ...commonOptions,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e7eb',
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        display: false
                    },
                    tooltip: {
                        ...commonOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return 'Unidades: ' + context.parsed.x.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Gráfico de Tipos (Barras)
    const tiposCtx = document.getElementById('tiposChart');
    if (tiposCtx && !tiposChart) {
        tiposChart = new Chart(tiposCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Unidades',
                    data: [],
                    backgroundColor: colors,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e7eb',
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        display: false
                    },
                    tooltip: {
                        ...commonOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return 'Unidades: ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

// Actualizar gráfico de tendencia
function updateTrendChart(data) {
    if (!trendChart || !data || data.length === 0) {
        if (trendChart) {
            trendChart.data.labels = [];
            trendChart.data.datasets[0].data = [];
            trendChart.update('none');
        }
        return;
    }
    
    const labels = data.map(item => {
        const date = new Date(item.fecha);
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    });
    
    const values = data.map(item => item.total);
    
    trendChart.data.labels = labels;
    trendChart.data.datasets[0].data = values;
    trendChart.update('active');
}

// Actualizar gráfico de sede
function updateSedeChart(data) {
    if (!sedeChart || !data || data.length === 0) {
        if (sedeChart) {
            sedeChart.data.labels = [];
            sedeChart.data.datasets[0].data = [];
            sedeChart.update('none');
        }
        return;
    }
    
    const labels = data.map(item => item.sede);
    const values = data.map(item => item.total);
    
    sedeChart.data.labels = labels;
    sedeChart.data.datasets[0].data = values;
    sedeChart.update('active');
}

// Actualizar gráfico de productos
function updateProductosChart(data) {
    if (!productosChart || !data || data.length === 0) {
        if (productosChart) {
            productosChart.data.labels = [];
            productosChart.data.datasets[0].data = [];
            productosChart.update('none');
        }
        return;
    }
    
    const labels = data.map(item => {
        const name = item.producto;
        return name.length > 30 ? name.substring(0, 30) + '...' : name;
    });
    
    const values = data.map(item => item.total);
    
    // Asignar colores diferentes a cada barra
    const backgroundColors = data.map((_, index) => colors[index % colors.length]);
    
    productosChart.data.labels = labels;
    productosChart.data.datasets[0].data = values;
    productosChart.data.datasets[0].backgroundColor = backgroundColors;
    productosChart.update('active');
}

// Actualizar gráfico de tipos
function updateTiposChart(data) {
    if (!tiposChart || !data || data.length === 0) {
        if (tiposChart) {
            tiposChart.data.labels = [];
            tiposChart.data.datasets[0].data = [];
            tiposChart.update('none');
        }
        return;
    }
    
    const labels = data.map(item => item.tipo);
    const values = data.map(item => item.total);
    
    // Asignar colores diferentes a cada barra
    const backgroundColors = data.map((_, index) => colors[index % colors.length]);
    
    tiposChart.data.labels = labels;
    tiposChart.data.datasets[0].data = values;
    tiposChart.data.datasets[0].backgroundColor = backgroundColors;
    tiposChart.update('active');
}

// Exportar funciones
window.reportChartFunctions = {
    initializeReportCharts,
    updateTrendChart,
    updateSedeChart,
    updateProductosChart,
    updateTiposChart
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initializeReportCharts);
