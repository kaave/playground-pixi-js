// FIXME: not enabled

import { Filter, UniformData } from 'pixi.js';

const fragment = `
precision mediump float;
uniform sampler2D uSampler;
uniform float rand;
uniform float timer;
uniform float val2;
uniform float val3;
uniform vec4 dimensions;
varying vec2 vTextureCoord;
void main (void)
{
  float trueWidth = dimensions.x;
  float trueHeight = dimensions.y;
  vec2 pos = vTextureCoord * vec2(dimensions);
  vec2 texCoord = vec2(max(3.0, min(float(trueWidth), pos.x + sin(pos.y / (153.25 * rand * rand) * rand + rand * val2 + timer * 3.0) * val3)), max(3.0, min(float(trueHeight), pos.y + cos(pos.x/(251.57 * rand * rand) * rand + rand * val2 + timer * 2.4) * val3)- 3.0));
  vec4 col = texture2D(uSampler, texCoord / vec2(dimensions));
  gl_FragColor.rgba = col.rgba;
}
`;

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
    // FIXME: invalid type?
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    // FIXME: invalid type?
    (this.uniforms.rand as any) = value;
  }

  get val2() {
    // FIXME: invalid type?
    return (this.uniforms.val2 as any) as number;
  }

  set val2(value: number) {
    // FIXME: invalid type?
    (this.uniforms.val2 as any) = value;
  }

  get val3() {
    // FIXME: invalid type?
    return (this.uniforms.val3 as any) as number;
  }

  set val3(value: number) {
    // FIXME: invalid type?
    (this.uniforms.val3 as any) = value;
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
