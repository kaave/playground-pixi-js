import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import * as PIXI from 'pixi.js';
import * as dat from 'dat.gui';

import '../styles/index.css';
import BlueInvert from './filters/BlueInvert';
import BlueRaise from './filters/BlueRaise';
import Convergence from './filters/Convergence';
import CutSlider from './filters/CutSlider';
import Glow from './filters/Glow';
import GreenInvert from './filters/GreenInvert';
import GreenRaise from './filters/GreenRaise';
import HighContrast from './filters/HighContrast';
import Invert from './filters/Invert';
import Noise from './filters/Noise';
import Outline from './filters/Outline';
import RedInvert from './filters/RedInvert';
import RedRaise from './filters/RedRaise';
import Shaker from './filters/Shaker';
import SlitScan from './filters/SlitScan';
import Swell from './filters/Swell';
import Twist from './filters/Twist';

type RequestAnimationFrameID = number;

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
  glow: { enabled: false, filter: new Glow() },
  noise: { enabled: false, filter: new Noise() },
  outline: { enabled: false, filter: new Outline() },
  shaker: { enabled: false, filter: new Shaker() },
  slitScan: { enabled: false, filter: new SlitScan() },
  swell: { enabled: false, filter: new Swell() },
  twist: { enabled: false, filter: new Twist() },
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

function setGlow(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('Glow');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.glow.enabled = enabled;
    cb();
  });
  folder
    .add(filters.glow.filter, 'blur', 0, 20)
    .step(0.05)
    .onChange(cb);
  folder.add(filters.glow.filter, 'dimensionX', 0, 50).onChange(cb);
  folder.add(filters.glow.filter, 'dimensionY', 0, 50).onChange(cb);
}

function setNoise(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('Noise');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.noise.enabled = enabled;
    cb();
  });
  folder.add(filters.noise.filter, 'rand', 0, 100).onChange(cb);
  folder.add(filters.noise.filter, 'strength', 0, 100).onChange(cb);
  folder.add(filters.noise.filter, 'dimensionX', 0, 5000).onChange(cb);
  folder.add(filters.noise.filter, 'dimensionY', 0, 5000).onChange(cb);
}

function setOutline(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('Outline');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.outline.enabled = enabled;
    cb();
  });
  folder.add(filters.outline.filter, 'dimensionX', 0, 1000).onChange(cb);
  folder.add(filters.outline.filter, 'dimensionY', 0, 1000).onChange(cb);
}

function setShaker(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('Shaker');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.shaker.enabled = enabled;
    cb();
  });
  folder
    .add(filters.shaker.filter, 'blurX', -10, 10)
    .step(0.01)
    .onChange(cb);
  folder
    .add(filters.shaker.filter, 'blurY', -10, 10)
    .step(0.01)
    .onChange(cb);
  folder.add(filters.shaker.filter, 'dimensionX', 0, 1000).onChange(cb);
  folder.add(filters.shaker.filter, 'dimensionY', 0, 1000).onChange(cb);
}

function setSlitScan(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('SlitScan');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.slitScan.enabled = enabled;
    cb();
  });
  folder
    .add(filters.slitScan.filter, 'rand', -200, 200)
    .step(0.05)
    .onChange(cb);
  folder.add(filters.slitScan.filter, 'dimension', 0, 500).onChange(cb);
}

function setSwell(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('Swell');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.swell.enabled = enabled;
    cb();
  });
  folder
    .add(filters.swell.filter, 'rand', -200, 200)
    .step(0.05)
    .onChange(cb);
  folder.add(filters.swell.filter, 'dimensionX', -5000, 5000).onChange(cb);
  folder.add(filters.swell.filter, 'dimensionY', -5000, 5000).onChange(cb);
  folder.add(filters.swell.filter, 'dimensionZ', -5000, 5000).onChange(cb);
  folder.add(filters.swell.filter, 'dimensionA', -5000, 5000).onChange(cb);
}

function setTwist(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder('Twist');
  folder.add({ enabled: false }, 'enabled').onChange((enabled: boolean) => {
    filters.twist.enabled = enabled;
    cb();
  });
  folder
    .add(filters.twist.filter, 'rand', -200, 200)
    .step(0.05)
    .onChange(cb);
  folder
    .add(filters.twist.filter, 'val2', -200, 200)
    .step(0.05)
    .onChange(cb);
  folder
    .add(filters.twist.filter, 'val3', -200, 200)
    .step(0.05)
    .onChange(cb);
  folder.add(filters.twist.filter, 'dimensionX', 0, 5000).onChange(cb);
  folder.add(filters.twist.filter, 'dimensionY', 0, 5000).onChange(cb);
}

