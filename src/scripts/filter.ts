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

interface Filter {
  enabled: boolean;
  random?: boolean;
  key: string;
  filter: PIXI.Filter<any>;
  properties?: Array<{ key: string; max: number; min: number; step?: number }>;
}

interface Images {
  key: string;
  url: string;
  desc: string;
}

const images: Images[] = [
  { key: 'woman', url: 'alex-iby-628881-unsplash.jpg', desc: 'Woman: Photo by Alex Iby on Unsplash' },
  { key: 'woman2', url: 'stas-svechnikov-31192-unsplash.jpg', desc: 'Woman2: Photo by Stas Svechnikov on Unsplash' },
  { key: 'man', url: 'shttefan-472897-unsplash.jpg', desc: 'Man: Photo by SHTTEFAN on Unsplash' },
  { key: 'car', url: 'alan-king-581569-unsplash.jpg', desc: 'Car: Photo by alan King on Unsplash' },
  { key: 'sea', url: 'anastasia-taioglou-214774-unsplash.jpg', desc: 'Sea: Photo by Anastasia Taioglou on Unsplash' },
  { key: 'food', url: 'toa-heftiba-422022-unsplash.jpg', desc: 'Food: Photo by Toa Heftiba on Unsplash' },
  { key: 'illust', url: 'monitor_tenin_nenrei_kakunin.png', desc: 'Illust: by Illust-ya' },
];

const filters: { [key: string]: Filter } = {
  redInvert: { enabled: false, key: 'q', filter: new RedInvert() },
  redRaise: { enabled: false, key: 'w', filter: new RedRaise() },
  greenInvert: { enabled: false, key: 'e', filter: new GreenInvert() },
  greenRaise: { enabled: false, key: 'r', filter: new GreenRaise() },
  blueInvert: { enabled: false, key: 't', filter: new BlueInvert() },
  blueRaise: { enabled: false, key: 'y', filter: new BlueRaise() },
  invert: { enabled: false, key: 'u', filter: new Invert() },
  highContrast: { enabled: false, key: 'i', filter: new HighContrast() },
  convergence: {
    enabled: false,
    random: false,
    key: 'a',
    filter: new Convergence(),
    properties: [
      { key: 'rand', min: -5, max: 5 },
      { key: 'dimensionX', min: 0, max: 2000 },
      { key: 'dimensionY', min: 0, max: 2000 },
    ],
  },
  cutSlider: {
    enabled: false,
    random: false,
    key: 's',
    filter: new CutSlider(),
    properties: [
      { key: 'rand', min: -10, max: 10 },
      { key: 'val1', min: -10, max: 10 },
      { key: 'val2', min: -30, max: 30 },
      { key: 'dimensionX', min: -50, max: 50 },
      { key: 'dimensionY', min: -50, max: 50 },
    ],
  },
  glow: {
    enabled: false,
    random: false,
    key: 'd',
    filter: new Glow(),
    properties: [
      { key: 'blur', min: 0, max: 20, step: 0.05 },
      { key: 'dimensionX', min: 0, max: 50 },
      { key: 'dimensionY', min: 0, max: 50 },
    ],
  },
  noise: {
    enabled: false,
    random: false,
    key: 'f',
    filter: new Noise(),
    properties: [
      { key: 'rand', min: 0, max: 100 },
      { key: 'strength', min: 0, max: 100 },
      { key: 'dimensionX', min: 0, max: 5000 },
      { key: 'dimensionY', min: 0, max: 5000 },
    ],
  },
  outline: {
    enabled: false,
    random: false,
    key: 'g',
    filter: new Outline(),
    properties: [{ key: 'dimensionX', min: 0, max: 1000 }, { key: 'dimensionY', min: 0, max: 1000 }],
  },
  shaker: {
    enabled: false,
    random: false,
    key: 'h',
    filter: new Shaker(),
    properties: [
      { key: 'blurX', min: -10, max: 10, step: 0.01 },
      { key: 'blurY', min: -10, max: 10, step: 0.01 },
      { key: 'dimensionX', min: 0, max: 5000 },
      { key: 'dimensionY', min: 0, max: 5000 },
    ],
  },
  slitScan: {
    enabled: false,
    random: false,
    key: 'j',
    filter: new SlitScan(),
    properties: [{ key: 'rand', min: -200, max: 200 }, { key: 'dimension', min: 0, max: 500 }],
  },
  swell: {
    enabled: false,
    random: false,
    key: 'z',
    filter: new Swell(),
    properties: [
      { key: 'rand', min: -200, max: 200, step: 0.05 },
      { key: 'dimensionX', min: -5000, max: 5000 },
      { key: 'dimensionY', min: -5000, max: 5000 },
      { key: 'dimensionZ', min: -5000, max: 5000 },
      { key: 'dimensionA', min: -5000, max: 5000 },
    ],
  },
  twist: {
    enabled: false,
    random: false,
    key: 'x',
    filter: new Twist(),
    properties: [
      { key: 'rand', min: -200, max: 200, step: 0.05 },
      { key: 'val2', min: -200, max: 200, step: 0.05 },
      { key: 'val3', min: -200, max: 200, step: 0.05 },
      { key: 'dimensionX', min: 0, max: 5000 },
      { key: 'dimensionY', min: 0, max: 5000 },
    ],
  },
};

