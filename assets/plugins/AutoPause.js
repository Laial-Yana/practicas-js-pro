export default class AutoPause {
  constructor(player) {
    this.threshold = 0.25;
    this.handleIntersection = this.handleIntersection.bind(this); // decimos que siempre que se llame a handleIntersection
    // this se va a referir a la instancia de la clase AutoPause
  }
  run(player) {
    this.player = player;
    // console.log(player, "Dentro de la funcion run");
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold, //el porcentaje de pantalla que el video tiene que
      // pasar para que el observer nos avise
    });
    observer.observe(this.player.media); // el elemento al que va a observar el observer
    // y el contenedor es toda la pantalla.
  }
  //entries es una lista/array que obverser le pasa al handleIntersection cuando lo ejecuta
  //contiene todos los elementos que se estan observando
  handleIntersection(entries) {
    // console.log(player, "Dentro de la funcion handleintersection");
    let entry = entries[0];
    // console.log(entry, "ENTRY");
    const isVisible = entry.intersectionRatio >= this.threshold;
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}
