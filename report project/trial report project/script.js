
fetch("data.json")            //fetch is used to load data from the file or a server.
.then(res => res.json())       //.then is the promise res.json convert the response object in to javascript object.
.then(data => {

 //select html elements
    const tbody = document.querySelector("tbody");
    const total = document.getElementById("grandTotal");
    const exportBtn = document.getElementById("exportBtn");

  //variables.
        let users = 0;
        let started = 0;
        let notStarted = 0;
        let ag = 0;
        let groups = 0;
    
        //clear old rows before adding new one.
        tbody.innerHTML = "";

        //loop through every district.
        data.forEach((item, index) => {        //loop through districts.this rune once for every dist.

            users += item.users;             //example:0+722  722+442 etc.
            started += item.started;
            notStarted += item.notStarted;
            ag += item.ag;
            groups += item.groups;

            //color logic
            let color = "green";            //default color.

            if (item.percentage < 90)
                color = "orange";

            if (item.percentage < 80)
                color = "red";

            //adding rows 
            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>                           
                    <td>${item.district}</td>
                    <td>${item.users}</td>
                    <td>${item.started}</td>
                    <td>${item.notStarted}</td>
                    <td class="${color}">${item.percentage}%</td>
                    <td>${item.ag}</td>
                    <td>${item.groups}</td>
                </tr>`;
        });


        //grand percentage.
    const percent = ((started / users) * 100).toFixed(1);
    let totalColor = "green";

    if (percent < 90)
    totalColor = "orange";

if (percent < 80)
    totalColor = "red";
       
//footer
        total.innerHTML = `
            <td colspan="2"><b>Grand Total</b></td>
            <td>${users}</td>
            <td>${started}</td>
            <td>${notStarted}</td>
            <td class="${totalColor}">${percent}%</td>
            <td>${ag}</td>
            <td>${groups}</td>
        `;

       //export to excel
        exportBtn.addEventListener("click", ()=> {

        const excelData = data.map((item, index) => ({
            "S.No": index + 1,
            "District Name": item.district,
            "Total VOA Users": item.users,
            "Total VOAs Started Registrations": item.started,
            "Total VOAs Not Started Registrations": item.notStarted,
            "% Started Using APP": item.percentage + "%",
            "Total AG Registrations": item.ag,
            "Total Groups Created": item.groups
        }));

          //create worksheet.
        const worksheet = XLSX.utils.json_to_sheet(excelData);        //convert js in to excel sheet.
        const workbook = XLSX.utils.book_new();                    //create workbook.

        XLSX.utils.book_append_sheet(workbook, worksheet, "SNEHA Dashboard");  //add sheet.

        XLSX.writeFile(workbook, "SNEHA_Dashboard_Report.xlsx");       //download the sheet.
    });

});




        
