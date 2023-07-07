// ふにゃふにゃ多角形の鋭角頂点
const vertexNum = 5;

function setup() {
  createCanvas(600, 600);

  // 描画関連の初期化
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight); // キャンバスの作成
  colorMode(HSB, 100, 100, 100, 100); // 色の設定
}

function draw() {
  background(0);

  stroke(frameCount % 100, 50, 100);
  noFill();

  translate(width / 2, height / 2);
  rotate(frameCount * noise(0.01 * frameCount));

  // 最初に定義した3つの頂点を
  // 再び頂点として追加することで滑らかに描画できる
  beginShape();
  for (let i = 0; i < vertexNum * 2 + 3; i++) {
    let radius;
    if (i % 2 == 1) {
      radius = noise(0.1 * frameCount) * 100;
    } else {
      radius = noise(0.01 * frameCount) * 50;
    }

    let v = PCStoRCS(radius, (360 / vertexNum / 2) * i);
    curveVertex(v.x, v.y);
  }
  endShape();
}

// 極座標系からデカルト座標系への変換
function PCStoRCS(r, theta) {
  return createVector(r * cos(theta), r * sin(theta));
}
