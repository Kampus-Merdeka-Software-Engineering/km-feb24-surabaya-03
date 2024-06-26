fetch("../json/alldata_vm.json")
    .then(response => response.json())
    .then(data => {
            test(data);
            $('#example').DataTable(); // Inisialisasi DataTables setelah data dimuat
        });

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

let dataRPrice = [];
let dataTypeRQty = [];
let dataTypeRQtyWithRQTySum = []; 

let sumQty = 0;

let revenue = 0;

let dropdownChoose = [{Location: '', Category: '', TransMonth: ''}];


function getData(dataLoop){
    let extData = dataGet.find(d => (d.Location === dataLoop.Location) && (d.Machine === dataLoop.Machine) && (d.Product === dataLoop.Product) && (d.Category === dataLoop.Category) && (d.Transaction === dataLoop.Transaction) && (d.Type === dataLoop.Type) && (d.RQty === dataLoop.RQty) && (d.LineTotal === dataLoop.LineTotal) && (d.TransMonth === dataLoop.TransMonth) && (d.RPrice === dataLoop.RPrice));

    if(extData){
        extData = extData;
    }
    else{
        dataGet.push({Location: dataLoop.Location, Machine: dataLoop.Machine, Product: dataLoop.Product, Category: dataLoop.Category, Transaction: dataLoop.Transaction, Type: dataLoop.Type, RQty: dataLoop.RQty, LineTotal: dataLoop.LineTotal, TransMonth: dataLoop.TransMonth, RPrice: dataLoop.RPrice});
    }
}

