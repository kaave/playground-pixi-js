import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

import '../styles/index.css';

class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  filters?: {
    blur: PIXI.filters.BlurFilter;
  };

  constructor() {
    this.onScroll = this.onScroll.bind(this);
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();

    PIXI.loader.add({ name: 'unsplash', url: '4.jpg' }).load(() => {
      const container = new PIXI.Container();
      Object.values(PIXI.loader.resources).forEach(resource => {
        const sprite = new PIXI.Sprite(resource.texture);
        sprite.position.set(0, 0);
        sprite.width = this.renderer.width;
        sprite.height = this.renderer.height;
        container.addChild(sprite);
      });
      this.filters = {
        blur: new PIXI.filters.BlurFilter(),
      };
      this.filters.blur.quality = 2.5;

      container.filters = Object.values(this.filters);
      this.stage.addChild(container);
      this.updateFilter();
      this.updateRenderer();
      window.addEventListener('scroll', this.onScroll);
    });

    this.renderer.autoResize = true;

    document.body.appendChild(this.renderer.view);
  }

  onScroll() {
    this.updateFilter();
  }

  updateFilter() {
    const heightRate = window.pageYOffset / document.body.getBoundingClientRect().height;
    if (this.filters) {
      this.filters.blur.blur = heightRate * 10;
    }
    this.updateRenderer();
  }

  updateRenderer() {
    this.renderer.render(this.stage);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  console.log(main);
});
