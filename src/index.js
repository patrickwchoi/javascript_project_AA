// JS Entry File
const Game = require("./game.js");
const Utils = require("./utils.js");
// import Game from './game.js';


const canvas = document.getElementById('canvas'); 
let g = new Game(canvas);
// Utils.changeDialogueText1("Welcome to Pokemon: The Game! Press the button below to start the game.");
document.getElementById('instructionsButton').click();
g.play();

const themesong = document.getElementById("themesong");
// themesong.play();
let volume = 0.2;
themesong.volume=volume;

let isMuted = false;
const muteButton = document.getElementById("mute-button");
muteButton.addEventListener("click", toggleMute);

function toggleMute() {
  isMuted = !isMuted;
  const sounds = document.querySelectorAll("audio");
  sounds.forEach(sound => {
    if (isMuted) {
      sound.volume = 0;
    } else {
      sound.volume = volume;
    }
  });

  // Update mute button icon
  const muteIcon = document.getElementById("mute-icon");
  if (isMuted) {
    muteIcon.classList.remove("fa-volume-high");
    muteIcon.classList.add("fa-volume-mute");
  } else {
    muteIcon.classList.remove("fa-volume-mute");
    muteIcon.classList.add("fa-volume-high");
  }
}


