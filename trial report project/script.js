
fetch("data.json")            //fetch is udes to load data from the file or a server.
.then(res => res.json())       //.then is the promise res.json convert the response object in to javascript object.
.then(data => {


    const tbody = document.querySelector("tbody");
    const total = document.getElementById("grandTotal");
    const exportBtn = document.getElementById("exportBtn");


        let users = 0;
        let started = 0;
        let notStarted = 0;
        let ag = 0;
        let groups = 0;

        tbody.innerHTML = "";

        
        data.forEach((item, index) => {        //loof through districts.

            users += item.users;
            started += item.started;
            notStarted += item.notStarted;
            ag += item.ag;
            groups += item.groups;

            let color = "green";

            if (item.percentage < 90)
                color = "orange";

            if (item.percentage < 80)
                color = "red";

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

        const percent = ((started / users) * 100).toFixed(1);

        total.innerHTML = `
            <td colspan="2"><b>Grand Total</b></td>
            <td>${users}</td>
            <td>${started}</td>
            <td>${notStarted}</td>
            <td>${percent}%</td>
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

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "SNEHA Dashboard");

        XLSX.writeFile(workbook, "SNEHA_Dashboard_Report.xlsx");
    });

});




        
