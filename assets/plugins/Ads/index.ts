import MediaPlayer from "../../MediaPlayer";
import Ads, { Ad } from "./Ads";

export default class AdsPlugin {
  private ads: Ads;
  private player: MediaPlayer;
  private media: HTMLElement;
  private currentAdd: Ad;
  constructor() {
    this.ads = Ads.getInstance();
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }
  run(player: MediaPlayer) {
    this.player = player;
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
    console.log(this.currentAdd);
  }
}
