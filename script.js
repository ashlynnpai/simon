var count = 1;
var four = ["b1","b2","b3","b4"];
var state = "computer";
var sequence = [];
var playerCount = 0;
var mode = "normal";

var colors = {b1: ["#008000", "#3EDD4B", "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"], b2: ["#ff0000", "#E78177", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"], b3: ["#FFD700", "#FFF6AF", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"], b4: ["#5478E4", "#CBE5F8", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"]};

$("#start").click(function() {
  setup();
  computerTurn();
});

$("#strict").click(function() {
  if (mode == "normal") {
    mode = "strict";
    $("#strictLight").css('background-color', "red");
    }
  else {
    mode = "normal";
    $("#strictLight").css('background-color', "#000");
  }
});

$(".color").click(function() {
  var current = this.id;
  var mydiv = "#" + current;
  var audio = new Audio(colors[current][2]);
  $(mydiv).css('background-color', colors[current][1]);   
  audio.play();
  setTimeout(function() { 
  $(mydiv).css('background-color', colors[current][0]); }, 2000);  
  if (state=="player") {
    if (this.id == sequence[playerCount]) {
      playerCount++;
    }
    else { 
      $("#window").text("X");
      if (mode == "normal") {
        setTimeout(function() { 
      computerTurn(); }, 3000);
      }
      else {
        setup();
        computerTurn();
      }
    }
  }
  if (playerCount == sequence.length) {
    count++;
    addnew();
    setTimeout(function() { 
      computerTurn(); }, 3000);
  }
});

function setup() {
  state = "computer";
  count = 1;
  sequence = [];
  addnew();
}

function addnew() {
  var num = Math.floor(Math.random() * 4);
  var selected = four[num];
  sequence.push(selected);
}

function computerTurn() {
  playerCount = 0;
  $("#window").text(sequence.length)
  rotator(sequence);
  state = "player";
}
//https://stackoverflow.com/questions/16672561/how-to-slow-down-a-loop-with-settimeout-or-setinterval
function rotator(arr) {
  var iterator = function (index) {
      if (index >= arr.length) {
          return;
      }
    var current = arr[index];
    var mydiv = "#" + current;
    var audio = new Audio(colors[current][2]);
    setTimeout(function() { 
    $(mydiv).css('background-color', colors[current][1]); }, 500); 
    audio.play();
    setTimeout(function() { 
    $(mydiv).css('background-color', colors[current][0]); }, 2500);  
      setTimeout(function () {
          iterator(++index);
      }, 3000);
  };
 iterator(0);
};