function dataTable(dataGet) {
    let dataList = '';

    for (let i = 0; i < dataGet.length; i++) {
        dataList += `<tr>
            <td>${dataGet[i].Transaction}</td>
            <td>${dataGet[i].Product}</td>
            <td>${dataGet[i].Machine}</td>
            <td>${dataGet[i].Location}</td>
            <td>${dataGet[i].Category}</td>
            <td>${dataGet[i].RQty}</td>
            <td>${dataGet[i].LineTotal}</td>
            <td>${dataGet[i].Type}</td>
            <td>${dataGet[i].TransMonth}</td>
        </tr>`;
    }

    document.getElementById('dataPlace').innerHTML = dataList;
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
    dataTypeRQty = [];
    dataTypeRQtyWithRQTySum = [];
    let rQtySumMap = {};

    dataGet.forEach(i => {
        let tp = dataTp.find(t => (t.Type === i.Type));
        let tr = dataTypeRQty.find(tt => (tt.Type === i.Type) && (tt.RQty === i.RQty));

        if(tp){
            tp.LineTotal = parseFloat(tp.LineTotal) + parseFloat(i.LineTotal);
        }
        else{
            dataTp.push({Type: i.Type, LineTotal: parseFloat(i.LineTotal)});
        }

        if(tr){
            tr.Sum += 1;
        }
        else{
            dataTypeRQty.push({Type: i.Type, RQty: i.RQty, Sum: 1, SumRQty: 0});
        }
    })
    
    dataTypeRQty.forEach(i => {
        if (rQtySumMap[i.RQty]) {
            rQtySumMap[i.RQty] += i.Sum;
        } else {
            rQtySumMap[i.RQty] = i.Sum;
        }
    });

    dataTypeRQty.forEach(i => {
        dataTypeRQtyWithRQTySum.push({
            Type: i.Type,
            RQty: i.RQty,
            Sum: i.Sum,
            SumRQTy: rQtySumMap[i.RQty]
        });
    });


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

function getDataRPrice(dataGet){
    dataRPrice = [];
    dataGet.forEach(i => {
        let rp = dataRPrice.find(r => (r.RPrice === i.RPrice));

        if(rp){
            rp.RQty = parseInt(rp.RQty) + parseInt(i.RQty);
        }
        else{
            dataRPrice.push({RPrice: i.RPrice, RQty: parseInt(i.RQty)});
        }
    });

    dataRPrice.sort((a, b) => b.RQty - a.RQty);

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
function showModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


window.onload = function() {
    showModal();
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


let chart3 = document.getElementById('sold_based_on_machine');
if (chart3) {
    if (chart3.chartInstance) {
        chart3.chartInstance.destroy();
    }
    chart3.chartInstance = new Chart(chart3, {
        type: 'pie',
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
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        let datasets = ctx.chart.data.datasets;
                        let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                        let percentage = Math.round((value / sum) * 100) + '%';
                        return percentage;
                    },
                    color: '#fff', // Warna font
                    font: {
                        size: 14, // Ukuran font
                        weight: 'bold' // Berat font
                    },
                    padding: 6, // Jarak antara label dan elemen
                    anchor: 'end', // Menyandarkan label di ujung
                    align: 'start', // Mengatur perataan label
                    offset: 10 // Jarak label dari pusat pie
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

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
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        let datasets = ctx.chart.data.datasets;
                        let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                        let percentage = Math.round((value / sum) * 100) + '%';
                        return percentage;
                    },
                    color: '#fff',
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

    
    const locations = [...new Set(locSalesByCategory.map(item => item.Location))];
    const categories = [...new Set(locSalesByCategory.map(item => item.Category))];

    const structuredData = {};
    locations.forEach(location => {
        structuredData[location] = { 'Food': 0, 'Carbonated': 0, 'Non Carbonated': 0, 'Water': 0 };
    });

    locSalesByCategory.forEach(item => {
        structuredData[item.Location][item.Category] = item.LineTotal;
    });

    const dataFood = locations.map(location => structuredData[location]['Food']);
    const dataCarbonated = locations.map(location => structuredData[location]['Carbonated']);
    const dataNonCarbonated = locations.map(location => structuredData[location]['Non Carbonated']);
    const dataWater = locations.map(location => structuredData[location]['Water']);

    let chart5 = document.getElementById('based_on_Category');
    if (chart5) {
        if(chart5.chartInstance) {
            chart5.chartInstance.destroy();
        }
        chart5.chartInstance = new Chart(chart5, {
            type: 'bar',
        data: {
            labels: locations,
            datasets: [
                {
                    label: 'Food',
                    data: dataFood,
                    backgroundColor: 'rgba(140, 117, 233, 0.5)',
                    borderColor: 'rgba(140, 117, 233, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Carbonated',
                    data: dataCarbonated,
                    backgroundColor: 'rgb(140,117,233)',
                    borderColor: 'rgba(117, 233, 140, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Non Carbonated',
                    data: dataNonCarbonated,
                    backgroundColor: 'rgb(234,162,76)',
                    borderColor: 'rgba(117, 233, 140, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Water',
                    data: dataWater,
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

    let cashData = dataTypeRQtyWithRQTySum.filter(row => row.Type === 'Cash');
    let creditData = dataTypeRQtyWithRQTySum.filter(row => row.Type === 'Credit');
    
    let labels = [...new Set(dataTypeRQtyWithRQTySum.map(row => row.RQty))].sort((a, b) => a - b);
    
    // Hitung total untuk setiap RQty
    let totalSums = labels.map(label => {
        let cashEntry = cashData.find(row => row.RQty === label);
        let creditEntry = creditData.find(row => row.RQty === label);
        let cashSum = cashEntry ? cashEntry.Sum : 0;
        let creditSum = creditEntry ? creditEntry.Sum : 0;
        return cashSum + creditSum;
    });
    
    // Konversi nilai ke persentase
    let cashPercentages = labels.map((label, index) => {
        let cashEntry = cashData.find(row => row.RQty === label);
        return cashEntry ? (cashEntry.Sum / totalSums[index]) * 100 : 0;
    });
    
    let creditPercentages = labels.map((label, index) => {
        let creditEntry = creditData.find(row => row.RQty === label);
        return creditEntry ? (creditEntry.Sum / totalSums[index]) * 100 : 0;
    });
    
    let chart6 = document.getElementById('Payment_vs_Purchased');
    if (chart6) {
        if (chart6.chartInstance) {
            chart6.chartInstance.destroy();
        }
        chart6.chartInstance = new Chart(chart6, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Cash',
                        data: cashPercentages,
                        backgroundColor: 'rgba(140,117,233, 0.5)',
                        borderWidth: 1
                    },
                    {
                        label: 'Credit',
                        data: creditPercentages,
                        backgroundColor: 'rgba(233,117,140, 0.5)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'x',
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        stacked: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            footer: (tooltipItems) => {
                                let total = tooltipItems.reduce((acc, tooltipItem) => {
                                    return acc + tooltipItem.raw;
                                }, 0);
                                return 'Total: ' + total.toFixed(2) + '%';
                            }
                        }
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            return value.toFixed(2) + '%';
                        },
                        color: '#fff',
                        display: 'auto'
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
                labels: dataRPrice.map(row => row.RPrice),
                datasets: [{
                    label: 'RQty',
                    data: dataRPrice.map(row => row.RQty),
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

    dataTable(dataGet);

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
    getDataRPrice(dataGetFilter);
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
        getDataRPrice(dataGetFilter);
        visualization();

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
        getDataRPrice(dataGetFilter);
        visualization();

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
        getDataRPrice(dataGetFilter);
        visualization();

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
        getDataRPrice(dataGetFilter);
        visualization();

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
        getDataRPrice(dataGetFilter);
        visualization();

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
        getDataRPrice(dataGetFilter);
        visualization();

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
        getDataRPrice(dataGetFilter);
        visualization();

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
        getDataRPrice(dataGetFilter);
        visualization();

    }



}

