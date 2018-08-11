import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';

import '../styles/index.css';
<<<<<<< HEAD
PIXI.utils.skipHello();

interface Size {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

function loadImages() {
  return new Promise(resolve =>
    PIXI.loader.add({ name: 'unsplash', url: 'alex-iby-628881-unsplash.jpg' }).load(resolve),
  );
}

function loadDOM() {
  return new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));
}

function getCoverSizeFixVertical(source: Size, target: Size): { size: Size; point: Point } {
  const size = {
    width: target.width,
    height: source.height * target.width / source.width,
  };

  const point = {
    x: 0,
    y: size.height / -2 + target.height / 2,
  };

  return { size, point };
}

function getCoverSizeFixHorizontal(source: Size, target: Size): { size: Size; point: Point } {
  const size = {
    width: source.width * target.height / source.height,
    height: target.height,
  };

  const point = {
    x: (size.width - target.width) / -2,
    y: 0,
  };

  return { size, point };
}

function getCoverSize(source: Size, target: Size): { size: Size; point: Point } {
  const targetRatio = { x: 1, y: target.height / target.width };
  const sourceRatio = { x: 1, y: source.height / source.width };
  const isVerticalTarget = targetRatio.x <= targetRatio.y;
  const isVerticalSource = sourceRatio.x <= sourceRatio.y;

  if (isVerticalTarget === isVerticalSource) {
    return sourceRatio.y < targetRatio.y
      ? getCoverSizeFixHorizontal(source, target)
      : getCoverSizeFixVertical(source, target);
  } else {
    return isVerticalTarget && !isVerticalSource
      ? getCoverSizeFixHorizontal(source, target)
      : getCoverSizeFixVertical(source, target);
  }
}

Promise.all([loadImages(), loadDOM()]).then(() => {
  const app = new PIXI.Application(window.innerWidth, window.innerHeight);
  const { renderer, stage } = app;
  renderer.autoResize = true;
  const { texture } = PIXI.loader.resources.unsplash;

  const { size, point } = getCoverSize(texture, renderer);
  const sprite = new PIXI.Sprite(texture);
  sprite.position.set(point.x, point.y);
  sprite.width = size.width;
  sprite.height = size.height;
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
