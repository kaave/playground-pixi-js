import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/shaker.frag';

export interface Props {
  blur: UniformData<number[]>;
  dimensions: UniformData<number[]>;
}

interface Args {
  blur?: UniformData<number[]>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  blur: { type: '2fv', value: [5, 0] },
  dimensions: { type: '4fv', value: [0, 0, 0, 0] },
};

export default class extends Filter<Props> {
  get blurX() {
    return (this.uniforms.blur as any)[0] as number;
  }

  set blurX(value: number) {
    (this.uniforms.blur as any)[0] = value;
  }

  get blurY() {
    return (this.uniforms.blur as any)[1] as number;
  }

  set blurY(value: number) {
    (this.uniforms.blur as any)[1] = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...args, ...defaultProps } as any);
  }
}
