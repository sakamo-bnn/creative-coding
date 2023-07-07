/* 極座標を使った螺旋の描画(マウスの座標で変化する) */
// 角度のモード(マウスクリックで変化する)
let angleType;
let rotateSpeed = 0.01; // キャンバスが回転する速度係数

function setup() {
  createCanvas((h = windowHeight) / 9 * 16, windowHeight);
  angleMode(RADIANS);
  angleType = "RADIANS";
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(0);

  push(); // スタイルの退避

  // キャンバスの原点を画面中央へ移動して回転させる
  translate(width / 2, height / 2);
  rotate(rotateSpeed * frameCount);
  for (
    let r = 0, theta = 0;
    r ** 2 < (width / 2) ** 2 + (height / 2) ** 2;
    r += 0.1
  ) {
    // 極座標系からデカルト座標系への変換
    let posi = PCStoRCS(r, theta++);

    // 点の描画
    strokeWeight(5 + map(mouseX, 0, width, 0, 20));
    // strokeWeight(3);
    stroke(r, theta, 100);
    point(posi.x, posi.y);
  }
  pop(); // スタイルの復元
}

/* マウスクリック時のイベント */
function mousePressed() {
  if (angleType == "RADIANS") {
    angleType = "DEGREES";
    angleMode(DEGREES); // 0 ~ 360°
    rotateSpeed = 10;
  } else {
    angleType = "RADIANS";
    angleMode(RADIANS); // π
    rotateSpeed = 0.01;
  }
}

// 極座標系からデカルト座標系への変換
function PCStoRCS(r, theta) {
  return createVector(r * cos(theta), r * sin(theta));
}
