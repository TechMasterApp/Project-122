x = 0;
y = 0;

screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = "";
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

const wordToNum = (str) => {
  const legend = ['zero', 'one', 'two', 'three', 'four', 'five', 'six','seven', 'eight', 'nine'];
  return str.toLowerCase().split(" ").reduce((acc, val) => {
      const index = legend.indexOf(val);
      return (acc*10 + index);
  }, 0);
};

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = (event) => {

  console.log(event); 

  content = event.results[0][0].transcript;

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

  to_number = Number(wordToNum(content));
  if (Number.isInteger(to_number)) {
    speak_data = "Started drawing apple"
    draw_apple = "set"
  } else {
    speak_data = "The speech has not recognized a number"
  }

}

function preload() {
  apple = loadImage("apple.png")
}

function setup() {
 screen_width = window.innerWidth
 screen_height = window.innerHeight
 canvas = createCanvas(screen_width, screen_height - 150)
}

function draw() {
  if(draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    for(var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700)
      y = Math.floor(Math.random() * 400)
      image(apple, x, y, 50, 50)
    }
  }
  speak()
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
