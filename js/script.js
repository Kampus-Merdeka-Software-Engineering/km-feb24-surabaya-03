fetch("../json/alldata_vm.json").then(response => response.json()).then(data => test(data));

let trm = [];
let trmRequestAll = [];
const monthList = []
const lineTotal = [];


function test(data){
    data.forEach(item => {
        if(item.TransMonth){
            let extTrm = trm.find(t => (t.Category === item.Category) && (t.Location === item.Location) && (t.TransMonth === item.TransMonth))
            if(extTrm){
                extTrm.LineTotal = parseFloat(extTrm.LineTotal) + parseFloat(item.LineTotal);
            }
            else{
                trm.push({Category: item.Category, Location: item.Location, TransMonth: item.TransMonth, LineTotal: parseInt(item.LineTotal)});
            }
        }
    })

    trm.forEach(i => {
        let trmCall = trmRequestAll.find(t => (t.TransMonth === i.TransMonth));
    
        if(trmCall){
            trmCall.LineTotal = parseFloat(trmCall.LineTotal) + parseFloat(i.LineTotal);
        }
        else{
            trmRequestAll.push({TransMonth: i.TransMonth, LineTotal: i.LineTotal});
        }
    })
    
    console.log(trmRequestAll);

    for (let i = 0; i < trmRequestAll.length; i++) {
        monthList[i] = trmRequestAll[i].TransMonth;
        lineTotal[i] = parseFloat(trmRequestAll[i].LineTotal);
    }

}

console.log(monthList);
console.log(lineTotal);



// Total Sales by Month - Grafik Line

const chart1 = document.getElementById('total_sales_by_month');

    new Chart(chart1, {
        type: 'line',
        data: {
            labels: monthList,
            datasets: [{
                label: 'Total Sales',
                data: lineTotal,
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
   
    // Top Five Product Sales - Grafik Batang
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
    
    // Sold Based on Machine - Grafik Pie
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

  // Percentage Payment Type - Grafik Pie
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

