import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';
import * as dat from 'dat.gui';

import '../styles/index.css';
import BlueInvert from './filters/BlueInvert';
import BlueRaise from './filters/BlueRaise';
import Convergence from './filters/Convergence';
import CutSlider from './filters/CutSlider';
// import Glow from './filters/Glow';
import GreenInvert from './filters/GreenInvert';
import GreenRaise from './filters/GreenRaise';
import HighContrast from './filters/HighContrast';
import Invert from './filters/Invert';
// import Noise from './filters/Noise';
// import Outline from './filters/Outline';
import RedInvert from './filters/RedInvert';
import RedRaise from './filters/RedRaise';
// import Shaker from './filters/Shaker';
// import SlitScan from './filters/SlitScan';
// import Swell from './filters/Swell';
// import Twist from './filters/Twist';

interface Filter {
  enabled: boolean;
  filter: PIXI.Filter<any>;
}

const filters: { [key: string]: Filter } = {
  blueInvert: { enabled: false, filter: new BlueInvert() },
  blueRaise: { enabled: false, filter: new BlueRaise() },
  greenInvert: { enabled: false, filter: new GreenInvert() },
  greenRaise: { enabled: false, filter: new GreenRaise() },
  highContrast: { enabled: false, filter: new HighContrast() },
  invert: { enabled: false, filter: new Invert() },
  redInvert: { enabled: false, filter: new RedInvert() },
  redRaise: { enabled: false, filter: new RedRaise() },
  convergence: { enabled: false, filter: new Convergence() },
  cutSlider: { enabled: false, filter: new CutSlider() },
};

function setBlueInvert(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('BlueInvert');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.blueInvert.enabled = enabled;
    cb();
  });
}

function setBlueRaise(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('BlueRaise');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.blueRaise.enabled = enabled;
    cb();
  });
}

function setGreenInvert(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('GreenInvert');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.greenInvert.enabled = enabled;
    cb();
  });
}

function setGreenRaise(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('GreenRaise');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.greenRaise.enabled = enabled;
    cb();
  });
}

function setHighContrast(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('HighContrast');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.highContrast.enabled = enabled;
    cb();
  });
}

function setInvert(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('Invert');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.invert.enabled = enabled;
    cb();
  });
}

function setRedInvert(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('RedInvert');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.redInvert.enabled = enabled;
    cb();
  });
}

function setRedRaise(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('RedRaise');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.redRaise.enabled = enabled;
    cb();
  });
}

function setConvergence(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('Convergence');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.convergence.enabled = enabled;
    cb();
  });
  folder.add(filters.convergence.filter, 'rand', -5, 5).onChange(cb);
  folder.add(filters.convergence.filter, 'dimensionX', 0, 2000).onChange(cb);
  folder.add(filters.convergence.filter, 'dimensionY', 0, 2000).onChange(cb);
}

function setCutSlider(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('CutSlider');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.cutSlider.enabled = enabled;
    cb();
  });
  folder.add(filters.cutSlider.filter, 'rand', -10.0, 10.0).onChange(cb);
  folder.add(filters.cutSlider.filter, 'val1', -10.0, 10.0).onChange(cb);
  folder.add(filters.cutSlider.filter, 'val2', -30.0, 30.0).onChange(cb);
  folder.add(filters.cutSlider.filter, 'dimensionX', -50, 50).onChange(cb);
  folder.add(filters.cutSlider.filter, 'dimensionY', -50, 50).onChange(cb);
}

class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  gui: dat.GUI;

  constructor() {
    this.updateFilters = this.updateFilters.bind(this);
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();
    this.gui = new dat.GUI();
    this.gui.useLocalStorage = false;

    PIXI.loader.add({ name: 'unsplash', url: '2.jpg' }).load(this.onImageLoad.bind(this));
    this.renderer.autoResize = true;
    document.body.appendChild(this.renderer.view);

    setBlueInvert(this.gui, this.updateFilters);
    setBlueRaise(this.gui, this.updateFilters);
    setGreenInvert(this.gui, this.updateFilters);
    setGreenRaise(this.gui, this.updateFilters);
    setHighContrast(this.gui, this.updateFilters);
    setInvert(this.gui, this.updateFilters);
    setRedInvert(this.gui, this.updateFilters);
    setRedRaise(this.gui, this.updateFilters);
    setConvergence(this.gui, this.updateFilters);
    setCutSlider(this.gui, this.updateFilters);
  }

  updateFilters() {
    this.stage.filters = Object.values(filters)
      .filter(({ enabled }) => enabled)
      .map(({ filter }) => filter);

    this.renderer.render(this.stage);
  }

  setAnimation() {
    // setInterval(() => {
    //   if (this.filters) {
    //     // const setValue = Math.random();
    //     this.filters.invert.timer += 1;
    //     this.renderer.render(this.stage);
    //   }
    // }, 1000 / 24);
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
  main.setAnimation();
  main.updateFilters();
});
