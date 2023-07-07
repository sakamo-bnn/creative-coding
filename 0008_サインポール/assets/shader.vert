attribute vec3 aPosition; // 頂点の位置情報
attribute vec2 aTexCoord; // p5jsから頂点シェーダへのデータ共有
varying vec2 vTexCoord;   // 頂点シェーダとフラグメントシェーダ間の共有

void main() {
  vTexCoord = aTexCoord; // フラグメントシェーダへの共有

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}