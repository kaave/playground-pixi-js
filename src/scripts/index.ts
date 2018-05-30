import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';
import Easing from 'bezier-easing';

import '../styles/index.css';
import Invert from './filters/Twist';

PIXI.utils.skipHello();
const easeInOutQuart = Easing(0.86, 0, 0.07, 1);

const sliceLength = 200;
class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  filters?: {
    invert: Invert;
  };
  sprites: PIXI.Sprite[];
  animatePixels: number[];
  animationID: number | null;
  animationReverse: boolean;

  constructor() {
    this.animate = this.animate.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();
    this.sprites = [];
    this.animatePixels = [];
    this.animationID = null;
    this.animationReverse = false;

    const spriteWidth = this.renderer.width / sliceLength;
    PIXI.loader.add({ name: 'unsplash', url: '1.jpg' }).load(() => {
      const container = new PIXI.Container();
      const resource = PIXI.loader.resources.unsplash;
      [...Array(sliceLength).keys()].forEach(i => {
        const texture = resource.texture.clone();
        const sprite = new PIXI.Sprite(resource.texture.clone());
        sprite.position.set(spriteWidth * i, 0);
        sprite.width = this.renderer.width;
        sprite.height = this.renderer.height;
        sprite.texture.frame = new PIXI.Rectangle(
          texture.width / sliceLength * i,
          0,
          texture.width / sliceLength,
          texture.height,
        );

        container.addChild(sprite);
        this.sprites.push(sprite);
      });
      this.filters = {
        // blur: new PIXI.filters.BlurFilter(),
        invert: new Invert(),
      };
      // this.filters.blur.quality = 2.5;

      // container.filters = Object.values(this.filters);
      this.stage.addChild(container);
      this.stage.filters = Object.values(this.filters);
      this.updateFilter();
      this.updateRenderer();
      window.addEventListener('scroll', this.onScroll);
    });

    this.renderer.autoResize = true;

    document.body.appendChild(this.renderer.view);

    // setInterval(() => {
    //   if (this.filters) {
    //     const setValue = Math.random();
    //     // console.log(setValue);
    //     this.filters.invert.blurX = setValue * 10;
    //     this.filters.invert.blurY = Math.random() * 10;
    //     this.renderer.render(this.stage);
    //   }
    // }, 1000 / 24);

    // this.startAnimation(this.animationReverse);
  }

  onScroll() {
    this.updateFilter();
  }

  updateFilter() {
    // const heightRate = window.pageYOffset / document.body.getBoundingClientRect().height;
    // if (this.filters) {
    //   // this.filters.blur.blur = heightRate * 10;
    // }
    this.updateRenderer();
  }

  updateRenderer() {
    this.renderer.render(this.stage);
  }

  startAnimation(isReverse: boolean) {
    const fps = 60;
    const animationSec = 1.5;
    const length = fps * animationSec;

    this.animatePixels = [...Array(length).keys()].map(
      index => easeInOutQuart(index / (length - 1)) * window.innerHeight,
    );
    if (isReverse) {
      this.animatePixels = this.animatePixels.reverse();
    }
    this.animationID = requestAnimationFrame(this.animate);
  }

  animate(_time: number) {
    const movePx = this.animatePixels.shift();
    if (movePx == null) {
      if (this.animationID) {
        cancelAnimationFrame(this.animationID);
        this.animationID = null;
        this.animationReverse = !this.animationReverse;
        setTimeout(() => this.startAnimation(this.animationReverse), 100);
      }

      return;
    }

    this.sprites.forEach((sprite, index) => (sprite.y = index % 2 === 0 ? movePx * 1 : movePx * -1));
    this.updateRenderer();
    requestAnimationFrame(this.animate);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  console.log(main);
});
