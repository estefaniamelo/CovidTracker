//global variable
let go = {};

var prname; //province name
var date; //date 
var numtotal; //total number of infections
var numtoday; //number of infections for selected date


$(document).ready(main);

function main(){
    log("page is loaded");

    //loads JSON asynchronously
    let option = {
        url: "http://ejd.songho.ca/ios/covid19_full.json",
        type: "GET",
        dataType: "json"
    }; 

    $.ajax(option).then(data =>{
        log("Success");
    
        go.json= data;

        //selectedProvince("provinces");

        }).catch( () => log("error to load JSON"));

    //$("option[value='canada']").prop("selected", true);
}


document.getElementById("provinces").onchange = selectedProvince;

function selectedProvince(prov){
    // let provOptions = document.getElementById("provinces").addEventListener("click", selectedProvince());

    let provSelected = prov.target.value;

    log(provSelected);
}