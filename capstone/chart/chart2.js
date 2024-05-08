// const topFiveProductSalesData = {
//     labels: ['Poland Springs Water', 'Cheezlt', 'Sunchip A', 'Sunchip B', 'Sunchip C'],
//     datasets: [{
//         label: 'Sales',
//         data: [500, 300, 200, 150, 100], // Contoh data penjualan
//         backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)'
//         ],
//         borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',    
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)'
//         ],
//         borderWidth: 1
//     }]
// };

// // Konfigurasi Chart
// const topFiveProductSalesConfig = {
//     type: 'horizontalBar',
//     data: topFiveProductSalesData,
//     options: {
//         scales: {
//             xAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// };

// // Inisialisasi Chart
// const topFiveProductSalesChart = new Chart(
//     document.getElementById('top_five_product_sales'),
//     topFiveProductSalesConfig
// );
const ctx = document.getElementById('top_five_product_sales');

    new Chart(ctx, {
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
   