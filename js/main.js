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
 
    //sorting the dates in the array using a compare function 
    provData.sort(function(a, b){
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    });

    valuesArr();
    console.log(provData);

    let provLength = provData.length;
    console.log("this is the provLength " + provLength);

    let lastDate = provData[provLength-1];
    console.log("this is the lastDate " + lastDate);

    //the following 2 statements allow us to display the daily and total count of cases in the html 
    document.getElementById('dailycountnum').innerHTML =  lastDate.numtoday;

    document.getElementById('totalcountnum').innerHTML = lastDate.numtotal;

    return provSelected;
}

function valuesArr(){
    
    //calculates the ms 
    const MS_PER_DAY = 24 * 60 * 60 * 1000; //ms

    //values array stores all daily cases since 2020-01-31
    let firstTime = new Date(provData[0].date).getTime();

    let values = [];

    //here we populate values array with all daily cases
    for(let e of provData){

        let currTime = new Date(e.date).getTime();

        let index = (currTime-firstTime) / MS_PER_DAY;

        if(values[index] === typeof(undefined)){
            values[index] = 0;
        } 

        values[index] = e.numtoday;
    }


    //dates array stores all date strings since 2020-01-31
    let firstDate = new Date(provData[0].date);

    let dates = [];

    //here we populate the dates array with all the string dates 
    for(let d of provData){
        let currDate = new Date(d.date);

        let dateIndex = (currDate - firstDate) / MS_PER_DAY;

        dates[dateIndex] = d.date;
    }


    //totals array stores the total number of cases since 2020-01-31
    let totalTime = new Date(provData[0].date).getTime();

    let totals = [];

    for (let t of provData){

        let currTime = new Date(t.date).getTime();

        let totalIndex = (currTime-totalTime) / MS_PER_DAY;

        totals[totalIndex] = t.numtotal;

    }

    console.log("this is the values array " + values);

    console.log("these are the dates " + dates);

    console.log("these are the total values " + totals);
}


// function updateValues(order){
//     log(order);

//     let html = "";

//     go.json.forEach((e, i) => {



//     })
// }
// const ctx= document.getElementById('chart1').getContext('2d');

// const chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['red', 'green', 'build'],
//         datasets: [{
//             label: '#of votes',
//             data: [12, 19, 3],
//             backgroundColor: [
//                 'red',
//                 'green',
//                 'blue'
//             ],
//             borderColor: [
//                 'red',
//                 'green',
//                 'blue'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
