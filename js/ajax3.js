fetch("../json/alldata_vm.json")
    .then(response => response.json())
    .then(data => {
        test(data);
        $('#example').DataTable(); // Inisialisasi DataTables setelah data dimuat
    });

let dataGet = [];
function test(data){
    data.forEach(item => {
        dataGet.push({
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

    for(let i = 0; i < dataGet.length; i++) {
        dataList += `<tr>
            <td>${dataGet[i].Transaction}</td>
            <td>${dataGet[i].Product}</td>
            <td>${dataGet[i].Machine}</td>
            <td>${dataGet[i].Location}</td>
            <td>${dataGet[i].Category}</td>
            <td>${dataGet[i].RQty}</td>
            <td>${dataGet[i].LineTotal}</td>
            <td>${dataGet[i].Type}</td>
            <td>${dataGet[i].TransDate}</td>
        </tr>`;
    }

    document.getElementById('dataPlace').innerHTML = dataList;
}
