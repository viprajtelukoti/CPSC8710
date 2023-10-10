
onStart();


var cityData = [];
var questions = [];
var currentQuestion;
var score = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// function addCity(cityName){
//     var cityoption = document.createElement("option");
//     cityoption.value = cityName;
//     document.getElementById("citynamedata").appendChild(cityoption);
// }

function getRandomNoDuplicate(arr){
    let num = getRandomInt(questions.length);
    while(arr.indexOf(num) != -1){
        num = getRandomInt(questions.length);
    }
    return num;
}

function addFourChoices() {
    let answerCitiesIndices = [cityData.indexOf(currentQuestion.answer)];

    answerCitiesIndices[1] = getRandomInt(cityData.length);
    answerCitiesIndices[2] = getRandomInt(cityData.length);
    answerCitiesIndices[3] = getRandomInt(cityData.length);

    let ind1 = getRandomInt(answerCitiesIndices.length-1);
    let ans1 = cityData[answerCitiesIndices[ind1]];
    answerCitiesIndices.splice(ind1, 1);

    let ind2 = getRandomInt(answerCitiesIndices.length-1);
    let ans2 = cityData[answerCitiesIndices[ind2]];
    answerCitiesIndices.splice(ind2, 1);

    let ind3 = getRandomInt(answerCitiesIndices.length-1);
    let ans3 = cityData[answerCitiesIndices[ind3]];
    answerCitiesIndices.splice(ind3, 1);

    let ind4 = getRandomInt(answerCitiesIndices.length-1);
    let ans4 = cityData[answerCitiesIndices[ind4]];
    answerCitiesIndices.splice(ind4, 1);

    document.getElementById("answerPart").innerHTML = `
            <input type="submit" value="${ans1}" onclick="submitClick(this)">
            <input type="submit" value="${ans2}" onclick="submitClick(this)">
            <input type="submit" value="${ans3}" onclick="submitClick(this)">
            <input type="submit" value="${ans4}" onclick="submitClick(this)">
    `;
}


function parseCities(){
    var temp = [];
    cityData = String(cityData).split('\n'); 
    for(var i = 1; i < cityData.length; i++){
        var city = cityData[i].split(',')[0].trim();
        temp.push(city.slice(1, city.length-2));
        // addCity(city.slice(1, city.length-2));
    }
    cityData = temp;
}

function loadRandomQuestion(){
    currentQuestion = questions[getRandomInt(questions.length)];
    // console.log(questions);
    document.getElementById("questionPrompt").innerHTML = currentQuestion.text;
    addFourChoices();
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

function submitClick(answer){
    console.log(`Testing submit ${answer}`);
    score += 10;

    loadRandomQuestion();
}
