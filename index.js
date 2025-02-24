document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    { question: "click on Burlett Bakery", lat: 2684, lng: 1546 },//1
    { question: "click on Onion Park", lat: 2417, lng: 1851 },//2
    { question: "click on Cheap Storage", lat: 2824, lng: 1065 },//3
    { question: "click on Laydon Papers", lat: 2854, lng: 2388 },//4
    { question: "click on Central Storage", lat: 2270, lng: 2656 },//5
    
    { question: "click on Howl Cemetary", lat: 3129, lng: 2941 },//6
    { question: "click on Locker B", lat: 2548, lng: 3255 },//7
    { question: "click on 24/7 Juicery", lat: 2051, lng: 1051 },//8
    { question: "click on Quartin Heights", lat: 2707, lng: 254 },//9
    { question: "click on Big Oil Theatre", lat: 3228, lng: 576 },//10
    { question: "click on Savage Sin Inc", lat: 3215, lng: 287 },//11
    { question: "click on City Hall", lat: 2953, lng: 3873 },//12
    { question: "click on Uncle Pepper", lat: 3805, lng: 2295 },//13
    { question: "click on Efran Meats", lat: 3825, lng: 1288 },//14
    { question: "click on Onion Academy", lat: 3813, lng: 41 },//15
    { question: "click on Dyanna Law", lat: 2166, lng: 3707 },//16
    { question: "click on Kylar Projects", lat: 1344, lng: 201 },//17
    { question: "click on Big Machines", lat: 1338, lng: 713 },//18
    { question: "click on The Clumps", lat: 1244, lng: 1311 },//19
    { question: "click on Slime Factory", lat: 1171, lng: 2034 },//20
    { question: "click on Slime Refinery", lat: 1293, lng: 2517 },//21
    { question: "click on Tetra Park", lat: 125, lng: 3735 },//22
    { question: "click on Neptude Parking", lat: 60, lng: 1402 },//23
    { question: "click on Enforce HQ", lat: 37, lng: 2046 },//24
    { question: "click on Jurli's", lat: 860, lng: 3264 },//25
    
  ];
//SHUFFLE
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
shuffle(questions);
//SHUFFLE

  var addedMarker = false;
  var marker;
  var gotItWrongYet = 0;
  var correctCount = 0;

  let currentQuestionIndex = 0;

  var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -3
});
/*
  L.tileLayer("https://i.imgur.com/lobqiph.jpeg", {
    maxZoom: 200,
    minZoom: 0,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
*/

var bounds = [[0,0], [4098,4099]];
var image = L.imageOverlay('https://imagizer.imageshack.com/img922/9840/UnBkFW.png', bounds).addTo(map);
map.fitBounds(bounds);

  const questionElement = document.getElementById("question");
  const nextButton = document.getElementById("next-question");

  function loadQuestion() {
    
    gotItWrongYet = 0;
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  }

  function showCorrectLocation(lat, lng) {
    if(addedMarker == true){
      map.removeLayer(marker);
      addedMarker = false;
    }
    addedMarker = true;
    marker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: "correct-location",
        html: '<div style="background: green; width: 19px; height: 19px; border-radius: 50%;"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
    }).addTo(map);
    /*
    setTimeout(() => {
      map.removeLayer(marker);
    }, 12000);
    */
  }

  function checkAnswer(e) {
    const currentQuestion = questions[currentQuestionIndex];
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    const distance = map.distance(
      [lat, lng],
      [currentQuestion.lat, currentQuestion.lng]
    );

    if (distance < 65) {
      if(gotItWrongYet == 0){//increase correct count and mark that we got it right first
        correctCount++;
        gotItWrongYet = 2;
      }
      alert("Correct!");
      
    } else {
      gotItWrongYet = 1;
      alert("Incorrect! The correct location will be shown.");
      showCorrectLocation(currentQuestion.lat, currentQuestion.lng);
    }

    //currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    currentQuestionIndex = (currentQuestionIndex + 1);
    if(currentQuestionIndex == questions.length){//check if all questions are done
      alert("all done. You got " + correctCount + " out of " + questions.length + " correct");
    }
    else{
      loadQuestion();
    }
  }


  map.on("click", checkAnswer);

  nextButton.addEventListener("click", () => {
    
    gotItWrongYet = 0;//reset did we get it wrong state
    //currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    currentQuestionIndex = (currentQuestionIndex + 1);
    if(currentQuestionIndex == questions.length){//check if all questions are done
      alert("all done");
    }
    else{
      loadQuestion();
    }
  });
  

  loadQuestion();
});
//bottom left is 0,0 coordinates are y,x
//image is 
//x4099
//y4098
//var gotItWrongYet 0 = not wrong or right yet. 1 = got it wrong first. 2 = got it right first