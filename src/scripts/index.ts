import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

import '../styles/index.css';

const sliceLength = 20;
class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  filters?: {
    blur: PIXI.filters.BlurFilter;
  };
  sprites: PIXI.Sprite[];

  constructor() {
    this.animate = this.animate.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();
    this.sprites = [];

    const spriteWidth = this.renderer.width / sliceLength;
    PIXI.loader.add({ name: 'unsplash', url: '4.jpg' }).load(() => {
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

    requestAnimationFrame(this.animate);
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

  animate(time: number) {
    this.sprites.forEach((sprite, index) => (sprite.y = index % 2 === 0 ? sprite.y + 1 : sprite.y - 1));
    console.log(new Date(), time);
    this.updateRenderer();
    requestAnimationFrame(this.animate);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  console.log(main);
});
