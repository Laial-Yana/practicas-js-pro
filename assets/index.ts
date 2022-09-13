import MediaPlayer from "./MediaPlayer";
import AutoPlay from "./plugins/AutoPlay";
import AutoPause from "./plugins/AutoPause";

const video = document.querySelector("video");
const buttonPlay: HTMLElement = document.querySelector("#playButton")!;
const buttonMute: HTMLElement = document.querySelector("#muteButton")!;
const player = new MediaPlayer({
  el: video,
  plugins: [new AutoPlay(), new AutoPause(MediaPlayer)],
});
buttonPlay.onclick = () => {
  player.togglePlay();
};
buttonMute.onclick = () => {
  player.toggleMute();
};
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch((error) => {
    console.log(error);
  });
}
