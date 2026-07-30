
fetch("data.json")            //fetch is udes to load data from the file or a server.
.then(res => res.json())       //.then is the promise res.json convert the response object in to javascript object.
.then(data => {

    const tbody = document.querySelector("tbody");
    const total = document.getElementById("grandTotal");

    const exportBtn = document.getElementById("exportBtn");

    let currentPage = 1;
    const totalPages = 3;

    function loadPage(page) {       //whenever you call the function it loads new page.

        tbody.innerHTML = "";

        let users = 0;
        let started = 0;
        let notStarted = 0;
        let ag = 0;
        let groups = 0;

        let start, end;

        if (page === 1) {
            start = 0;
            end = 10;
        }
        else if (page === 2) {
            start = 10;
            end = 20;
        }
        else {
            start = 20;
            end = data.length; // Remaining 12 districts
        }

        const pageData = data.slice(start, end);  //get only page data if page as 1 to 10 data it should contaion only 1 to 10 data.

        pageData.forEach((item, index) => {        //loof through districts.

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
                    <td>${start + index + 1}</td>                           
                    <td>${item.district}</td>
                    <td>${item.users}</td>
                    <td>${item.started}</td>
                    <td>${item.notStarted}</td>
                    <td class="${color}">${item.percentage}%</td>
                    <td>${item.ag}</td>
                    <td>${item.groups}</td>
                </tr>

            `;
        });

        let percent = ((started / users) * 100).toFixed(1);

        total.innerHTML = `
            <td colspan="2"><b>Page Total</b></td>
            <td>${users}</td>
            <td>${started}</td>
            <td>${notStarted}</td>
            <td>${percent}%</td>
            <td>${ag}</td>
            <td>${groups}</td>
        `;

        document.getElementById("pageInfo").textContent =
            `Page ${page} of ${totalPages}`;

        document.getElementById("prevBtn").disabled = (page === 1);
        document.getElementById("nextBtn").disabled = (page === totalPages);
    }

    loadPage(currentPage);

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadPage(currentPage);
        }
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            loadPage(currentPage);
        }
    });
exportBtn.addEventListener("click", function () {

    const excelData = data.map((item, index) => ({
        "S.No": index + 1,
        "District Name": item.district,
        "Total VOA Users": item.users,
        "Total VOAs Started Registrations": item.started,
        "Total VOAs Not Started Registrations": item.notStarted,
        "% Started Using APP": item.percentage,
        "Total AG Registrations": item.ag,
        "Total Groups Created": item.groups
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "SNEHA Dashboard");

    XLSX.writeFile(workbook, "SNEHA_Dashboard_Report.xlsx");

});


});





        
