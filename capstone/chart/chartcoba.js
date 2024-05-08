    const topFiveProductSalesData = {
        labels: ['Poland Springs Water', 'Cheezlt', 'Sunchip A', 'Sunchip B', 'Sunchip C'],
        datasets: [{
            label: 'Sales',
            data: [500, 300, 200, 150, 100], // Contoh data penjualan
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    };
    
    // Konfigurasi Chart
    const topFiveProductSalesConfig = {
        type: 'horizontalBar',
        data: topFiveProductSalesData,
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };
    
    // Inisialisasi Chart
    const topFiveProductSalesChart = new Chart(
        document.getElementById('chartcoba'),
        topFiveProductSalesConfig
    );
    