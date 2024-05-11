 
  const chart5 = document.getElementById('sold_based_on_machine');

new Chart(chart5, {
    type: 'pie',
    data: {
        labels: ['Poland Springs Water', 'Cheezlt', 'Sunchip A', 'Sunchip B', 'Sunchip C'],
        datasets: [{
            label: 'Total Sales',
            data: [500, 300, 200, 150, 100],
            backgroundColor: [
                'rgb(59, 99, 132, 0.2)',
    
            ],
            borderColor: [
                'rgb(59, 99, 132, 1)',
    
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
        datasets: 
        [{
            label: 'Total Sales',
            data: [500, 300, 200, 150, 100],
            backgroundColor: [
                'rgb(159, 99, 132, 0.2)',
    
            ],
            borderColor: [
                'rgb(159, 99, 132, 1)',
    
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