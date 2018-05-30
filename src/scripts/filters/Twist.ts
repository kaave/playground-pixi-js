import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/twist.frag';

export interface Props {
  rand: UniformData<number>;
  timer: UniformData<number>;
  val2: UniformData<number>;
  val3: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  timer?: UniformData<number>;
  val2?: UniformData<number>;
  val3?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  rand: { type: '1f', value: 0.5 },
  timer: { type: '1f', value: 0 },
  val2: { type: '1f', value: 5 },
  val3: { type: '1f', value: 55 },
  dimensions: { type: '4fv', value: [0, 0, 0, 0] },
};

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  get val2() {
    return (this.uniforms.val2 as any) as number;
  }

  set val2(value: number) {
    (this.uniforms.val2 as any) = value;
  }

  get val3() {
    return (this.uniforms.val3 as any) as number;
  }

  set val3(value: number) {
    (this.uniforms.val3 as any) = value;
  }

  get timer() {
    return (this.uniforms.timer as any) as number;
  }

  set timer(value: number) {
    // FIXME: invalid type?
    (this.uniforms.timer as any) = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...args, ...defaultProps } as any);
  }
}