class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  sourceSelectElement: HTMLSelectElement;
  sourceFileElement: HTMLInputElement;
  uploadImageCanvas?: HTMLCanvasElement;

  constructor() {
    this.updateFilters = this.updateFilters.bind(this);
    const sourceSelectElement = document.querySelector('.Source__select');
    const sourceFileElement = document.querySelector('.Source__file');
    if (
      !sourceSelectElement ||
      !(sourceSelectElement instanceof HTMLSelectElement) ||
      !sourceFileElement ||
      !(sourceFileElement instanceof HTMLInputElement)
    ) {
      throw new Error('Invalid DOM error');
    }
    this.sourceSelectElement = sourceSelectElement;
    this.sourceFileElement = sourceFileElement;
    this.sourceSelectElement.addEventListener('change', this.handleChangeSourceSelect.bind(this));
    this.sourceFileElement.addEventListener('change', () => {
      const file = (this.sourceFileElement.files || [])[0];
      if (!file || !file.type.match(/^image\/(png|jpe?g|gif)$/)) {
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = event => {
        if (!event.target) {
          return;
        }

        const image = new Image();
        image.onload = () => {
          this.uploadImageCanvas = document.createElement('canvas');
          this.uploadImageCanvas.width = image.width;
          this.uploadImageCanvas.height = image.height;
          const context = this.uploadImageCanvas.getContext('2d');
          if (!context) {
            return;
          }
          context.drawImage(image, 0, 0);
          console.log(this.uploadImageCanvas);
        };
        image.src = event.target.result;
      };

      fileReader.readAsDataURL(file);
    });

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();
    const gui = new dat.GUI();
    gui.useLocalStorage = false;

    PIXI.loader
      .add([{ name: 'abstract', url: '1.jpg' }, { name: 'girl', url: '2.jpg' }, { name: 'view', url: '4.jpg' }])
      .load(this.onImageLoad.bind(this));
    this.renderer.autoResize = true;
    document.body.appendChild(this.renderer.view);

    const modifyColorFolder = gui.addFolder('🎨 Modify color');
    modifyColorFolder.open();
    setRedInvert(modifyColorFolder, this.updateFilters);
    setRedRaise(modifyColorFolder, this.updateFilters);
    setGreenInvert(modifyColorFolder, this.updateFilters);
    setGreenRaise(modifyColorFolder, this.updateFilters);
    setBlueInvert(modifyColorFolder, this.updateFilters);
    setBlueRaise(modifyColorFolder, this.updateFilters);
    setInvert(modifyColorFolder, this.updateFilters);
    setHighContrast(modifyColorFolder, this.updateFilters);

    const hardcoreModulation = gui.addFolder('🎸 Hardcore Modulation');
    hardcoreModulation.open();
    setConvergence(hardcoreModulation, this.updateFilters);
    setCutSlider(hardcoreModulation, this.updateFilters);
    setGlow(hardcoreModulation, this.updateFilters);
    setNoise(hardcoreModulation, this.updateFilters);
    setOutline(hardcoreModulation, this.updateFilters);
    setShaker(hardcoreModulation, this.updateFilters);
    setSlitScan(hardcoreModulation, this.updateFilters);

    const animate = gui.addFolder('🐼 Animate');
    animate.open();
    setSwell(animate, this.updateFilters);
    setTwist(animate, this.updateFilters);

    this.setAnimation();
  }

  updateFilters() {
    this.stage.filters = Object.values(filters)
      .filter(({ enabled }) => enabled)
      .map(({ filter }) => filter);

    this.renderer.render(this.stage);
  }

  setAnimation({ fps }: { fps: number } = { fps: 24 }): RequestAnimationFrameID {
    const startTime = performance.now();
    let lastFrame = 0;
    const loop = () => {
      const timeDiff = performance.now() - startTime;
      const frame = Math.ceil(timeDiff / (1000 / fps));

      if (lastFrame < frame) {
        (filters.swell.filter as any).timer += 1;
        (filters.twist.filter as any).timer += 1;
        // console.log('Animate', frame, lastFrame, timeDiff);
        lastFrame = frame;
        this.renderer.render(this.stage);
      } else {
        // console.log('Pass', frame, lastFrame, timeDiff);
      }

      requestAnimationFrame(loop);
    };

    return requestAnimationFrame(loop);
  }

  onImageLoad() {
    this.setTextureToStage(PIXI.loader.resources.girl.texture.clone());
    this.renderer.render(this.stage);
  }

  setTextureToStage(texture: PIXI.Texture) {
    const sprite = new PIXI.Sprite(texture);
    sprite.position.set(0, 0);
    sprite.width = this.renderer.width;
    sprite.height = this.renderer.height;
    sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);

    this.stage.addChild(sprite);
  }

  handleChangeSourceSelect() {
    this.stage.removeChildren();
    switch (this.sourceSelectElement.value) {
      case 'preset-girl':
        this.setTextureToStage(PIXI.loader.resources.girl.texture.clone());
        break;
      case 'preset-view':
        this.setTextureToStage(PIXI.loader.resources.view.texture.clone());
        break;
      case 'preset-abstract':
        this.setTextureToStage(PIXI.loader.resources.abstract.texture.clone());
        break;
      case 'camera':
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then(stream => {
            const url = window.URL.createObjectURL(stream);
            const video = document.createElement('video');
            video.src = url;
            video.oncanplay = () => this.setTextureToStage(PIXI.Texture.fromVideo(video));
            video.play();
          })
          .catch(error => {
            console.error('mediaDevice.getUserMedia() error:', error);
            return;
          });
        break;
      case 'upload':
        if (!this.uploadImageCanvas) {
          break;
        }
        this.setTextureToStage(PIXI.Texture.fromCanvas(this.uploadImageCanvas));
        break;
      default:
        break;
    }

    this.renderer.render(this.stage);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  main.setAnimation();
  main.updateFilters();
});
