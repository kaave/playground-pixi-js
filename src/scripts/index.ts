import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

import '../styles/index.css';
<<<<<<< HEAD
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
=======

PIXI.utils.skipHello();

function getResource(): Promise<PIXI.loaders.Resource> {
  return new Promise(resolve => {
    const loader = PIXI.loader.add({ name: 'unsplash', url: 'alex-iby-628881-unsplash.jpg' });
    loader.load(() => resolve(loader.resources.unsplash));
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
  renderer.autoResize = true;
  document.body.appendChild(renderer.view);

  const stage = new PIXI.Container();
  const resource = await getResource();
  const { texture } = resource;
  const sprite = new PIXI.Sprite(texture);
  sprite.position.set(0, 0);
  sprite.width = renderer.width;
  sprite.height = renderer.height;
  sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);

  stage.addChild(sprite);
  renderer.render(stage);
>>>>>>> index: add simple code
});
