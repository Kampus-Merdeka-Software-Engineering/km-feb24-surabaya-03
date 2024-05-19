var title = document.getElementById('tempat');
let lct = [];
let ctg = [];
let lt = [];
let prd = [];
let revenue = 0;
let machine = [];
let cat_proc = [];
let sum_proc = [];
let transaction = [];
let qty_sold = 0;

var dropdownChoose = [{Location: '', Category: ''}];

// let machineSum = 0;
// xhr.open('GET', 'json/alldata_vm.json', true);

// xhr.send();

// xhr.onreadystatechange = function() {
//     if(this.readyState == 4 && this.status == 200) {
//         var data = JSON.parse(this.responseText);

fetch("../json/alldata_vm.json").then(response => response.json()).then(data => test(data));

function test(data){

        data.forEach(item => {

            revenue = revenue + parseFloat(item.LineTotal);

            if(item.Location){
                let extLoc = lct.find(l => (l.Location === item.Location) && (l.Category === item.Category) && (l.TransDate === item.TransDate) );
    
                if(extLoc){
                    extLoc.Total_Qty = parseInt(extLoc.Total_Qty) + parseInt(item.RQty);
                }
                else{
                    lct.push({Location: item.Location, Total_Qty: parseInt(item.RQty), Category: item.Category, TransDate: item.TransDate});
                }
            }

            if(item.Machine){
                let extMachine = machine.find(m => (m.Machine === item.Machine) && (m.Location === item.Location) && (m.Category === item.Category) && (m.Trans_Month === item.Trans_Month));

                if(extMachine){
                    extMachine.Machine = item.Machine;
                }
                else{
                    machine.push({Machine: item.Machine, Location: item.Location, Category: item.Category, Trans_Month: item.Trans_Month});
                }
            }


            // Tambah item.Machine

            if(item.Category){
                let extCtg = ctg.find(c => (c.Category === item.Category) && (c.TransDate === item.TransDate) && (c.Location === item.Location));

                if(extCtg){
                    extCtg.Category = item.Category;
                }
                else{
                    ctg.push({Category: item.Category, Location: item.Location, TransDate: item.TransDate});
                }
            }

            if(item.Type){
                let extType = lt.find(l => (l.Type === item.Type) && (l.Location === item.Location) && (l.Category === item.Category) && (l.TransDate === item.TransDate) );

                if(extType){
                    extType.LineTotal = parseFloat(extType.LineTotal) + parseFloat(item.LineTotal);
                }
                else{
                    lt.push({Type: item.Type, LineTotal: parseFloat(item.LineTotal), Location: item.Location, Category: item.Category, TransDate: item.TransDate});
                }
            }   
            
            if(item.Product){
                let extPrd = prd.find(l => (l.Product === item.Product) && (l.Location === item.Location) && (l.Category === item.Category) && (l.TransDate === item.TransDate));

                if(extPrd){
                    extPrd.RQty = parseInt(extPrd.RQty) + parseInt(item.RQty);
                }
                else{
                    prd.push({Product: item.Product, RQty: parseInt(item.RQty), Location: item.Location, Category: item.Category, TransDate: item.TransDate});
                }
            }

            if(item.Transaction){
                let extTrn = transaction.find(l => (l.Transaction === item.Transaction) && (l.Location === item.Location) && (l.Location === item.Category) && (l.TransMonth === item.TransMonth));
                if(extTrn){
                    extTrn.Transaction = item.Transaction;
                }
                else{
                    transaction.push({Transaction: item.Transaction, Location: item.Location, Category: item.Category, Trans_Month: item.Trans_Month});
                }
            }
        })

        let lctRequestAll = [];
        let ctgRequestAll = [];
        let typeRequestAll = [];
        let prdRequestAll = [];
        let mchRequestAll = [];
        let trnRequestAll = [];

        lct.forEach(i => {
            let extLoc = lctRequestAll.find(l => (l.Location === i.Location) );
            if(extLoc){
                extLoc.TotalQty += parseInt(i.Total_Qty);
            }
            else{
                lctRequestAll.push({Location: i.Location, TotalQty: parseInt(i.Total_Qty)})
            }
        })

        ctg.forEach(ct => {
            let extCtg = ctgRequestAll.find(d => (d.Category == ct.Category));
            if(extCtg){
                extCtg.Category = ct.Category;
            }
            else{
                ctgRequestAll.push({Category: ct.Category})
            }
        })

        totalCategory.innerHTML = `Total Kategori : ${ctgRequestAll.length}`

        lt.forEach(j => {
            let extType = typeRequestAll.find(l => (l.Type === j.Type) );
            if(extType){
                extType.LineTotal += parseFloat(j.LineTotal);
            }
            else{
                typeRequestAll.push({Type: j.Type, LineTotal: parseFloat(j.LineTotal)})
            }
        })

        prd.forEach(p => {
            let extPrd = prdRequestAll.find(l => (l.Product === p.Product) );
            if(extPrd){
                extPrd.RQty += parseInt(p.RQty);
            }
            else{
                prdRequestAll.push({Product: p.Product, RQty: parseInt(p.RQty)})
            }
        })

        
        machine.forEach(m => {
            let extMachine = mchRequestAll.find(mc => (mc.Machine === m.Machine));
            if(extMachine){
                extMachine.Machine = m.Machine;
            }
            else{
                mchRequestAll.push({Machine: m.Machine})
            }
        })

        transaction.forEach(tr => {
            let extTransaction = trnRequestAll.find(t => t.Transaction === tr.Transaction);
            if(extTransaction){
                extTransaction.Transaction = tr.Transaction;
            }
            else{
                trnRequestAll.push({Transaction: tr.Transaction})
            }
        })

        totalRevenue.innerHTML = 'Total revenue : $ ' + revenue
        totalMachine.innerHTML = 'Total machine: ' + mchRequestAll.length;
        totalProduct.innerHTML = `Total Product : ${prdRequestAll.length}`
        totalTransaction.innerHTML = `Total Transaction : ${trnRequestAll.length}`

        

        var headerContentTempatAll = ""
        var lctData = '<option value="">All Locations</option>'
        lctRequestAll.forEach(l => {
            headerContentTempatAll += '<tr>' + '<td>' + l.Location + '</td>' + '<td>' + l.TotalQty + '</td></tr>';
            lctData += '<option value="' + l.Location + '">' + l.Location + '</option>';
        })

        lctList.innerHTML = lctData;
        tempat.innerHTML = headerContentTempatAll;

        var ctgData = '<option value="">All Categories</option>'
        ctgRequestAll.forEach(c => {
            ctgData += '<option value="' + c.Category + '">' + c.Category + '</option>';
        })

        ctgList.innerHTML = ctgData;

        var headerContentPaymentAll = "";
        typeRequestAll.forEach(k => {
            headerContentPaymentAll += '<tr>' + '<td>' + k.Type + '</td>' + '<td>' + k.LineTotal + '</td></tr>';
        })

        paymentType.innerHTML = headerContentPaymentAll;

        var headerContentProductAll = "";
        prdRequestAll.forEach(p => {
            headerContentProductAll += '<tr>' + '<td>' + p.Product + '</td>' + '<td>' + p.RQty + '</td></tr>';
        })

        totalSales.innerHTML = headerContentProductAll;

        lctList.addEventListener('change', function () {
            dropdownChoose[0].Location = lctList.value;
            updateDataView();
        })
        ctgList.addEventListener('change', function () {
            dropdownChoose[0].Category = ctgList.value;
            updateDataView();
        })

        function updateDataView(){
            var lctChoosed = dropdownChoose[0].Location;
            var ctgChoosed = dropdownChoose[0].Category;

            // console.log(dropdownChoose);
            // console.log(lct);

            // Dropdown Lokasi dan Kategori kosong
            if(lctChoosed === '' && ctgChoosed === ''){
                let lctRequestAll = [];
                let ctgRequestAll = [];
                let typeRequestAll = [];
                let prdRequestAll = [];
                let trnRequestAll = [];
                revenue = 0;
        
                data.forEach(item => {
                    revenue = revenue + parseFloat(item.LineTotal);
                })
                totalRevenue.innerHTML = 'Total revenue : $ ' + revenue

                lct.forEach(i => {
                    let extLoc = lctRequestAll.find(l => (l.Location === i.Location) );
                    if(extLoc){
                        extLoc.TotalQty += parseInt(i.Total_Qty);
                    }
                    else{
                        lctRequestAll.push({Location: i.Location, TotalQty: parseInt(i.Total_Qty)})
                    }
                })
        
                ctg.forEach(ct => {
                    let extCtg = ctgRequestAll.find(d => (d.Category == ct.Category));
                    if(extCtg){
                        extCtg.Category = ct.Category;
                    }
                    else{
                        ctgRequestAll.push({Category: ct.Category})
                    }
                })

                totalCategory.innerHTML = `Total Kategori : ${ctgRequestAll.length}`

                lt.forEach(j => {
                    let extType = typeRequestAll.find(l => (l.Type === j.Type) );
                    if(extType){
                        extType.LineTotal += parseFloat(j.LineTotal);
                    }
                    else{
                        typeRequestAll.push({Type: j.Type, LineTotal: parseFloat(j.LineTotal)})
                    }
                })

                prd.forEach(p => {
                    let extPrd = prdRequestAll.find(l => (l.Product === p.Product) );
                    if(extPrd){
                        extPrd.RQty += parseInt(p.RQty);
                    }
                    else{
                        prdRequestAll.push({Product: p.Product, RQty: parseInt(p.RQty)})
                    }
                })

                machine.forEach(m => {
                    let extMachine = mchRequestAll.find(mc => (mc.Machine === m.Machine));
                    if(extMachine){
                        extMachine.Machine = m.Machine;
                    }
                    else{
                        mchRequestAll.push({Machine: m.Machine})
                    }
                })

                transaction.forEach(tr => {
                    let extTransaction = trnRequestAll.find(t => t.Transaction === tr.Transaction);
                    if(extTransaction){
                        extTransaction.Transaction = tr.Transaction;
                    }
                    else{
                        trnRequestAll.push({Transaction: tr.Transaction})
                    }
                })
        
                var headerContentTempatAll = ""
                var lctData = '<option value="">All Locations</option>'
                lctRequestAll.forEach(l => {
                    headerContentTempatAll += '<tr>' + '<td>' + l.Location + '</td>' + '<td>' + l.TotalQty + '</td></tr>';
                    lctData += '<option value="' + l.Location + '">' + l.Location + '</option>';
                })
        
                lctList.innerHTML = lctData;
                tempat.innerHTML = headerContentTempatAll;
        
                var ctgData = '<option value="">All Categories</option>'
                ctgRequestAll.forEach(c => {
                    ctgData += '<option value="' + c.Category + '">' + c.Category + '</option>';
                })
        
                ctgList.innerHTML = ctgData;
        
                var headerContentPaymentAll = "";
                typeRequestAll.forEach(k => {
                    headerContentPaymentAll += '<tr>' + '<td>' + k.Type + '</td>' + '<td>' + k.LineTotal + '</td></tr>';
                })
        
                paymentType.innerHTML = headerContentPaymentAll;
                
                var headerContentProductAll = "";
                prdRequestAll.forEach(p => {
                    headerContentProductAll += '<tr>' + '<td>' + p.Product + '</td>' + '<td>' + p.RQty + '</td></tr>';
                })
        
                totalSales.innerHTML = headerContentProductAll;
                totalMachine.innerHTML = 'Total machine: ' + mchRequestAll.length;
                totalProduct.innerHTML = `Total Product : ${prdRequestAll.length}`
                totalTransaction.innerHTML = `Total Transaction : ${trnRequestAll.length}`

            }

            // Dropdown Lokasi Kosong, tapi Kategorinya berisi
            else if(lctChoosed === ''){
                let lctRequest = [];
                let typeRequest = [];
                let prdRequest = [];
                let mchRequest = [];
                let ctgRequest = [];
                let trnRequest = [];
                revenue = 0;

                data.forEach(item => {
                    if(ctgChoosed === item.Category){
                        revenue = revenue + parseFloat(item.LineTotal);
                    }
                })
                totalRevenue.innerHTML = 'Total revenue : $ ' + revenue

                lct.forEach(i => {
                    let extLoc = lctRequest.find(l => (l.Location === i.Location));
                    if(extLoc){
                        if(i.Category === ctgChoosed){
                            extLoc.TotalQty += parseInt(i.Total_Qty);
                        }
                    }
                    else if(i.Category === ctgChoosed){
                        lctRequest.push({Location: i.Location, TotalQty: parseInt(i.Total_Qty)})
                    }
                })
        
                lt.forEach(j => {
                    let extType = typeRequest.find(l => (l.Type === j.Type) );
                    if(extType){
                        if(j.Category === ctgChoosed){
                            extType.LineTotal += parseFloat(j.LineTotal);
                        }
                    }
                    else if(j.Category === ctgChoosed){
                        typeRequest.push({Type: j.Type, LineTotal: parseFloat(j.LineTotal)})
                    }
                })

                prd.forEach(p => {
                    let extPrd = prdRequest.find(l => (l.Product === p.Product) );
                    if(extPrd){
                        if(p.Category === ctgChoosed){
                            extPrd.RQty += parseInt(p.RQty);
                        }
                    }
                    else if(p.Category === ctgChoosed){
                        prdRequest.push({Product: p.Product, RQty: parseInt(p.RQty)})
                    }
                })

                machine.forEach(m => {
                    let extMachine = mchRequest.find(mc => (mc.Machine === m.Machine));
                    if(extMachine){
                        if(m.Category === ctgChoosed){
                            extMachine.Machine = m.Machine;
                        }
                    }
                    else{
                        if(m.Category === ctgChoosed){
                            mchRequest.push({Machine: m.Machine})
                        }
                    }
                })

                ctg.forEach(ct => {
                    let extCtg = ctgRequest.find(d => (d.Category === ct.Category));
                    if(extCtg){
                        if(ct.Category === ctgChoosed){
                            extCtg.Category = ct.Category;
                        }
                    }
                    else if(ct.Category === ctgChoosed){
                        ctgRequest.push({Category: ct.Category})
                    }
                })

                transaction.forEach(tr => {
                    let extTransaction = trnRequest.find(t => t.Transaction === tr.Transaction);
                    if(extTransaction){
                        if(tr.Category === ctgChoosed){
                            extTransaction.Transaction = tr.Transaction;
                        }
                    }
                    else if(tr.Category === ctgChoosed){
                        trnRequest.push({Transaction: tr.Transaction})
                    }
                })

                totalCategory.innerHTML = `Total Kategori : ${ctgRequest.length}`
                totalProduct.innerHTML = `Total Product : ${prdRequest.length}`
                totalTransaction.innerHTML = `Total Transaction : ${trnRequest.length}`

                
        
                var headerContentTempat = ""
                var lctData = '<option value="">All Locations</option>'
                lctRequest.forEach(l => {
                    headerContentTempat += '<tr>' + '<td>' + l.Location + '</td>' + '<td>' + l.TotalQty + '</td></tr>';
                    lctData += '<option value="' + l.Location + '">' + l.Location + '</option>';
                })
        
                lctList.innerHTML = lctData;
                tempat.innerHTML = headerContentTempat;
        
                var headerContentPayment = "";
                typeRequest.forEach(k => {
                    headerContentPayment += '<tr>' + '<td>' + k.Type + '</td>' + '<td>' + k.LineTotal + '</td></tr>';
                })
        
                paymentType.innerHTML = headerContentPayment;

                var headerContentProduct = "";
                prdRequest.forEach(p => {
                    headerContentProduct += '<tr>' + '<td>' + p.Product + '</td>' + '<td>' + p.RQty + '</td></tr>';
                })

                totalSales.innerHTML = headerContentProduct;
                totalMachine.innerHTML = 'Total machine: ' + mchRequest.length;

            }

            // Dropdown kategorinya kosong, tapi locationnya berisi
            else if(ctgChoosed === ''){
                let lctRequest = [];
                let ctgRequest = [];
                let typeRequest = [];
                let prdRequest = [];
                let mchRequest = [];
                let trnRequest = [];
                revenue = 0;

                data.forEach(item => {
                    if(lctChoosed === item.Location){
                        revenue = revenue + parseFloat(item.LineTotal);
                    }
                })
                totalRevenue.innerHTML = 'Total revenue : $ ' + revenue

                lct.forEach(i => {
                    let extLoc = lctRequest.find(l => (l.Location === i.Location));
                    if(extLoc){
                        if(i.Location === lctChoosed){
                            extLoc.TotalQty += parseInt(i.Total_Qty);
                        }
                    }
                    else if(i.Location === lctChoosed){
                        lctRequest.push({Location: i.Location, TotalQty: parseInt(i.Total_Qty)})
                    }
                })
                console.log(lctRequest)
        
                ctg.forEach(ct => {
                    let extCtg = ctgRequest.find(d => (d.Category === ct.Category));
                    if(extCtg){
                        if(ct.Location === lctChoosed){
                            extCtg.Category = ct.Category;
                        }
                    }
                    else if(ct.Location === lctChoosed){
                        ctgRequest.push({Category: ct.Category})
                    }
                })
                totalCategory.innerHTML = `Total Kategori : ${ctgRequest.length}`


                lt.forEach(j => {
                    let extType = typeRequest.find(l => (l.Type === j.Type) );
                    if(extType){
                        if(j.Location === lctChoosed){
                            extType.LineTotal += parseFloat(j.LineTotal);
                        }
                    }
                    else if(j.Location === lctChoosed){
                        typeRequest.push({Type: j.Type, LineTotal: parseFloat(j.LineTotal)})
                    }
                })

                prd.forEach(p => {
                    let extPrd = prdRequest.find(l => (l.Product === p.Product) );
                    if(extPrd){
                        if(p.Location === lctChoosed){
                            extPrd.RQty += parseInt(p.RQty);
                        }
                    }
                    else if(p.Location === lctChoosed){
                        prdRequest.push({Product: p.Product, RQty: parseInt(p.RQty)})
                    }
                })

                machine.forEach(m => {
                    let extMachine = mchRequest.find(mc => (mc.Machine === m.Machine));
                    if(extMachine){
                        if(m.Location === lctChoosed){
                            extMachine.Machine = m.Machine;
                        }
                    }
                    else{
                        if(m.Location === lctChoosed){
                            mchRequest.push({Machine: m.Machine})
                        }
                    }
                })

                transaction.forEach(tr => {
                    let extTransaction = trnRequest.find(t => t.Transaction === tr.Transaction);
                    if(extTransaction){
                        if(tr.Location === lctChoosed){
                            extTransaction.Transaction = tr.Transaction;
                        }
                    }
                    else if(tr.Location === lctChoosed){
                        trnRequest.push({Transaction: tr.Transaction})
                    }
                })
                
                var headerContentTempat = ""
                lctRequest.forEach(l => {
                    headerContentTempat += '<tr>' + '<td>' + l.Location + '</td>' + '<td>' + l.TotalQty + '</td></tr>';
                })
        
                tempat.innerHTML = headerContentTempat;

                var ctgData = '<option value="">All Categories</option>'
                ctgRequest.forEach(c => {
                    ctgData += '<option value="' + c.Category + '">' + c.Category + '</option>';
                })
        
                ctgList.innerHTML = ctgData;
        
                var headerContentPayment = "";
                typeRequest.forEach(k => {
                    headerContentPayment += '<tr>' + '<td>' + k.Type + '</td>' + '<td>' + k.LineTotal + '</td></tr>';
                })
        
                paymentType.innerHTML = headerContentPayment;

                var headerContentProduct = "";
                prdRequest.forEach(p => {
                    headerContentProduct += '<tr>' + '<td>' + p.Product + '</td>' + '<td>' + p.RQty + '</td></tr>';
                })

                totalSales.innerHTML = headerContentProduct;
                totalMachine.innerHTML = 'Total machine: ' + mchRequest.length;
                totalProduct.innerHTML = `Total Product : ${prdRequest.length}`
                totalTransaction.innerHTML = `Total Transaction : ${trnRequest.length}`
            }

            //Dropdown lokasi dan kategorinya berisi
            else{
                let lctRequest = [];
                let ctgRequest = [];
                let typeRequest = [];
                let prdRequest = [];
                let mchRequest = [];
                let trnRequest = [];
                revenue = 0;

                data.forEach(item => {
                    if((ctgChoosed === item.Category) && (lctChoosed === item.Location)){
                        revenue = revenue + parseFloat(item.LineTotal);
                    }
                })
                totalRevenue.innerHTML = 'Total revenue : $ ' + revenue

                lct.forEach(i => {
                    let extLoc = lctRequest.find(l => (l.Location === i.Location));
                    if(extLoc){
                        if((i.Location === lctChoosed) && (i.Category === ctgChoosed)){
                            extLoc.TotalQty += parseInt(i.Total_Qty);
                        }
                    }
                    else if((i.Location === lctChoosed) && (i.Category === ctgChoosed)){
                        lctRequest.push({Location: i.Location, TotalQty: parseInt(i.Total_Qty)})
                    }
                })

                ctg.forEach(ct => {
                    let extCtg = ctgRequest.find(d => (d.Category === ct.Category));
                    if(extCtg){
                        if((ct.Location === lctChoosed) && (ct.Category === ctgChoosed)){
                            extCtg.Category = ct.Category;
                        }
                    }
                    else if((ct.Location === lctChoosed) && (ct.Category === ctgChoosed)){
                        ctgRequest.push({Category: ct.Category})
                    }
                })

                totalCategory.innerHTML = `Total Kategori : ${ctgRequest.length}`
                lt.forEach(j => {
                    let extType = typeRequest.find(l => (l.Type === j.Type) );
                    if(extType){
                        if((j.Location === lctChoosed) && (j.Category === ctgChoosed)){
                            extType.LineTotal += parseFloat(j.LineTotal);
                        }
                    }
                    else if((j.Location === lctChoosed) && (j.Category === ctgChoosed)){
                        typeRequest.push({Type: j.Type, LineTotal: parseFloat(j.LineTotal)})
                    }
                })

                prd.forEach(p => {
                    let extPrd = prdRequest.find(l => (l.Product === p.Product) );
                    if(extPrd){
                        if((p.Location === lctChoosed) && (p.Category === ctgChoosed)){
                            extPrd.RQty += parseInt(p.RQty);
                        }
                    }
                    else if((p.Location === lctChoosed) && (p.Category === ctgChoosed)){
                        prdRequest.push({Product: p.Product, RQty: parseInt(p.RQty)})
                    }
                })

                machine.forEach(m => {
                    let extMachine = mchRequest.find(mc => (mc.Machine === m.Machine));
                    if(extMachine){
                        if((m.Location === lctChoosed) && (m.Category === ctgChoosed)){
                            extMachine.Machine = m.Machine;
                        }
                    }
                    else{
                        if((m.Location === lctChoosed) && (m.Category === ctgChoosed)){
                            mchRequest.push({Machine: m.Machine})
                        }
                    }
                })

                transaction.forEach(tr => {
                    let extTransaction = trnRequest.find(t => t.Transaction === tr.Transaction);
                    if(extTransaction){
                        if((tr.Location === lctChoosed) && (tr.Category === ctgChoosed)){
                            extTransaction.Transaction = tr.Transaction;
                        }
                    }
                    else if((tr.Location === lctChoosed) && (tr.Category === ctgChoosed)){
                        trnRequest.push({Transaction: tr.Transaction})
                    }
                })

                var headerContentTempat = ""
                lctRequest.forEach(l => {
                    headerContentTempat += '<tr>' + '<td>' + l.Location + '</td>' + '<td>' + l.TotalQty + '</td></tr>';
                })
        
                tempat.innerHTML = headerContentTempat;


        
                var headerContentPayment = "";
                typeRequest.forEach(k => {
                    headerContentPayment += '<tr>' + '<td>' + k.Type + '</td>' + '<td>' + k.LineTotal + '</td></tr>';
                })
        
                paymentType.innerHTML = headerContentPayment;

                var headerContentProduct = "";
                prdRequest.forEach(p => {
                    headerContentProduct += '<tr>' + '<td>' + p.Product + '</td>' + '<td>' + p.RQty + '</td></tr>';
                })

                totalSales.innerHTML = headerContentProduct;
                totalMachine.innerHTML = 'Total machine: ' + mchRequest.length;
                totalProduct.innerHTML = `Total Product : ${prdRequest.length}`
                totalTransaction.innerHTML = `Total Transaction : ${trnRequest.length}`
            }

        }

        

    }
// }