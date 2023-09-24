
onStart();

function addCity(cityName){
    var cityoption = document.createElement("option");
    cityoption.value = cityName;
    document.getElementById("citynamedata").appendChild(cityoption);
}

var cityData = "";

function parseCities(){
    var temp = [];
    cityData = String(cityData).split('\n'); 
    for(var i = 0; i < cityData.length; i++){
        var city = cityData[i].split(',')[0].trim();
        temp.push(city);
        addCity(city);
    }
    cityData = temp;
    console.log(temp);
}

function onStart(){
    
    fetch('worldcities.csv')
    .then(response => response.text())
    .then(text =>{
        cityData=text;
        parseCities();
    });

}
