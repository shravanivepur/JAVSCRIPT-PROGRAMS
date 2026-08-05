fetch("data.json")
.then(res => res.json())
.then(data => {

    // Select HTML elements
    const tbody = document.querySelector("tbody");
    const total = document.getElementById("grandTotal");
    const exportBtn = document.getElementById("exportBtn");
    const searchInput = document.getElementById("searchDistrict");

    // Variables
    let users = 0;
    let started = 0;
    let notStarted = 0;
    let ag = 0;
    let groups = 0;

    // Calculate grand totals
    data.forEach(item => {
        users += item.users;
        started += item.started;
        notStarted += item.notStarted;
        ag += item.ag;
        groups += item.groups;
    });

    // Function to display table
    function displayTable(filteredData) {

        tbody.innerHTML = "";

        filteredData.forEach((item, index) => {

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
                </tr>
            `;
        });

        // Optional: Show message if no district found
        if (filteredData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center;color:red;font-weight:bold;">
                        No District Found
                    </td>
                </tr>
            `;
        }
    }

    // Display all data initially
    displayTable(data);

    // Search District
    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const filteredData = data.filter(item =>
            item.district.toLowerCase().includes(keyword)
        );

        displayTable(filteredData);
    });

    // Grand percentage
    const percent = ((started / users) * 100).toFixed(1);

    let totalColor = "green";

    if (percent < 90)
        totalColor = "orange";

    if (percent < 80)
        totalColor = "red";

    // Footer
    total.innerHTML = `
        <td colspan="2"><b>Grand Total</b></td>
        <td>${users}</td>
        <td>${started}</td>
        <td>${notStarted}</td>
        <td class="${totalColor}">${percent}%</td>
        <td>${ag}</td>
        <td>${groups}</td>
    `;

    // Export to Excel
    exportBtn.addEventListener("click", () => {

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