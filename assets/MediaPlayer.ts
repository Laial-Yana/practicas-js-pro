export default class MediaPlayer {
  media: HTMLMediaElement;
  plugins: Array<any>;
  container: HTMLElement;
  constructor(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this.initPlayer();
    this.initPlugins();
  }
  initPlayer() {
    this.container = document.createElement("div");
    this.container.style.position = "relative";
    //tenemos que mover media dentro del contenedor
    // primero tenemos que ubicar el contenedor como pariente de media y con insertBefore
    // ubicamos a media justo al lado del container
    this.media.parentNode?.insertBefore(this.container, this.media);
    //ahora podemos decir que el container va a contener media
    this.container.appendChild(this.media);
  }
  private initPlugins() {
    this.plugins.forEach((p) => {
      p.run(this);
    });
  }
  play() {
    this.media.play();
  }
  pause() {
    this.media.pause();
  }
  togglePlay() {
    const paused = this.media.paused;
    if (paused) {
      this.play();
    } else {
      this.pause();
    }
  }
  mute() {
    this.media.muted = true;
  }
  unmute() {
    this.media.muted = false;
  }
  toggleMute() {
    if (this.media.muted) {
      this.media.muted = false;
    } else {
      this.media.muted = true;
    }
  }
}
