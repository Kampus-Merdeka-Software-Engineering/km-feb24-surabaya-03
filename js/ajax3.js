fetch("../json/alldata_vm.json")
    .then(response => response.json())
    .then(data => {
        testDataTable(data);
        $('#example').DataTable(); // Inisialisasi DataTables setelah data dimuat
    });

let dataTableGet = [];
function testDataTable(data){
    data.forEach(item => {
        dataTableGet.push({
            Location: item.Location,
            Machine: item.Machine,
            Product: item.Product,
            Category: item.Category,
            Transaction: item.Transaction,
            Type: item.Type,
            RQty: item.RQty,
            LineTotal: item.LineTotal,
            TransDate: item.TransDate
        });
    });

    let dataList = '';

    for(let i = 0; i < dataTableGet.length; i++) {
        dataList += `<tr>
            <td>${dataTableGet[i].Transaction}</td>
            <td>${dataTableGet[i].Product}</td>
            <td>${dataTableGet[i].Machine}</td>
            <td>${dataTableGet[i].Location}</td>
            <td>${dataTableGet[i].Category}</td>
            <td>${dataTableGet[i].RQty}</td>
            <td>${dataTableGet[i].LineTotal}</td>
            <td>${dataTableGet[i].Type}</td>
            <td>${dataTableGet[i].TransDate}</td>
        </tr>`;
    }

    document.getElementById('dataPlace').innerHTML = dataList;
}
