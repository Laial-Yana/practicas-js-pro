import MediaPlayer from "../MediaPlayer";

export default class AutoPause {
  private threshold: number;
  player: MediaPlayer;
  constructor(player) {
    this.threshold = 0.25;
    this.handleIntersection = this.handleIntersection.bind(this);
    //aca agrega esta linea para volver a direccionar el this como en la linea anterior,
    //pero esto no fue necesario para que la funcion se ejecute correctamente, no me saltó el error de
    //"trying to read properties of undefined: reading pause", igual lo hice.
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }
  run(player) {
    this.player = player;
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    });
    observer.observe(this.player.media);

    document.addEventListener("visibilitychange", () => {
      //aqui agregamos un event listener para observar cuando se cambia de pestaña
      this.handleVisibilityChange();
    });
  }
  private handleIntersection(entries: IntersectionObserverEntry[]) {
    let entry = entries[0];
    const isVisible = entry.intersectionRatio >= this.threshold;
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
  private handleVisibilityChange() {
    const isVisible = document.visibilityState === "visible";
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}
