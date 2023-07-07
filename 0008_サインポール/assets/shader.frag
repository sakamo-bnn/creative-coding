precision highp float; // float の精度: [lowp, mediump, highp]

uniform vec2 resolution;  // 描画領域のサイズを宣言する

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy / 2.0; // 0.0 ～ 1.0 に正規化
  uv.x *= resolution.x / resolution.y;
  vec3 color = vec3(1.0);

  /* トリコロールの赤と青 */
  if(((uv.x - 1.0 < uv.y) && (uv.y < uv.x - 0.75)) ||
    ((uv.x < uv.y) && (uv.y < uv.x + 0.25))) {
    color = vec3(1.0, 0.0, 0.0);
  } else if(((uv.x - 0.5 < uv.y) && (uv.y < uv.x - 0.25)) ||
    ((uv.x + 0.5 < uv.y) && (uv.y < uv.x + 0.75))) {
    color = vec3(0.0, 0.0, 1.0);
  }

  gl_FragColor = vec4(color, 1.0); // 色の格納先
}