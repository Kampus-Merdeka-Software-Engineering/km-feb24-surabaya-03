var xhr = new XMLHttpRequest();
var title = document.getElementById('tempat');
let lct = [];
let lt = [];
let prd = [];
let revenue = 0;
let machine = [];
let cat_proc = [];
let sum_proc = [];
let transaction = [];
let qty_sold = 0;

let lctChoosed = '';
let ctgChoosed = [];

let guttenPlans = {
    "Food" : 2900,
    "Carbonated" : 3200,
    "Non Carbonated" : 877.5,
    "Water" : 0
}

xhr.open('GET', 'json/alldata_vm.json', true);

xhr.send();

// Menjumlahkan Qty Sold Based on Machine
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status==200){
        var data = JSON.parse(this.responseText);

        // Qty Sold based on Location
        data.forEach(item => {
            
            if(item.Location){
                if(lctChoosed == ''){
                    let extLoc = lct.find(l => l.Location === item.Location );

                    if(extLoc){
                        extLoc.Total_Qty = parseInt(extLoc.Total_Qty) + parseInt(item.RQty);
                    }
                    else{
                        lct.push({Location: item.Location, Total_Qty: parseInt(item.RQty)});
                    }
                }
                else{
                    update();
                }
            }

            if(item.Type){
                let extType = lt.find(l => l.Type === item.Type);

                if(extType){
                    extType.LineTotal = parseFloat(extType.LineTotal) + parseFloat(item.LineTotal);
                }
                else{
                    lt.push({Type: item.Type, LineTotal: parseFloat(item.LineTotal)});
                }
            }

            if(item.Product){
                let extPrd = prd.find(l => l.Product === item.Product);

                if(extPrd){
                    extPrd.RQty = parseInt(extPrd.RQty) + parseInt(item.RQty);
                }
                else{
                    prd.push({Product: item.Product, RQty: parseInt(item.RQty)});
                }
            }
            
        })

        
        var headerContentTempat = ""
        var lctData = '<option value="">All Locations</option>'
        for(var j=0; j < lct.length; j++){
            headerContentTempat += '<tr>' + '<td>' + lct[j].Location + '</td>' + '<td>' + lct[j].Total_Qty + '</td></tr>';
            lctData += '<option value="' + lct[j].Location + '">' + lct[j].Location + '</option>';
        }

        var lctList = document.getElementById('lctList');
        lctList.innerHTML = lctData;

        // console.log(lct)

        function update(){
            data.forEach(item => {
                let extLoc = lct.find(l => l.Location === lctChoosed);

                if(extLoc){
                    extLoc.Total_Qty = parseInt(extLoc.Total_Qty) + parseInt(item.RQty);
                }
                else{
                    lct.push({Location: lctChoosed, Total_Qty: parseInt(item.RQty)});
                }
            })

            var headerContentTempat = ""
            var lctData = '<option value="">All Locations</option>'


            lctList.addEventListener('change', function(){
                for(var j=0; j < lct.length; j++){
                    headerContentTempat += '<tr>' + '<td>' + lct[j].Location + '</td>' + '<td>' + lct[j].Total_Qty + '</td></tr>';
                    lctData += '<option value="' + lct[j].Location + '">' + lct[j].Location + '</option>';
                }
        
                var lctList = document.getElementById('lctList');
                lctList.innerHTML = lctData;

                // const selectedLct = lctList.value;
                // lctChoosed = selectedLct;
                // console.log(lctChoosed)
            })
        
            title.innerHTML = headerContentTempat;
            lctList.innerHTML = lctData;
        }

        var headerContentPayment = "";
        for(var k=0; k < lt.length; k++){
            headerContentPayment += '<tr><td>' + lt[k].Type + '</td>' + '<td>' + lt[k].LineTotal + '</td></tr>';
        }

        paymentType.innerHTML = headerContentPayment;

        var headerContentProduct = "";
        for(var l=0; l < prd.length; l++){
            headerContentProduct += '<tr><td>' + prd[l].Product + '</td>' + '<td>' + prd[l].RQty + '</td></tr>';
        }

        totalSales.innerHTML = headerContentProduct;

        //Revenue
        let machineSum = 0;
        let categorySum = 0;
        let productSum = 0;
        let transactionSum = 0;

        data.forEach(item => {
            revenue = revenue + parseFloat(item.LineTotal);
            qty_sold = qty_sold + parseInt(item.RQty);
            
            if(item.Transaction){
                let extTrn = transaction.find(l => l.Transaction === item.Transaction);
                if(extTrn){
                    extTrn.Transaction = item.Transaction;
                }
                else{
                    transaction.push({Transaction: item.Transaction});
                }
            }
            
            if(item.Machine){
                let extMch = machine.find(l => l.Machine === item.Machine);
                if(extMch){
                    extMch.Machine = item.Machine;
                }
                else{
                    machine.push({Machine: item.Machine});
                }
            } 


            if(item.Category){
                let extCtg = cat_proc.find(l => l.Category === item.Category);
                if(extCtg){
                    extCtg.Category = item.Category;
                }
                else{
                    cat_proc.push({Category: item.Category});
                }
            } 



        })

        var ctgData = '<option value="">All Category</option>'
        for(var m = 0; m < cat_proc.length; m++){
            ctgData += '<option value="' + cat_proc[m].Category + '">' + cat_proc[m].Category + '</option>';
        }

        var ctgList = document.getElementById('ctgList');
        ctgList.innerHTML = ctgData;
        ctgList.addEventListener('change', function(){
            const selectedCtg = ctgList.value;
            ctgChoosed.splice(0,1);
            ctgChoosed.push(selectedCtg);
            console.log(ctgChoosed)
        })

        transactionSum = transaction.length;
        machineSum = machine.length;
        categorySum = cat_proc.length;
        productSum = prd.length;

        totalRevenue.innerHTML = 'Total Revenue: $ ' + revenue
        totalMachine.innerHTML = 'Total Machine: '+ machineSum
        totalCategory.innerHTML = 'Total Category: '+ categorySum
        totalProduct.innerHTML = 'Total Product: '+ productSum
        totalTransaction.innerHTML = 'Total Transaction: '+ transactionSum
        totalQtySold.innerHTML = 'Total Qty Sold: '+ qty_sold;
        // console.log(productSum);




    }


};

// Menjumlahkan payment type