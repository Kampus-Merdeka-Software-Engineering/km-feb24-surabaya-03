fetch("../json/alldata_vm.json")
    .then(response => response.json())
    .then(data => test(data));

let trm = [];
let prd = [];
let machine = [];
let lt = [];
let trmRequestAll = [];
let prdRequestAll = [];
let mchRequestAll = [];
let typeRequestAll = [];
const monthList = [];
const lineTotal = [];
const prdList = [];
const prdRQTy = [];
const mchLineTotal = [];
const mchList = [];
const ltList = [];
const ltLineTotal = [];

function test(data){
    data.forEach(item => {
        if(item.TransMonth){
            let extTrm = trm.find(t => (t.Category === item.Category) && (t.Location === item.Location) && (t.TransMonth === item.TransMonth));
            if(extTrm){
                extTrm.LineTotal = parseFloat(extTrm.LineTotal) + parseFloat(item.LineTotal);
            }
            else{
                trm.push({Category: item.Category, Location: item.Location, TransMonth: item.TransMonth, LineTotal: parseInt(item.LineTotal)});
            }
        }

        if(item.Product){
            let extPrd = prd.find(l => (l.Product === item.Product) && (l.Location === item.Location) && (l.Category === item.Category) && (l.TransMonth === item.TransMonth));

            if(extPrd){
                extPrd.RQty = parseInt(extPrd.RQty) + parseInt(item.RQty);
            }
            else{
                prd.push({Product: item.Product, RQty: parseInt(item.RQty), Location: item.Location, Category: item.Category, TransMonth: item.TransMonth});
            }
        }

        if(item.Machine){
            let extMachine = machine.find(m => (m.Machine === item.Machine) && (m.Location === item.Location) && (m.Category === item.Category) && (m.TransMonth === item.TransMonth));

            if(extMachine){
                extMachine.LineTotal = parseFloat(extMachine.LineTotal) + parseFloat(item.LineTotal);
            }
            else{
                machine.push({Machine: item.Machine, LineTotal: item.LineTotal, Location: item.Location, Category: item.Category, TransMonth: item.TransMonth});
            }
        }

        if(item.Type){
            let extType = lt.find(l => (l.Type === item.Type) && (l.Location === item.Location) && (l.Category === item.Category) && (l.TransMonth === item.TransMonth) );

            if(extType){
                extType.LineTotal = parseFloat(extType.LineTotal) + parseFloat(item.LineTotal);
            }
            else{
                lt.push({Type: item.Type, LineTotal: parseFloat(item.LineTotal), Location: item.Location, Category: item.Category, TransDate: item.TransDate});
            }
        }   
    });


    trm.forEach(i => {
        let trmCall = trmRequestAll.find(t => (t.TransMonth === i.TransMonth));
    
        if(trmCall){
            trmCall.LineTotal = parseFloat(trmCall.LineTotal) + parseFloat(i.LineTotal);
        }
        else{
            trmRequestAll.push({TransMonth: i.TransMonth, LineTotal: i.LineTotal});
        }
    });

    prd.forEach(p => {
        let extPrd = prdRequestAll.find(l => (l.Product === p.Product) );
        if(extPrd){
            extPrd.RQty += parseInt(p.RQty);
        }
        else{
            prdRequestAll.push({Product: p.Product, RQty: parseInt(p.RQty)});
        }
    });

    machine.forEach(m => {
        let extMachine = mchRequestAll.find(mc => (mc.Machine === m.Machine));
        if(extMachine){
            extMachine.LineTotal += parseInt(m.LineTotal)
        }
        else{
            mchRequestAll.push({Machine: m.Machine, LineTotal: m.LineTotal})
        }
    })

    lt.forEach(j => {
        let extType = typeRequestAll.find(l => (l.Type === j.Type) );
        if(extType){
            extType.LineTotal += parseFloat(j.LineTotal);
        }
        else{
            typeRequestAll.push({Type: j.Type, LineTotal: parseFloat(j.LineTotal)})
        }
    })

    prdRequestAll.sort((a, b) => b.RQty - a.RQty);
    console.log(mchRequestAll);
    
    for (let i = 0; i < trmRequestAll.length; i++) {
        monthList[i] = trmRequestAll[i].TransMonth;
        lineTotal[i] = trmRequestAll[i].LineTotal;
    }

    for (let i = 0; i < 5; i++){
        prdList[i] = prdRequestAll[i].Product;
        prdRQTy[i] = prdRequestAll[i].RQty;
    }

    for(let i = 0; i < mchRequestAll.length; i++){
        mchList[i] = mchRequestAll[i].Machine;
        mchLineTotal[i] = mchRequestAll[i].LineTotal;
    }

    for(let i = 0; i < typeRequestAll.length; i++){
        ltList[i] = typeRequestAll[i].Type;
        ltLineTotal[i] = typeRequestAll[i].LineTotal;
    }

    // Total Sales by Month - Grafik Line
    const chart1 = document.getElementById('total_sales_by_month');

    new Chart(chart1, {
        type: 'line',
        data: {
            labels: monthList,
            datasets: [{
                label: 'Total Sales',
                data: lineTotal,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                Tooltip: {
                    enabled : false
                },
            }
    },
    plugins: [ChartDataLabels]
    });

   
    // Top Five Product Sales - Grafik Batang
    const chart2 = document.getElementById('top_five_product_sales');

    new Chart(chart2, {
        type: 'bar',
        data: {
            labels: prdList,
            datasets: [{
                label: 'RQty',
                data: prdRQTy,
                backgroundColor: [
                    'rgba(140,117,233)',

        
                ],
                borderColor: [
                   

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
            },
            plugins: {
                Tooltip: {
                    enabled : false
                }
            }
    },
    plugins: [ChartDataLabels]
    });
   
    // Sold Based on Machine - Grafik Pie
  const chart3 = document.getElementById('sold_based_on_machine');

  new Chart(chart3, {
      type: 'doughnut',
      data: {
          labels: mchList,
          datasets: [{
              label: 'Total Sales',
              data: mchLineTotal,
              backgroundColor: [
                  'rgb(140,117,233)',
                  'rgb(234,162,76)',
                  'rgb(231,133,183)',
                  'rgb(51,83,108)',
                  'rgba(202,131,226,255)',
      
              ],

              hoverOffset: 0
          }]
      },
      options: {
          scales: {
          },plugins: {
            Tooltip: {
                enabled : false
            }
        }
    },
    plugins: [ChartDataLabels]
  });

  // Percentage Payment Type - Grafik Pie
  const chart4 = document.getElementById('Percentage_Payment_Type');
  
  new Chart(chart4, {
      type: 'doughnut',
      data: {
          labels: ltList,
          datasets: 
          [{
              label: 'Total Sales',
              data: ltLineTotal,
              backgroundColor: [
                  'rgb(231,133,183)',
                  'rgb(140,117,233)',
      
              ],
            //   borderColor: [
            //       'rgb(159, 99, 132, 1)',
      
            //   ],
              
              hoverOffset: 4
          }]
      },
      options: {
          scales: {
          },plugins: {
            Tooltip: {
                enabled : false
            }
        },
        datalabels:{
            formatter: (value, context) => {
                console.log(value);
                console.log(context.chart4);
                return value; 
            }
        }
    },
    plugins: [ChartDataLabels]
  });

  const chart5 = document.getElementById('sales_based_on_Category');

new Chart(chart5, {
    type: 'bar',
    data: {
        labels: prdList,
        datasets: [
            {
                label: 'RQty',
                data: prdRQTy,
                backgroundColor: 'rgba(140, 117, 233, 0.5)',
                borderColor: 'rgba(140, 117, 233, 1)',
                borderWidth: 1
            },
            {
                label: 'ltLineTotal',
                data: ltLineTotal,
                backgroundColor: 'rgb(140,117,233)',
                borderColor: 'rgba(117, 233, 140, 1)',
                borderWidth: 1
            },
            {
                label: 'lmchLineTotal',
                data: mchLineTotal,
                backgroundColor: 'rgb(234,162,76)',
                borderColor: 'rgba(117, 233, 140, 1)',
                borderWidth: 1
            },
            {
                label: 'lmchLineTotal',
                data: mchLineTotal,
                backgroundColor: 'rgb(159, 99, 132, 1)',
                borderColor: 'rgba(117, 233, 140, 1)',
                borderWidth: 1
            },
        ]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                stacked: true
            },
            x: {
                stacked: true
            }
        },
            plugins: {
                Tooltip: {
                    enabled : false
                }
            }
    },
    plugins: [ChartDataLabels]
});

const chart6 = document.getElementById('Payment_vs_Purchased');

new Chart(chart6, {
    type: 'pie',
    data: {
        labels: mchList,
        datasets: [{
            label: 'Total Sales',
            data: mchLineTotal,
            backgroundColor: [
                'rgb(140,117,233)',
                'rgb(234,162,76)',
                'rgb(231,133,183)',
                'rgb(51,83,108)',
                'rgba(202,131,226,255)',
    
            ],

            hoverOffset: 0
        }]
    },
    options: {
        scales: {
        },plugins: {
          Tooltip: {
              enabled : false
          }
      },
      datalabels:{
        formatter: (value, context) => {
            console.log(value);
            console.log(context);
            return value;
        }
    }
  },
  plugins: [ChartDataLabels]
});
 

}

