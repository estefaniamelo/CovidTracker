//global variables
let go = {};

$(document).ready(main);

function main(){
    log("page is loaded");

    //loads JSON asynchronously
    let option = {
        url: "http://ejd.songho.ca/ios/covid19.json",
        type: "GET",
        dataType: "json"
    }; 

    $.ajax(option).then(data =>{
        log("Successfully loaded JSON");
    
        go.json = data;


        }).catch( () => log("error loading JSON"));

    //$("option[value='canada']").prop("selected", true);
}


document.getElementById("provinces").onchange = selectedProvince;

var provData = [];

function selectedProvince(prov){
    let provSelected = prov.target.value;

    log(provSelected);

    provData = [];

    //here we create an array to store the dates for 
    //the province selected by the user
    for(let i= 0; i < go.json.length; i++){
        if(go.json[i].prname == provSelected){
            provData.push(go.json[i]);
        }
    }
 
    valuesArr();
    console.log(provData);

    let provLength = provData.length;
    console.log("this is the provLength " + provLength);

    let lastDate = provData[provLength-1];
    console.log("this is the lastDate " + lastDate);

    //the following 2 statements allow us to display the daily and total count of cases in the html 
    document.getElementById('dailycountnum').innerHTML =  lastDate.numtoday;

    document.getElementById('totalcountnum').innerHTML = lastDate.numtotal;

    populateValues();

    return provSelected;
}

function valuesArr(){
    
    //calculates the ms 
    const MS_PER_DAY = 24 * 60 * 60 * 1000; //ms

    //allocating values array with a given size and initiliazing it
    let time1 = new Date(provData[0].date).getTime();
    let time2 = new Date(provData[provData.length-1].date).getTime();

    let valueCount = (time2-time1) / MS_PER_DAY + 1;
    let values = new Array(valueCount).fill(0);

    //Allocating dates array with a given size and initiliazing it 
    let date1 = new Date(provData[0].date);
    let date2 = new Date(provData[provData.length-1].date);

    let dateCount = (date2-date1) / MS_PER_DAY + 1; 
    let dates = new Array(dateCount).fill("");

    //Allocating totals array with given size and initializing it 
    let total1 = new Date(provData[0].date).getTime();
    let total2 = new Date(provData[provData.length-1].date)

    let totalCount = (total2-total1) / MS_PER_DAY + 1;

    let totals = new Array(totalCount).fill(0);


    //values array stores all daily cases since 2020-01-31
    let firstTime = new Date(provData[0].date).getTime();

    //here we populate values array with all daily cases
    for(let e of provData){

        let currTime = new Date(e.date).getTime();

        let index = (currTime-firstTime) / MS_PER_DAY;

        values[index] = e.numtoday;
    }


    //dates array stores all date strings since 2020-01-31
    let firstDate = new Date(provData[0].date);

    //here we populate the dates array with all the string dates 
    for(let d of provData){
        let currDate = new Date(d.date);

        let dateIndex = (currDate - firstDate) / MS_PER_DAY;

        dates[dateIndex] = d.date;
    }


    //totals array stores the total number of cases since 2020-01-31
    let totalTime = new Date(provData[0].date).getTime();

    //here we populate the totals array which contains a count of total cases
    for (let t of provData){

        let currTime = new Date(t.date).getTime();

        let totalIndex = (currTime-totalTime) / MS_PER_DAY;

        totals[totalIndex] = t.numtotal;

    }

    console.log(dates);
}

function populateValues(){

    let html = "";

    //date, numtoday, numtotal, numtested(total), numtestedtoday, numdeathstoday, numdeaths(total)

    var length = provData.length;

    console.log(length);

    for(var i= provData.length-1; i >= 0; i--){

        html += "<tr>" +
                "<td>" + (provData[i].date) + "</td>" +
                "<td>" + (provData[i].numtoday) + "</td>" +
                "<td>" + (provData[i].numtotal) + "</td>" +
                "<td>" + (provData[i].numtested) + "</td>" +
                "<td>" + (provData[i].numtestedtoday) + "</td>" +
                "<td>" + (provData[i].numdeathstoday) + "</td>" +
                "<td>" + (provData[i].numdeaths) + "</td>" +
                "</tr>"

    }

    $("#tableBody").html(html);

    console.log("this is the populateValues length" + length);

    console.log(provData[0].numtoday);
}