function setBlueInvert(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`BlueInvert (${filters.blueInvert.key})`);
  folder
    .add(filters.blueInvert, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.blueInvert.enabled = enabled;
      cb();
    });
}

function setBlueRaise(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`BlueRaise (${filters.blueRaise.key})`);
  folder
    .add(filters.blueRaise, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.blueRaise.enabled = enabled;
      cb();
    });
}

function setGreenInvert(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`GreenInvert (${filters.greenInvert.key})`);
  folder
    .add(filters.greenInvert, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.greenInvert.enabled = enabled;
      cb();
    });
}

function setGreenRaise(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`GreenRaise (${filters.greenRaise.key})`);
  folder
    .add(filters.greenRaise, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.greenRaise.enabled = enabled;
      cb();
    });
}

function setHighContrast(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`HighContrast (${filters.highContrast.key})`);
  folder
    .add(filters.highContrast, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.highContrast.enabled = enabled;
      cb();
    });
}

function setInvert(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`Invert (${filters.invert.key})`);
  folder
    .add(filters.invert, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.invert.enabled = enabled;
      cb();
    });
}

function setRedInvert(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`RedInvert (${filters.redInvert.key})`);
  folder
    .add(filters.redInvert, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.redInvert.enabled = enabled;
      cb();
    });
}

function setRedRaise(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`RedRaise (${filters.redRaise.key})`);
  folder
    .add(filters.redRaise, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.redRaise.enabled = enabled;
      cb();
    });
}

