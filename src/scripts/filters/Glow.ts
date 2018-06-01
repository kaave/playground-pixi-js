import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/glow.frag';

export interface Props {
  blur: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  blur?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  blur: { type: '1i', value: 8 },
  // dimensions: { type: '4fv', value: [0, 0, 0, 0] }, // no effect
  dimensions: {
    type: '4fv',
    value: [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ],
  },
};

export default class extends Filter<Props> {
  get blur() {
    return (this.uniforms.blur as any) as number;
  }

  set blur(value: number) {
    (this.uniforms.blur as any) = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
