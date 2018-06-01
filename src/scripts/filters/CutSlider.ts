import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/cutSlider.frag';

export interface Props {
  rand: UniformData<number>;
  val1: UniformData<number>;
  val2: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  val1?: UniformData<number>;
  val2?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  rand: { type: '1f', value: 500 },
  val1: { type: '1f', value: 150 },
  val2: { type: '1f', value: 20 },
  dimensions: { type: '4fv', value: [0, 0, 0, 0] }, // no effect
  // dimensions: {
  //   type: '4fv',
  //   value: [
  //     Math.floor(Math.random() * 200),
  //     Math.floor(Math.random() * 200),
  //     Math.floor(Math.random() * 200),
  //     Math.floor(Math.random() * 200),
  //   ],
  // },
};

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  get val1() {
    return (this.uniforms.val1 as any) as number;
  }

  set val1(value: number) {
    (this.uniforms.val1 as any) = value;
  }

  get val2() {
    return (this.uniforms.val2 as any) as number;
  }

  set val2(value: number) {
    (this.uniforms.val2 as any) = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
