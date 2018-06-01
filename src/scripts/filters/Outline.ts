import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/outline.frag';

export interface Props {
  dimensions: UniformData<number[]>;
}

interface Args {
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  // dimensions: { type: '4fv', value: [0, 0, 0, 0] }, // no effect
  dimensions: {
    type: '4fv',
    value: [200, 200, 200, 200],
  },
};

export default class extends Filter<Props> {
  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
