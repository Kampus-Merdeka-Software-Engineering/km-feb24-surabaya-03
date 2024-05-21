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

const dataGet = [];
const dataGetFilter = [];

const dataLoc = [];
const locSalesByCategory = [];

const dataCat = [];
let sumCat;

const dataTrMonth = [];

const dataTp = [];

const dataMch = [];
let sumMch;

const dataPrd = [];
let sumPrd;

const dataTrans = [];
let sumTrans;

let sumQty = 0;

function getData(dataLoop){
    let extData = dataGet.find(d => (d.Location === dataLoop.Location) && (d.Machine === dataLoop.Machine) && (d.Product === dataLoop.Product) && (d.Category === dataLoop.Category) && (d.Transaction === dataLoop.Transaction) && (d.Type === dataLoop.Type) && (d.RQty === dataLoop.RQty) && (d.LineTotal === dataLoop.LineTotal) && (d.TransMonth === dataLoop.TransMonth));

    if(extData){
        extData = extData;
    }
    else{
        dataGet.push({Location: dataLoop.Location, Machine: dataLoop.Machine, Product: dataLoop.Product, Category: dataLoop.Category, Transaction: dataLoop.Transaction, Type: dataLoop.Type, RQty: dataLoop.RQty, LineTotal: dataLoop.LineTotal, TransMonth: dataLoop.TransMonth});
    }
}

function getDataLocation(dataGet){
    dataGet.forEach(i => {
        let loc = dataLoc.find(l => l.Location === i.Location);
        let totalSalesLocationByCategory = locSalesByCategory.find(lc => (lc.Location === i.Location) && (lc.Category === i.Category))
    
        if(loc){
            loc.Location = i.Location
        }
        else{
            dataLoc.push({Location: i.Location});
        }
    
        if(totalSalesLocationByCategory){
            totalSalesLocationByCategory.LineTotal = parseFloat(totalSalesLocationByCategory.LineTotal) + parseFloat(i.LineTotal);
        }
        else{
            locSalesByCategory.push({Location: i.Location, Category: i.Category, LineTotal: parseFloat(i.LineTotal)});
        }
    })
}

function getDataCategory(dataGet){
    dataGet.forEach(i => {
        let cat = dataCat.find(c => c.Category === i.Category)

        if(cat){
            cat.Category = i.Category;
        }
        else{
            dataCat.push({Category: i.Category});
        }
    })

    sumCat = dataCat.length;
}

function getDataTransMonth(dataGet){
    dataGet.forEach(i => {
        let trm = dataTrMonth.find(t => t.TransMonth === i.TransMonth);

        if(trm){
            trm.TransMonth = i.TransMonth;
        }
        else{
            dataTrMonth.push({TransMonth: i.TransMonth});
        }
    })
}

function getDataType(dataGet){
    dataGet.forEach(i => {
        let tp = dataTp.find(t => (t.Type === i.Type));

        if(tp){
            tp.LineTotal = parseFloat(tp.LineTotal) + parseFloat(i.LineTotal);
        }
        else{
            dataTp.push({Type: i.Type, LineTotal: parseFloat(i.LineTotal)});
        }
    })
}

function getDataMachine(dataGet){
    dataGet.forEach(i => {
        let mch = dataMch.find(m => m.Machine === i.Machine);

        if(mch){
            mch.LineTotal = parseFloat(mch.LineTotal) + parseFloat(i.LineTotal);
        }
        else{
            dataMch.push({Machine: i.Machine, LineTotal: parseFloat(i.LineTotal)});
        }
    })

    sumMch = dataMch.length;
}

function getDataProduct(dataGet){
    dataGet.forEach(i => {
        let prd = dataPrd.find(p => p.Product === i.Product);

        if(prd){
            prd.RQty = parseInt(prd.RQty) + parseInt(i.RQty);
        }
        else{
            dataPrd.push({Product: i.Product, RQty: parseInt(i.RQty)})
        }
    })

    sumPrd = dataPrd.length;
}

function getDataTransaction(dataGet){
    dataGet.forEach(i => {
        let trs = dataTrans.find(t => t.Transaction === i.Transaction);

        if(trs){
            trs.Transaction = i.Transaction;
        }
        else{
            dataTrans.push({Transaction: i.Transaction});
        }
    })

    sumTrans = dataTrans.length;
}

function getDataRQty(dataGet){
    dataGet.forEach(i => {
        sumQty = sumQty + parseInt(i.RQty);
    })
}

function test(data){
    data.forEach(item => {
        getData(item);
    });

    for(var i = 0; i < dataGet.length; i++){
        dataGetFilter[i] = dataGet[i];
    }
    getDataRQty(dataGetFilter);
    // console.log(dataPrd);
    console.log(sumQty);

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
    // console.log(mchRequestAll);
    
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
            }
        }
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
            }
        }
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
              y: {
                  beginAtZero: true
              }
          }
      }
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
              y: {
                  beginAtZero: true
              }
          }
      }
  });

}