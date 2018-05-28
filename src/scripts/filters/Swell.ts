// FIXME: not enabled

import { Filter, UniformData } from 'pixi.js';

const fragment = `
precision mediump float;
uniform float rand;
uniform float timer;
uniform vec4 dimensions;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
void main (void)
{
  vec2 pos = vTextureCoord * vec2(dimensions);
  vec2 sampleFrom = (pos + vec2(sin(pos.y * 0.03 + timer * 20.0) * (6.0 + 12.0 * rand), 0)) / vec2(dimensions);
  vec4 col_s = texture2D(uSampler, sampleFrom);
  gl_FragColor.rgba = col_s.rgba;
}
`;

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
  dimensions: { type: '4fv', value: [0, 0, 0, 0] },
};

export default class extends Filter<Props> {
  get rand() {
    // FIXME: invalid type?
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    // FIXME: invalid type?
    (this.uniforms.rand as any) = value;
  }

  get timer() {
    // FIXME: invalid type?
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
