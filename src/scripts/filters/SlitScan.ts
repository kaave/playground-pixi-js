// TODO: not enable

import { Filter, UniformData } from 'pixi.js';

const fragment = `
precision mediump float;
uniform float rand;
uniform vec4 dimensions;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
void main (void)
{
  float slit_h = rand;
  vec2 pos = vTextureCoord * vec2(dimensions);
  vec2 texCoord = vec2(3.0+floor(pos.x/slit_h)*slit_h ,pos.y);
  vec4 col = texture2D(uSampler, texCoord / vec2(dimensions));
  gl_FragColor.rgba = col.rgba;
}
`;

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
    // FIXME: invalid type?
    return (this.uniforms.blur as any) as number;
  }

  set blur(value: number) {
    // FIXME: invalid type?
    (this.uniforms.blur as any) = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...args, ...defaultProps } as any);
  }
}
