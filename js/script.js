fetch("../json/alldata_vm.json")
    .then(response => response.json())
    .then(data => test(data));

let trm = [];
let prd = [];
let machine = [];
let lt = [];

let lctList = document.getElementById("lctList");
let ctgList = document.getElementById("ctgList");
let mthList = document.getElementById("mthList");


let dataGet = [];
let dataGetFilter = [];

let dataLoc = [];
let locSalesByCategory = [];

let dataCat = [];
let sumCat;

let dataTrMonth = [];
let dataLnTtlMonth = [];

let dataTp = [];

let dataMch = [];
let sumMch;

let dataPrd = [];
let sumPrd;

let dataTrans = [];
let sumTrans;

let sumQty = 0;

let revenue = 0;

let dropdownChoose = [{Location: '', Category: '', TransMonth: ''}];


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
    locSalesByCategory = [];
    dataGet.forEach(i => {
        let totalSalesLocationByCategory = locSalesByCategory.find(lc => (lc.Location === i.Location) && (lc.Category === i.Category))
    
        if(totalSalesLocationByCategory){
            totalSalesLocationByCategory.LineTotal = parseFloat(totalSalesLocationByCategory.LineTotal) + parseFloat(i.LineTotal);
        }
        else{
            locSalesByCategory.push({Location: i.Location, Category: i.Category, LineTotal: parseFloat(i.LineTotal)});
        }
    })

}

function getDataDropdownLocation(dataGet){
    dataLoc = [];
    dataGet.forEach(i => {
        let loc = dataLoc.find(l => l.Location === i.Location);

        if(loc){
            loc.Location = i.Location
        }
        else{
            dataLoc.push({Location: i.Location});
        }
    
        var lctData = '<option value="">All Locations</option>'
        dataLoc.forEach(l => {
            lctData += '<option value="' + l.Location + '">' + l.Location + '</option>';
        })
    
        lctList.innerHTML = lctData;
    })

}


function getDataDropdownCategory(dataGet){
    dataCat = [];
    dataGet.forEach(i => {
        let cat = dataCat.find(c => c.Category === i.Category)

        if(cat){
            cat.Category = i.Category;
        }
        else{
            dataCat.push({Category: i.Category});
        }

        var ctgData = '<option value="">All Categories</option>'
        dataCat.forEach(c => {
            ctgData += '<option value="' + c.Category + '">' + c.Category + '</option>';
        })
    
        ctgList.innerHTML = ctgData;
    })

    sumCat = dataCat.length;

    categoryValue.innerHTML = sumCat;
}

function getDataTransMonth(dataGet){
    dataLnTtlMonth = [];

    dataGet.forEach(i => {
        let ltm = dataLnTtlMonth.find(t => t.TransMonth === i.TransMonth);

        if(ltm){
            ltm.LineTotal = parseFloat(ltm.LineTotal) + parseFloat(i.LineTotal);
        }
        else{
            dataLnTtlMonth.push({TransMonth: i.TransMonth, LineTotal: parseFloat(i.LineTotal)});
        }
    });
}

function getDataDropdownTransMonth(dataGet){
    dataTrMonth = [];
    dataGet.forEach(i => {
        let trm = dataTrMonth.find(t => t.TransMonth === i.TransMonth);

        if(trm){
            trm.TransMonth = i.TransMonth;
        }
        else{
            dataTrMonth.push({TransMonth: i.TransMonth});
        }
    })

    var mthData = '<option value="">All Months</option>'
    dataTrMonth.forEach(m => {
        mthData += '<option value="' + m.TransMonth + '">' + m.TransMonth + '</option>';
    })

    mthList.innerHTML = mthData;
}

function getDataType(dataGet){
    dataTp = [];
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
    dataMch = [];
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
    machineValue.innerHTML = sumMch;
}

