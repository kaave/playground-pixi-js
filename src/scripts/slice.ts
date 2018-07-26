import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';
import Easing from 'bezier-easing';

import '../styles/index.css';

PIXI.utils.skipHello();
const easeInOutQuart = Easing(0.86, 0, 0.07, 1);

const sliceLength = 400;
class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  sprites: PIXI.Sprite[];
  animatePixels: number[];
  animationID: number | null;
  animationReverse: boolean;

  constructor() {
    this.animate = this.animate.bind(this);
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();
    this.sprites = [];
    this.animatePixels = [];
    this.animationID = null;
    this.animationReverse = false;

    const spriteWidth = this.renderer.width / sliceLength;
    PIXI.loader.add({ name: 'unsplash', url: 'alex-iby-628881-unsplash.jpg' }).load(() => {
      const container = new PIXI.Container();
      const resource = PIXI.loader.resources.unsplash;
      console.log(resource.texture.width, resource.texture.height);
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

      this.stage.addChild(container);
      this.updateRenderer();
    });

    this.renderer.autoResize = true;

    document.body.appendChild(this.renderer.view);

    this.startAnimation(this.animationReverse);
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
