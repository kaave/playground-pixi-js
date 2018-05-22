import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

import '../styles/index.css';

const sliceLength = 5;
class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  filters?: {
    blur: PIXI.filters.BlurFilter;
  };
  sprites: PIXI.Sprite[];

  constructor() {
    this.onScroll = this.onScroll.bind(this);
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();
    this.sprites = [];

    const spriteWidth = this.renderer.width / sliceLength;
    PIXI.loader.add({ name: 'unsplash', url: '4.jpg' }).load(() => {
      const container = new PIXI.Container();
      Object.values(PIXI.loader.resources).forEach(resource => {
        const textureWidth = resource.texture.width;
        const textureHeight = resource.texture.height;
        [...Array(sliceLength).keys()].forEach(i => {
          resource.texture.frame = new PIXI.Rectangle(
            textureWidth / sliceLength * i,
            0,
            textureWidth / sliceLength,
            textureHeight,
          );
          const sprite = new PIXI.Sprite(resource.texture);
          sprite.position.set(spriteWidth * i, 0);
          sprite.width = spriteWidth;
          sprite.height = this.renderer.height;
          container.addChild(sprite);
          this.sprites.push(sprite);
        });
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
