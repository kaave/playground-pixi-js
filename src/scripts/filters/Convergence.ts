import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/convergence.frag';

export interface Props {
  rand: UniformData<number>;
  dimensions: UniformData<number[]>;
}

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  constructor(
    { rand, dimensions }: Props = {
      rand: { type: '1f', value: 0.5 },
      dimensions: { type: '4fv', value: [0, 0, 0, 0] },
    },
  ) {
    // TODO: used any
    super(undefined, fragment, { rand, dimensions } as any);
  }
}
