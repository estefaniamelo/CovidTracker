//global variable
let go = {};

var provinces = [];


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

function selectedProvince(prov){
    let provSelected = prov.target.value;

    log(provSelected);

    let provData = [];

    for(let i= 0; i < go.json.length; i++){
        if(go.json[i].prname == provSelected){
            provData.push(go.json[i]);
        }
    }

    console.log(provData);

    return provSelected;
}





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
