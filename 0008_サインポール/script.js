const VS_PATH = './assets/shader.vert'; // 頂点シェーダーのファイルパス
const FS_PATH = './assets/shader.frag'; // フラグメントシェーダーのファイルパス
let theShader;                          // シェーダーを格納する変数
let shaderTexture;

function preload() {
  theShader = loadShader(VS_PATH, FS_PATH); // シェーダーのロード
}

function setup() {
  createCanvas(w = 600, w, WEBGL);

  shaderTexture = createGraphics(600, 600, WEBGL);
  shaderTexture.noStroke();
}

function draw() {
  camera(
    400, -360, 400,
    0, 0, 0,
    0, 1, 0
  );

  background(100);

  let edge = 200;

  theShader.setUniform('resolution', [width, height]); // シェイダー処理で利用するデータを渡す

  /* 仮想キャンパスshaderTexture上でシェイダーの描画 */
  shaderTexture.shader(theShader);
  shaderTexture.quad(-1, -1, -1, 1, 1, 1, 1, -1);

  /* 上下のアタッチメント */
  push();
  {
    fill(200);

    /* 上のアタッチメント */
    {
      push();
      translate(0, -edge, 0);
      box(edge, edge / 12, edge);
      pop();

      push();
      translate(0, -edge - edge / 12, 0);
      box(edge * 2 / 3, edge / 12, edge * 2 / 3);
      pop();
    }

    /* 下のアタッチメント */
    push();
    translate(0, edge, 0);
    box(edge, edge / 6, edge);
    pop();
  }
  pop();

  /* 回転部分 */
  push();
  {
    noStroke();
    texture(shaderTexture); // シェイダーの描画をテクスチャとして反映する
    rotateY(-frameCount / 20);
    cylinder(edge / PI, edge * 2);
  }
  pop();
}
