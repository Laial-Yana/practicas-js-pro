import MediaPlayer from "../../MediaPlayer";
import Ads, { Ad } from "./Ads";

export default class AdsPlugin {
  private ads: Ads;
  private player: MediaPlayer;
  private media: HTMLElement;
  private currentAdd: Ad | null;
  private adsContainer: HTMLElement;
  constructor() {
    this.ads = Ads.getInstance();
    //creamos contenedor que va a contener los ads
    this.adsContainer = document.createElement("div");
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }
  run(player: MediaPlayer) {
    this.player = player;
    this.player.container.appendChild(this.adsContainer);
    this.media = this.player.media;
    this.media.addEventListener("timeupdate", this.handleTimeUpdate);
  }
  private handleTimeUpdate() {
    //cada 30 segundos desplegar un add
    const currentTime = Math.floor(this.media.currentTime);
    if (currentTime % 30 === 0) {
      this.renderAd();
    }
  }
  private renderAd() {
    //si ya tenemos un currentAdd no mostremos otro
    if (this.currentAdd) {
      return;
    }
    const ad = this.ads.getAd();
    //llevar registro de cual es el add actual
    this.currentAdd = ad!;
    this.adsContainer.innerHTML = `
    <div class="ads">
      <a class="ads__link" href="${this.currentAdd.url}" target="_blank">
        <img class="ads__img" src="${this.currentAdd.imageUrl}" />
        <div class="ads__info">
          <h5 class="ads__title">${this.currentAdd.title}</h5>
          <p class="ads__body">${this.currentAdd.body}</p>
        </div>
      </a>
    </div>
  `;
    setTimeout(() => {
      this.currentAdd = null;
      this.adsContainer.innerHTML = "";
    }, 10000);
  }
}
