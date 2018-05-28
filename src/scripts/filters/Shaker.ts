import { Filter, UniformData } from 'pixi.js';

const fragment = `
precision mediump float;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
uniform vec2 blur;
uniform vec4 dimensions;
void main (void)
{
   vec4 col = texture2D(uSampler, vTextureCoord);
   float pix_w = 1.0 / dimensions.x;
   float pix_h = 1.0 / dimensions.y;
   vec4 col_s[5], col_s2[5];
   for (int i = 0;i < 5;i++){
       col_s[i] = texture2D(uSampler, vTextureCoord + vec2(-pix_w * float(i) * blur.x, -pix_h * float(i) * blur.y));
       col_s2[i] = texture2D(uSampler, vTextureCoord + vec2( pix_w * float(i) * blur.x, pix_h * float(i) * blur.y));
   }
   col_s[0] = (col_s[0] + col_s[1] + col_s[2] + col_s[3] + col_s[4])/5.0;
   col_s2[0]= (col_s2[0] + col_s2[1] + col_s2[2] + col_s2[3] + col_s2[4])/5.0;
   col = (col_s[0] + col_s2[0]) / 2.0;
   gl_FragColor.rgba = col.rgba;
}
`;

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
    // FIXME: invalid type?
    return (this.uniforms.blur as any)[0] as number;
  }

  set blurX(value: number) {
    // FIXME: invalid type?
    (this.uniforms.blur as any)[0] = value;
  }

  get blurY() {
    // FIXME: invalid type?
    return (this.uniforms.blur as any)[1] as number;
  }

  set blurY(value: number) {
    // FIXME: invalid type?
    (this.uniforms.blur as any)[1] = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...args, ...defaultProps } as any);
  }
}
