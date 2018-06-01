import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/convergence.frag';

export interface Props {
  rand: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps = {
  rand: { type: '1f', value: 0.5 },
  // dimensions: { type: '4fv', value: [0, 0, 0, 0] },  // no effect
  dimensions: {
    type: '4fv',
    value: [
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000),
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

  constructor(args: Args = {}) {
    // TODO: used any
    console.log(defaultProps, args, { ...defaultProps, ...args });
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
