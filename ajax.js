var xhr = new XMLHttpRequest();
var title = document.getElementById('tempat');
let lct = [];
let lt = [];
let prd = [];
let revenue = 0;
let machine = [];
let cat_proc = [];
let sum_proc = [];
let transaction = 0;
let qty_sold = 0;

xhr.open('GET', 'vending_machine.json', true);

xhr.send();

// Menjumlahkan Qty Sold Based on Machine
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status==200){
        var data = JSON.parse(this.responseText);

        // Qty Sold based on Location
        data.forEach(item => {
            let extLoc = lct.find(l => l.Location === item.Location);

            if(extLoc){
                extLoc.Total_Qty = parseInt(extLoc.Total_Qty) + parseInt(item.RQty);
            }
            else{
                lct.push({Location: item.Location, Total_Qty: parseInt(item.RQty)});
            }
            
        })

        var headerContentTempat = ""
        for(var j=0; j < lct.length; j++){
            headerContentTempat += '<tr>' + '<td>' + lct[j].Location + '</td>' + '<td>' + lct[j].Total_Qty + '</td></tr>';
        }
    
        title.innerHTML = headerContentTempat;
        console.log(lct);

        // console.log(lct);

        // Payment Type
        data.forEach(item => {
            let extType = lt.find(l => l.Type === item.Type);

            if(extType){
                extType.LineTotal = parseFloat(extType.LineTotal) + parseFloat(item.LineTotal);
            }
            else{
                lt.push({Type: item.Type, LineTotal: parseFloat(item.LineTotal)});
            }
        })

        var headerContentPayment = "";
        for(var k=0; k < lt.length; k++){
            headerContentPayment += '<tr><td>' + lt[k].Type + '</td>' + '<td>' + lt[k].LineTotal + '</td></tr>';
        }

        paymentType.innerHTML = headerContentPayment;

        // console.log(lt);

        //Product Sales
        data.forEach(item => {
            let extPrd = prd.find(l => l.Product === item.Product);

            if(extPrd){
                extPrd.RQty = parseInt(extPrd.RQty) + parseInt(item.RQty);
            }
            else{
                prd.push({Product: item.Product, RQty: parseInt(item.RQty)});
            }
        })

        var headerContentProduct = "";
        for(var l=0; l < prd.length; l++){
            headerContentProduct += '<tr><td>' + prd[l].Product + '</td>' + '<td>' + prd[l].RQty + '</td></tr>';
        }

        totalSales.innerHTML = headerContentProduct;
        // console.log(prd)

        //Revenue
        let machineSum = 0;
        let categorySum = 0;
        let productSum = 0;

        data.forEach(item => {
            revenue = revenue + parseFloat(item.LineTotal);
            
            
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

        machineSum = machine.length;
        categorySum = cat_proc.length;
        productSum = prd.length;

        totalRevenue.innerHTML = 'Total Revenue: $ ' + revenue
        totalMachine.innerHTML = 'Total Machine: '+ machineSum
        totalCategory.innerHTML = 'Total Category: '+ categorySum
        totalProduct.innerHTML = 'Total Product: '+ productSum
        console.log(productSum);




    }


};

// Menjumlahkan payment type