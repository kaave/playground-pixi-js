import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/swell.frag';

export interface Props {
  rand: UniformData<number>;
  timer: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  timer?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  rand: { type: '1f', value: 0.5 },
  timer: { type: '1f', value: 0 },
  // dimensions: { type: '4fv', value: [0, 0, 0, 0] }, // no effect
  dimensions: {
    type: '4fv',
    value: [1000, 500, 500, 500],
  },
};

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  get timer() {
    return (this.uniforms.timer as any) as number;
  }

  set timer(value: number) {
    (this.uniforms.timer as any) = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
