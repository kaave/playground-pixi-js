import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/noise.frag';

export interface Props {
  rand: UniformData<number>;
  strength: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  strength?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  rand: { type: '1f', value: 1.5 },
  strength: { type: '1f', value: 0.25 },
  // dimensions: { type: '4fv', value: [0, 0, 0, 0] }, // no effect
  dimensions: {
    type: '4fv',
    value: [
      Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 30),
    ],
  },
};

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  get strength() {
    return (this.uniforms.rand as any) as number;
  }

  set strength(value: number) {
    (this.uniforms.rand as any) = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