function setConvergence(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`Convergence (${filters.convergence.key})`);
  folder
    .add(filters.convergence, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.convergence.enabled = enabled;
      cb();
    });
  folder
    .add(filters.convergence, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.convergence.random = random;
      cb();
    });

  const { properties } = filters.convergence;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.convergence.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setCutSlider(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`CutSlider (${filters.cutSlider.key})`);
  folder
    .add(filters.cutSlider, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.cutSlider.enabled = enabled;
      cb();
    });
  folder
    .add(filters.cutSlider, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.cutSlider.random = random;
      cb();
    });

  const { properties } = filters.cutSlider;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.cutSlider.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setGlow(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`Glow (${filters.glow.key})`);
  folder
    .add(filters.glow, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.glow.enabled = enabled;
      cb();
    });
  folder
    .add(filters.glow, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.glow.random = random;
      cb();
    });

  const { properties } = filters.glow;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.glow.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setNoise(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`Noise (${filters.noise.key})`);
  folder
    .add(filters.noise, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.noise.enabled = enabled;
      cb();
    });
  folder
    .add(filters.noise, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.noise.random = random;
      cb();
    });

  const { properties } = filters.noise;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.noise.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setOutline(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`Outline (${filters.outline.key})`);
  folder
    .add(filters.outline, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.outline.enabled = enabled;
      cb();
    });
  folder
    .add(filters.outline, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.outline.random = random;
      cb();
    });

  const { properties } = filters.outline;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.outline.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setShaker(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`Shaker (${filters.shaker.key})`);
  folder
    .add(filters.shaker, 'enabled')
    .listen()

    .onChange((enabled: boolean) => {
      filters.shaker.enabled = enabled;
      cb();
    });
  folder
    .add(filters.shaker, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.shaker.random = random;
      cb();
    });

  const { properties } = filters.shaker;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.shaker.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setSlitScan(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`SlitScan (${filters.slitScan.key})`);
  folder
    .add(filters.slitScan, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.slitScan.enabled = enabled;
      cb();
    });
  folder
    .add(filters.slitScan, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.slitScan.random = random;
      cb();
    });

  const { properties } = filters.slitScan;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.slitScan.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setSwell(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`Swell (${filters.swell.key})`);
  folder
    .add(filters.swell, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.swell.enabled = enabled;
      cb();
    });
  folder
    .add(filters.swell, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.swell.random = random;
      cb();
    });

  const { properties } = filters.swell;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.swell.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setTwist(gui: dat.GUI, cb: () => void) {
  const folder = gui.addFolder(`Twist (${filters.twist.key})`);
  folder
    .add(filters.twist, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filters.twist.enabled = enabled;
      cb();
    });
  folder
    .add(filters.twist, 'random')
    .listen()
    .onChange((random: boolean) => {
      filters.twist.random = random;
      cb();
    });

  const { properties } = filters.twist;
  if (properties) {
    properties.forEach(({ key, max, min, step }) => {
      const guiController = folder.add(filters.twist.filter, key, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setSourceList() {
  const selectElement = document.querySelector('.Source__select');
  if (!selectElement) {
    return;
  }

  [
    ...images.map(({ key, desc }) => ({ key: `preset-${key}`, desc: `Preset (${desc})` })),
    { key: 'camera', desc: 'CAMERA *RECOMMENDED*' },
    { key: 'upload', desc: 'Upload image' },
  ].forEach(({ key, desc }) => {
    const optionElement = document.createElement('option');
    optionElement.value = key;
    optionElement.innerText = desc;
    selectElement.appendChild(optionElement);
  });
}

class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  sourceSelectElement: HTMLSelectElement;
  sourceFileElement: HTMLInputElement;
  uploadImageCanvas?: HTMLCanvasElement;

  constructor() {
    setSourceList();
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
          this.sourceSelectElement.value = 'upload';
          this.setTextureToStage(PIXI.Texture.fromCanvas(this.uploadImageCanvas));
        };
        image.src = event.target.result;
      };

      fileReader.readAsDataURL(file);
    });

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();
    const gui = new dat.GUI({ hideable: false });
    gui.useLocalStorage = false;

    PIXI.loader.add(images.map(({ key: name, url }) => ({ name, url }))).load(this.onImageLoad.bind(this));
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

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        Object.values(filters).forEach(filter => (filter.random = false));
      } else {
        Object.values(filters).forEach(filter => (filter.enabled = false));
      }
      this.updateFilters();
      return;
    }

    const lowerKey = event.key.toLowerCase();
    const targetFilter = Object.values(filters).find(({ key }) => key === lowerKey);
    if (!targetFilter) {
      return;
    }

    if (event.shiftKey) {
      targetFilter.random = !targetFilter.random;
    } else {
      targetFilter.enabled = !targetFilter.enabled;
    }
    this.updateFilters();
  }

  updateFilters() {
    this.stage.filters = Object.values(filters)
      .filter(({ enabled }) => enabled)
      .map(({ filter }) => filter);

    this.renderer.render(this.stage);
  }

  setAnimation({ fps }: { fps: number } = { fps: 24 }) {
    /*
     * requestAnimationFrame pattern
     */
    const startTime = performance.now();
    let lastFrame = 0;
    const loop = () => {
      const timeDiff = performance.now() - startTime;
      const frame = Math.ceil(timeDiff / (1000 / fps));

      if (lastFrame < frame) {
        Object.values(filters)
          .filter(({ enabled, random, properties }) => enabled && random && properties)
          .forEach(({ filter, properties }) => {
            if (!properties) {
              return;
            }
            properties.forEach(({ key, min, max }) => {
              const value = Math.floor((max - min) * Math.random());
              (filter as any)[key] = value;
            });
          });
        (filters.swell.filter as any).timer += 1;
        (filters.twist.filter as any).timer += 1;
        lastFrame = frame;
        this.renderer.render(this.stage);
      }

      requestAnimationFrame(loop);
    };

    return requestAnimationFrame(loop);
  }

  onImageLoad() {
    this.setTextureToStage(PIXI.loader.resources.woman.texture.clone());
    this.renderer.render(this.stage);
  }

  setTextureToStage(texture: PIXI.Texture) {
    const sprite = new PIXI.Sprite(texture);
    sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);
    // これから貼るspriteをrendererの幅いっぱいにする

    const rendererRatio = { x: 1, y: this.renderer.height / this.renderer.width };
    const textureRatio = { x: 1, y: texture.height / texture.width };

    if (textureRatio.y < rendererRatio.y) {
      // 画面の縦の比率より、画像の縦の比率が小さい
      // そのままだと横が余るので、横をあわせる
      sprite.width = texture.width * this.renderer.height / texture.height;
      sprite.height = this.renderer.height;
      sprite.position.set(sprite.width / -2 + this.renderer.width / 2, 0);
    } else {
      // 画面の縦の比率より、画像の縦の比率が大きい
      // そのままだと縦が余るので、縦をあわせる
      sprite.width = this.renderer.width;
      sprite.height = texture.height * this.renderer.width / texture.width;
      sprite.position.set(0, sprite.height / -2 + this.renderer.height / 2);
    }

    this.stage.addChild(sprite);
  }

  handleChangeSourceSelect() {
    this.stage.removeChildren();

    const matcher = this.sourceSelectElement.value.match(/^preset-(.+)/);
    if (matcher) {
      this.setTextureToStage(PIXI.loader.resources[matcher[1]].texture.clone());
    } else if (this.sourceSelectElement.value === 'camera') {
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
    } else if (this.sourceSelectElement.value === 'upload') {
      if (!this.uploadImageCanvas) {
        return;
      }
      this.setTextureToStage(PIXI.Texture.fromCanvas(this.uploadImageCanvas));
    }

    this.renderer.render(this.stage);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  // main.setAnimation();
  main.updateFilters();

  window.addEventListener('keypress', main.handleKeyPress.bind(main));
});
