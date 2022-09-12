import MediaPlayer from "./MediaPlayer.js";
import AutoPlay from "./plugins/AutoPlay.js";

const video = document.querySelector("video");
const buttonPlay = document.getElementById("playButton");
const buttonMute = document.getElementById("muteButton");
const player = new MediaPlayer({
  el: video,
  plugins: [new AutoPlay()],
});
buttonPlay.onclick = () => {
  player.togglePlay();
};
buttonMute.onclick = () => {
  player.toggleMute();
};
