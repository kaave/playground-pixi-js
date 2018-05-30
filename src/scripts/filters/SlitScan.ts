// TODO: not enable

import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/slitScan.frag';

export interface Props {
  blur: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  blur?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  blur: { type: '1i', value: 15 },
  dimensions: { type: '4fv', value: [0, 0, 0, 0] },
};

export default class extends Filter<Props> {
  get blur() {
    return (this.uniforms.blur as any) as number;
  }

  set blur(value: number) {
    (this.uniforms.blur as any) = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...args, ...defaultProps } as any);
  }
}
