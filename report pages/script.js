fetch("data1.json")     //fetch data from data/json file/first it returns data as response object.
.then(res=>res.json())    //it converts in to javascript object. 
.then(data=>{           //get data and store in one vriable that is (data).

const tbody=document.querySelector("tbody");  //select tbody that is tablebody later we insert all the rows inside it.

const total=document.getElementById("grandTotal"); //select grand total.

let users=0;     //this all variable stores totals.

let started=0;

let notStarted=0;

let ag=0;

let groups=0;

data.forEach((item,index)=>{         //loop through every record in the JSON data

users+=item.users;       //this will keep increasing(update) if we add any users or other data.

started+=item.started;

notStarted+=item.notStarted;

ag+=item.ag;

groups+=item.groups;

let color="green"; //default color.

if(item.percentage<90) color="orange";

if(item.percentage<80) color="red";

tbody.innerHTML+=`    

<tr>

<td>${index+1}</td>

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

let percent=((started/users)*100).toFixed(1);   //calculating total percentage and fixing it to 1 decimal point.

total.innerHTML=`

<td colspan="2">Grand Total</td>

<td>${users}</td>

<td>${started}</td>

<td>${notStarted}</td>

<td>${percent}%</td>

<td>${ag}</td>

<td>${groups}</td>

`;

});