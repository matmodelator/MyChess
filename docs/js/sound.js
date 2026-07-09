/* ========================================
   CHESS SOUNDS
   v1.0.0
======================================== */

const CHESS_SOUNDS = {
  move: "sounds/move.mp3",
  capture: "sounds/capture.mp3",
  check: "sounds/check.mp3",
  mate: "sounds/mate.mp3",
  draw: "sounds/draw.mp3",
  win: "sounds/win.mp3",
  lose: "sounds/lose.mp3",
  illegal: "sounds/illegal.mp3",
  timeout: "sounds/timeout.mp3",
  yourTurn: "sounds/your-turn.mp3",
  challenge: "sounds/challenge.mp3"
};

let soundEnabled = true;
let soundVolume = 0.7;

const soundPool = {};

function initSounds(){
  Object.keys(CHESS_SOUNDS).forEach(name => {
    const audio = new Audio(CHESS_SOUNDS[name]);
    audio.volume = soundVolume;
    audio.preload = "auto";
    soundPool[name] = audio;
  });
}

function playSound(name){
  if(!soundEnabled) return;

  const sound = soundPool[name];

  if(!sound){
    console.warn("Sound not found:", name);
    return;
  }

  sound.currentTime = 0;
  sound.volume = soundVolume;

  sound.play().catch(err => {
    console.warn("Sound play blocked:", err);
  });
}

function setSoundVolume(value){
  soundVolume = Number(value) / 100;

  Object.values(soundPool).forEach(audio => {
    audio.volume = soundVolume;
  });
}

function toggleSound(){
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

function playAllSounds(){
  const names = Object.keys(CHESS_SOUNDS);
  let index = 0;

  function next(){
    if(index >= names.length) return;

    playSound(names[index]);
    index++;

    setTimeout(next, 600);
  }

  next();
}

initSounds();
