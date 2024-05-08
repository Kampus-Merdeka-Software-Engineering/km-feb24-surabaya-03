// const chart5 = document.getElementById('sold_based_on_machine');
//  data = {
//     labels: [
//       'Red',
//       'Blue',
//       'Yellow'
//     ],
//     datasets: [{
//       label: 'hayo',
//       data: [300, 50, 100],
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   };
  
  const chart5 = document.getElementById('sold_based_on_machine');

new Chart(chart5, {
    type: 'pie',
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
            hoverOffset: 4
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
const chart6 = document.getElementById('Percentage_Payment_Type');

new Chart(chart6, {
    type: 'pie',
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
            hoverOffset: 4
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
