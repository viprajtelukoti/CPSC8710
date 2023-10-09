
onStart();



var cityData = "";
var questions = [];
var currentQuestion;
var score = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addCity(cityName){
    var cityoption = document.createElement("option");
    cityoption.value = cityName;
    document.getElementById("citynamedata").appendChild(cityoption);
}


function parseCities(){
    var temp = [];
    cityData = String(cityData).split('\n'); 
    for(var i = 1; i < cityData.length; i++){
        var city = cityData[i].split(',')[0].trim();
        temp.push(city.slice(1, city.length-2));
        addCity(city.slice(1, city.length-2));
    }
    cityData = temp;
}

function loadRandomQuestion(){
    currentQuestion = questions[getRandomInt(questions.length-1)];
    // console.log(questions);
    document.getElementById("questionPrompt").innerHTML = currentQuestion.text;
}


function onStart(){
    
    fetch('worldcities.csv')
    .then(response => response.text())
    .then(text =>{
        cityData=text;
        parseCities();
    });

    fetch('./prompts.json')
    .then((response) => response.json())
    .then(res => {
        questions = res.prompts;
        loadRandomQuestion();
    });

}

function submitClick(){
    console.log("Testing submit");
    score += 10;
    loadRandomQuestion();
}
