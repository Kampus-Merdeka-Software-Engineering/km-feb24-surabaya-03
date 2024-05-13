var xhr = new XMLHttpRequest();
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
xhr.open('GET', 'json/alldata_vm.json', true);

xhr.send();

xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);

        data.forEach(item => {

            if(item.Location){
                let extLoc = lct.find(l => (l.Location === item.Location) && (l.Category === item.Category) && (l.TransDate === item.TransDate) );
    
                if(extLoc){
                    extLoc.Total_Qty = parseInt(extLoc.Total_Qty) + parseInt(item.RQty);
                }
                else{
                    lct.push({Location: item.Location, Total_Qty: parseInt(item.RQty), Category: item.Category, TransDate: item.TransDate});
                }
            }

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
        })

        let lctRequestAll = [];
        let ctgRequestAll = [];
        let typeRequestAll = [];

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

        lt.forEach(j => {
            let extType = typeRequestAll.find(l => (l.Type === j.Type) );
            if(extType){
                extType.LineTotal += parseFloat(j.LineTotal);
            }
            else{
                typeRequestAll.push({Type: j.Type, LineTotal: parseFloat(j.LineTotal)})
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

            console.log(dropdownChoose);
            console.log(lct);

            if(lctChoosed === '' && ctgChoosed === ''){
                let lctRequestAll = [];
                let ctgRequestAll = [];
                let typeRequestAll = [];
        
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
        
                lt.forEach(j => {
                    let extType = typeRequestAll.find(l => (l.Type === j.Type) );
                    if(extType){
                        extType.LineTotal += parseFloat(j.LineTotal);
                    }
                    else{
                        typeRequestAll.push({Type: j.Type, LineTotal: parseFloat(j.LineTotal)})
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
        
            }
            else if(lctChoosed === ''){
                let lctRequest = [];
                let typeRequest = [];

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
                console.log(lctRequest)
        
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

            }
            else if(ctgChoosed === ''){
                let lctRequest = [];
                let ctgRequest = [];
                let typeRequest = [];

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

            }

        }

        

    }
}