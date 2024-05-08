const chart1 = document.getElementById('total_sales_by_month');

    new Chart(chart1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Total Sales',
                data: [883.5, 908.75, 1129, 1622.5, 1655.5, 2024.75, 2280.75, 2108.25, 1752, 1691.25, 1624.75, 1403.25],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
   