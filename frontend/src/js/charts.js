import api from './api.js';

async function displayTotalSalesByProduct() {
    try {
        // Obtener los datos usando la función proporcionada
        const salesData = await api.fetchTotalSalesByProduct();

        // Preparar los datos para el gráfico
        const labels = salesData.map(item => item.producto);
        const values = salesData.map(item => parseInt(item.totalunidades));

        // Crear el gráfico
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Unidades Vendidas',
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Unidades Vendidas'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Productos'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al mostrar los datos de ventas:', error);
    }
}

export { displayTotalSalesByProduct };
