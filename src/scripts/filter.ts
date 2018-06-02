import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

import '../styles/index.css';
import Invert from './filters/Twist';

class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  filters?: {
    invert: Invert;
  };

  constructor() {
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();

    PIXI.loader.add({ name: 'unsplash', url: '2.jpg' }).load(this.onImageLoad.bind(this));
    this.renderer.autoResize = true;
    document.body.appendChild(this.renderer.view);

    this.setAnimation();
    this.setFilters();
  }

  setFilters() {
    this.filters = {
      invert: new Invert(),
    };

    this.stage.filters = Object.values(this.filters);
  }

  setAnimation() {
    setInterval(() => {
      if (this.filters) {
        // const setValue = Math.random();
        this.filters.invert.timer += 1;
        this.renderer.render(this.stage);
      }
    }, 1000 / 24);
  }

  onImageLoad() {
    const resource = PIXI.loader.resources.unsplash;
    const texture = resource.texture.clone();
    const sprite = new PIXI.Sprite(texture);
    sprite.position.set(0, 0);
    sprite.width = this.renderer.width;
    sprite.height = this.renderer.height;
    sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);

    this.stage.addChild(sprite);
    this.renderer.render(this.stage);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  console.log(main);
});
