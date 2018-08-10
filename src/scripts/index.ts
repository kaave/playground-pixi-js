import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

import '../styles/index.css';
PIXI.utils.skipHello();

function loadImages() {
  return new Promise(resolve =>
    PIXI.loader.add({ name: 'unsplash', url: 'alex-iby-628881-unsplash.jpg' }).load(resolve),
  );
}

function loadDOM() {
  return new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));
}

Promise.all([loadImages(), loadDOM()]).then(() => {
  const app = new PIXI.Application(window.innerWidth, window.innerHeight);
  const { renderer, stage } = app;
  renderer.autoResize = true;
  const { texture } = PIXI.loader.resources.unsplash;

  const sprite = new PIXI.Sprite(texture);
  sprite.position.set(0, 0);
  sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);
  stage.addChild(sprite);

  document.body.appendChild(renderer.view);
});
