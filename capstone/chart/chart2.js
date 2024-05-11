const chart2 = document.getElementById('top_five_product_sales');

new Chart(chart2, {
    type: 'bar',
    data: {
        labels: ['Poland Springs Water', 'Cheezlt', 'Sunchip A', 'Sunchip B', 'Sunchip C'],
        datasets: [{
            label: 'Total Sales',
            data: [500, 300, 200, 150, 100],
            backgroundColor: [
                'rgb(255, 99, 132, 0.2)',
    
            ],
            borderColor: [
                'rgb(255, 99, 132, 1)',
    
            ],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
