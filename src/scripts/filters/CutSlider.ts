import { Filter, UniformData } from 'pixi.js';

const fragment = `
precision mediump float;
uniform sampler2D uSampler;
uniform float rand;
uniform float val1;
uniform float val2;
uniform vec4 dimensions;
varying vec2 vTextureCoord;
void main (void)
{
   vec2 pos = vTextureCoord * vec2(dimensions);
   vec2 posOffset = pos + vec2(floor(sin(pos.y / val1 * rand + rand * rand)) * val2 * rand, 0);
   posOffset = posOffset / vec2(dimensions);
   vec4 col = texture2D(uSampler, posOffset);
   gl_FragColor.rgba = col.rgba;
}
`;

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
  rand: { type: '1f', value: 5 },
  val1: { type: '1f', value: 150 },
  val2: { type: '1f', value: 20 },
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

  get val1() {
    // FIXME: invalid type?
    return (this.uniforms.val1 as any) as number;
  }

  set val1(value: number) {
    // FIXME: invalid type?
    (this.uniforms.val1 as any) = value;
  }

  get val2() {
    // FIXME: invalid type?
    return (this.uniforms.val2 as any) as number;
  }

  set val2(value: number) {
    // FIXME: invalid type?
    (this.uniforms.val2 as any) = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...args, ...defaultProps } as any);
    console.log({ ...args, ...defaultProps });
  }
}