function getDataProduct(dataGet){
    dataPrd = [];
    dataGet.forEach(i => {
        let prd = dataPrd.find(p => p.Product === i.Product);

        if(prd){
            prd.RQty = parseInt(prd.RQty) + parseInt(i.RQty);
        }
        else{
            dataPrd.push({Product: i.Product, RQty: parseInt(i.RQty)})
        }
    })

    dataPrd.sort((a, b) => b.RQty - a.RQty);

    sumPrd = dataPrd.length;
    productValue.innerHTML = sumPrd;
}

function getDataTransaction(dataGet){
    dataTrans = [];
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
    transactionValue.innerHTML = sumTrans;
}

function getDataRQty(dataGet){
    dataGet.forEach(i => {
        sumQty = sumQty + parseInt(i.RQty);
    })

    qtySoldValue.innerHTML = sumQty;
}

function getDataLineTotal(dataGet){
    dataGet.forEach(i => {
        revenue = revenue + parseFloat(i.LineTotal);
    })

    revenueValue.innerHTML = `$ ${revenue}`;
}

function visualization() {
    // Total Sales by Month - Grafik Line
    let chart1 = document.getElementById('total_sales_by_month');
    if (chart1) {
        // Clear existing chart instance
        if (chart1.chartInstance) {
            chart1.chartInstance.destroy();
        }
        chart1.chartInstance = new Chart(chart1, {
            type: 'line',
            data: {
                labels: dataLnTtlMonth.map(row => row.TransMonth),
                datasets: [{
                    label: 'Total Sales',
                    data: dataLnTtlMonth.map(row => row.LineTotal),
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
    }

    // Top Five Product Sales - Grafik Batang
    let chart2 = document.getElementById('top_five_product_sales');
    if (chart2) {
        if (chart2.chartInstance) {
            chart2.chartInstance.destroy();
        }
        chart2.chartInstance = new Chart(chart2, {
            type: 'bar',
            data: {
                labels: dataPrd.slice(0, 5).map(row => row.Product),
                datasets: [{
                    label: 'RQty',
                    data: dataPrd.slice(0, 5).map(row => row.RQty),
                    backgroundColor: [
                        'rgba(140,117,233)',
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
    }

    // Sold Based on Machine - Grafik Pie
    let chart3 = document.getElementById('sold_based_on_machine');
    if (chart3) {
        if (chart3.chartInstance) {
            chart3.chartInstance.destroy();
        }
        chart3.chartInstance = new Chart(chart3, {
            type: 'doughnut',
            data: {
                labels: dataMch.map(row => row.Machine),
                datasets: [{
                    label: 'Total Sales',
                    data: dataMch.map(row => row.LineTotal),
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
    }

    // Percentage Payment Type - Grafik Doughnut
    let chart4 = document.getElementById('Percentage_Payment_Type');
    if (chart4) {
        if (chart4.chartInstance) {
            chart4.chartInstance.destroy();
        }
        chart4.chartInstance = new Chart(chart4, {
            type: 'doughnut',
            data: {
                labels: dataTp.map(row => row.Type),
                datasets: [{
                    label: 'Total Sales',
                    data: dataTp.map(row => row.LineTotal),
                    backgroundColor: [
                        'rgb(231,133,183)',
                        'rgb(140,117,233)',
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
    }

    let chart5 = document.getElementById('based_on_Category');
    if (chart5) {
        if(chart5.chartInstance) {
            chart5.chartInstance.destroy();
        }
        chart5.chartInstance = new Chart(chart5, {
            type: 'bar',
        data: {
            labels: dataLoc.map(row => row.Location),
            datasets: [
                {
                    label: 'food',
                    data: dataTp.map(row => row.Type),
                    backgroundColor: 'rgba(140, 117, 233, 0.5)',
                    borderColor: 'rgba(140, 117, 233, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Carbonated',
                    data: dataMch.map(row => row.Machine),
                    backgroundColor: 'rgb(140,117,233)',
                    borderColor: 'rgba(117, 233, 140, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Non Carbonated',
                    data: dataTrMonth.map(row => row.TransMonth),
                    backgroundColor: 'rgb(234,162,76)',
                    borderColor: 'rgba(117, 233, 140, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Water',
                    data: dataTrMonth.map(row => row.TransMonth),
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
    }

    let chart6 = document.getElementById('Payment_vs_Purchased');
    if (chart6) {
        if (chart6.chartInstance) {
            chart6.chartInstance.destroy();
        }
        chart6.chartInstance = new Chart(chart6, {
            type: 'bar',
            data: {
                labels: dataTp.map(row => row.Type),
                datasets: [{
                    label: 'Cash',
                    data: dataTp.map(row => row.LineTotal),
                    backgroundColor: [
                        'rgba(140,117,233)',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Credit',
                    data: dataTp.map(row => row.LineTotal),
                    backgroundColor: [
                        'rgba(140,117,233)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'x',
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
    }
    let chart7 = document.getElementById('Purchased_vs_Price');
    if (chart7) {
        if (chart7.chartInstance) {
            chart7.chartInstance.destroy();
        }
        chart7.chartInstance = new Chart(chart7, {
            type: 'bar',
            data: {
                labels: dataPrd.slice(0, 5).map(row => row.Product),
                datasets: [{
                    label: 'RQty',
                    data: dataPrd.slice(0, 5).map(row => row.RQty),
                    backgroundColor: [
                        'rgba(140,117,233)',
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
    }
}


function test(data){
    data.forEach(item => {
        getData(item);
    });

    for(var i = 0; i < dataGet.length; i++){
        dataGetFilter[i] = dataGet[i];
    }

    getDataLocation(dataGetFilter);
    getDataDropdownLocation(dataGetFilter);
    getDataDropdownCategory(dataGetFilter);
    getDataDropdownTransMonth(dataGetFilter);
    getDataTransMonth(dataGetFilter);
    getDataType(dataGetFilter);
    getDataMachine(dataGetFilter);
    getDataProduct(dataGetFilter);
    getDataTransaction(dataGetFilter);
    getDataRQty(dataGetFilter);
    getDataLineTotal(dataGetFilter);
    visualization();

    lctList.addEventListener('change', function () {
        dropdownChoose[0].Location = lctList.value;
        updateDataView();
    })
    ctgList.addEventListener('change', function () {
        dropdownChoose[0].Category = ctgList.value;
        updateDataView();
    })
    
    mthList.addEventListener('change', function () {
        dropdownChoose[0].TransMonth = mthList.value;
        updateDataView();
    })
    console.log(dropdownChoose);
}



function updateDataView(){
    let lctChoosed = dropdownChoose[0].Location;
    let ctgChoosed = dropdownChoose[0].Category;
    let mthChoosed = dropdownChoose[0].TransMonth;

    revenue = 0;
    sumQty = 0;

    if(lctChoosed === '' && ctgChoosed === '' && mthChoosed === ''){
        dataGetFilter = dataGet;
        getDataLocation(dataGetFilter);
        getDataDropdownLocation(dataGetFilter);
        getDataDropdownCategory(dataGetFilter);
        getDataDropdownTransMonth(dataGetFilter);
        getDataType(dataGetFilter);
        getDataMachine(dataGetFilter);
        getDataProduct(dataGetFilter);
        getDataTransaction(dataGetFilter);
        getDataRQty(dataGetFilter);
        getDataLineTotal(dataGetFilter);
        getDataTransMonth(dataGetFilter);
        visualization();
        console.log(dropdownChoose);

    }
    else if(lctChoosed !== '' && ctgChoosed === '' && mthChoosed === ''){
        dataGetFilter = dataGet.filter(item => item.Location === lctChoosed);
        getDataLocation(dataGetFilter);
        getDataDropdownCategory(dataGetFilter);
        getDataDropdownTransMonth(dataGetFilter);
        getDataTransMonth(dataGetFilter);
        getDataType(dataGetFilter);
        getDataMachine(dataGetFilter);
        getDataProduct(dataGetFilter);
        getDataTransaction(dataGetFilter);
        getDataRQty(dataGetFilter);
        getDataLineTotal(dataGetFilter);
        visualization();
        console.log(dropdownChoose);
        console.log(dataMch);

    }
    else if(lctChoosed === '' && ctgChoosed !== '' && mthChoosed === ''){
        dataGetFilter = dataGet.filter(item => item.Category === ctgChoosed);
        getDataLocation(dataGetFilter);
        getDataDropdownLocation(dataGetFilter);
        getDataDropdownTransMonth(dataGetFilter);
        getDataTransMonth(dataGetFilter);
        getDataType(dataGetFilter);
        getDataMachine(dataGetFilter);
        getDataProduct(dataGetFilter);
        getDataTransaction(dataGetFilter);
        getDataRQty(dataGetFilter);
        getDataLineTotal(dataGetFilter);
        visualization();
        console.log(dropdownChoose);

    }
    else if(lctChoosed === '' && ctgChoosed === '' && mthChoosed !== ''){
        dataGetFilter = dataGet.filter(item => item.TransMonth === mthChoosed);
        getDataLocation(dataGetFilter);
        getDataDropdownLocation(dataGetFilter);
        getDataDropdownCategory(dataGetFilter);
        getDataTransMonth(dataGetFilter);
        getDataType(dataGetFilter);
        getDataMachine(dataGetFilter);
        getDataProduct(dataGetFilter);
        getDataTransaction(dataGetFilter);
        getDataRQty(dataGetFilter);
        getDataLineTotal(dataGetFilter);
        visualization();
        console.log(dropdownChoose);

    }
    else if(lctChoosed !== '' && ctgChoosed !== '' && mthChoosed === ''){
        dataGetFilter = dataGet.filter(item => item.Location === lctChoosed && item.Category === ctgChoosed);
        getDataLocation(dataGetFilter);
        getDataDropdownTransMonth(dataGetFilter);
        getDataType(dataGetFilter);
        getDataTransMonth(dataGetFilter);
        getDataMachine(dataGetFilter);
        getDataProduct(dataGetFilter);
        getDataTransaction(dataGetFilter);
        getDataRQty(dataGetFilter);
        getDataLineTotal(dataGetFilter);
        visualization();
        console.log(dropdownChoose);

    }
    else if(lctChoosed !== '' && ctgChoosed === '' && mthChoosed !== ''){
        dataGetFilter = dataGet.filter(item => item.Location === lctChoosed && item.TransMonth === mthChoosed);
        getDataLocation(dataGetFilter);
        getDataDropdownCategory(dataGetFilter);
        getDataType(dataGetFilter);
        getDataMachine(dataGetFilter);
        getDataProduct(dataGetFilter);
        getDataTransMonth(dataGetFilter);
        getDataTransaction(dataGetFilter);
        getDataRQty(dataGetFilter);
        getDataLineTotal(dataGetFilter);
        visualization();
        console.log(dropdownChoose);

    }
    else if(lctChoosed === '' && ctgChoosed !== '' && mthChoosed !== ''){
        dataGetFilter = dataGet.filter(item => item.Category === ctgChoosed && item.TransMonth === mthChoosed);
        getDataLocation(dataGetFilter);
        getDataDropdownLocation(dataGetFilter);
        getDataType(dataGetFilter);
        getDataMachine(dataGetFilter);
        getDataTransMonth(dataGetFilter);
        getDataProduct(dataGetFilter);
        getDataTransaction(dataGetFilter);
        getDataRQty(dataGetFilter);
        getDataLineTotal(dataGetFilter);
        visualization();
        console.log(dropdownChoose);

    }
    else{
        dataGetFilter = dataGet.filter(item => item.Location === lctChoosed && item.Category === ctgChoosed && item.TransMonth === mthChoosed);
        getDataLocation(dataGetFilter);
        getDataType(dataGetFilter);
        getDataMachine(dataGetFilter);
        getDataProduct(dataGetFilter);
        getDataTransMonth(dataGetFilter);
        getDataTransaction(dataGetFilter);
        getDataRQty(dataGetFilter);
        getDataLineTotal(dataGetFilter);
        visualization();
        console.log(dropdownChoose);

    }



}

