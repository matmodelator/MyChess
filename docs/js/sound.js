/* ========================================
   CHESS GENERATED SOUNDS
   Web Audio API
   v2.0.0
======================================== */

let soundEnabled = true;
let soundVolume = 0.6;
let audioCtx = null;

function getAudioCtx(){
  if(!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function tone(freq, duration, type="sine", delay=0, volume=1){
  if(!soundEnabled) return;

  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0, ctx.currentTime + delay);
  gain.gain.linearRampToValueAtTime(soundVolume * volume, ctx.currentTime + delay + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.02);
}

function noise(duration, delay=0, volume=0.4){
  if(!soundEnabled) return;

  const ctx = getAudioCtx();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for(let i=0;i<bufferSize;i++){
    data[i] = (Math.random() * 2 - 1) * 0.35;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(soundVolume * volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  source.connect(gain);
  gain.connect(ctx.destination);

  source.start(ctx.currentTime + delay);
  source.stop(ctx.currentTime + delay + duration);
}

function playSound(name){
  if(!soundEnabled) return;

  const ctx = getAudioCtx();
  if(ctx.state === "suspended"){
    ctx.resume();
  }

  switch(name){

    case "move":
      tone(420, 0.07, "triangle", 0, 0.55);
      tone(260, 0.05, "triangle", 0.04, 0.35);
      break;

    case "capture":
      noise(0.06, 0, 0.55);
      tone(220, 0.09, "square", 0.02, 0.35);
      break;

    case "check":
      tone(660, 0.08, "sine", 0, 0.55);
      tone(880, 0.10, "sine", 0.06, 0.45);
      break;

    case "mate":
      tone(520, 0.10, "triangle", 0, 0.6);
      tone(390, 0.12, "triangle", 0.08, 0.55);
      tone(260, 0.18, "triangle", 0.18, 0.5);
      break;

    case "draw":
      tone(440, 0.10, "sine", 0, 0.45);
      tone(440, 0.10, "sine", 0.12, 0.35);
      break;

    case "win":
      tone(520, 0.08, "triangle", 0, 0.5);
      tone(660, 0.08, "triangle", 0.08, 0.5);
      tone(880, 0.14, "triangle", 0.16, 0.55);
      break;

    case "lose":
      tone(360, 0.10, "triangle", 0, 0.45);
      tone(300, 0.10, "triangle", 0.10, 0.4);
      tone(220, 0.18, "triangle", 0.20, 0.35);
      break;

    case "illegal":
      tone(130, 0.08, "square", 0, 0.45);
      tone(110, 0.08, "square", 0.08, 0.35);
      break;

    case "timeout":
      tone(900, 0.08, "square", 0, 0.45);
      tone(600, 0.08, "square", 0.10, 0.45);
      tone(300, 0.12, "square", 0.20, 0.4);
      break;

    case "yourTurn":
      tone(720, 0.07, "sine", 0, 0.35);
      tone(960, 0.07, "sine", 0.08, 0.3);
      break;

    case "challenge":
      tone(600, 0.08, "triangle", 0, 0.45);
      tone(750, 0.08, "triangle", 0.09, 0.45);
      break;
  }
}

function setSoundVolume(value){
  soundVolume = Number(value) / 100;
}

function toggleSound(){
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

function playAllSounds(){
  const list = [
    "move",
    "capture",
    "check",
    "mate",
    "draw",
    "win",
    "lose",
    "illegal",
    "timeout",
    "yourTurn",
    "challenge"
  ];

  list.forEach((name,index)=>{
    setTimeout(()=>{
      playSound(name);
    }, index * 650);
  });
}
