/* 層(=立方体が配置される円周)に関する変数 */
// 1つの層上にあるbox(=立方体)の個数
const boxNum = 40;
// 中心角(boxの大きさに影響する)
let centralAngle = 360 / boxNum * 0.9; // (360 / boxNum)より大きい値の場合，隣接Boxに接触する
// 層間の距離
const distance = 10;
// 層の数
const layerNum = 25;

/* 波に関する変数 */
// 振幅
const amplitude = 50;
// 波の速度
const waveMaxSpeed = 10;
// 波の最低速度
const waveMinSpeed = 0.0;
// 波の速度
let waveSpeed = waveMinSpeed;

/* キャンバスの回転に関する変数 */
// 回転の最高速度
const rotateYMaxSpeed = 1;
// 回転の最低速度
const rotateYMinSpeed = -rotateYMaxSpeed;
// 回転速度
let rotateYSpeed = rotateYMinSpeed;

// 1フレーム前のマウス座標(波とキャンバスの回転を管理する)
let preMouse;

/* 色に関する変数 */
// 色相の最大値(範囲設定)
const hsbMaxValue = {
  h: layerNum,
  s: 100,
  b: 100
};
// 彩度の中心的高さ(0 ～ 1)
const saturationCentralRate = 0.75;
// 輝度の中心的高さ(0 ～ 1)
const brightnessCentralRate = 1;
let c;
function setup() {
  c = createCanvas(w = 600, 400, WEBGL);

  // カメラの設定
  camera(0, -300, 300, 0, 0, 0, 0, 1, 0);

  // 角度の設定(度数法)
  angleMode(DEGREES);

  // 図形描画に関する設定
  noFill();
  colorMode(HSB, hsbMaxValue.h, hsbMaxValue.s, hsbMaxValue.b);

  // 1フレーム前のマウス座標を初期化する
  preMouse = createVector(0, 0);

  background(255);
}

function draw() {
  background(0);
  // orbitControl();

  // mouseXが前フレームと同じであるとき(キャンバスが回転する速度の変化をなるべく滑らかにする)
  if (mouseX == preMouse.x) {
    rotateYSpeed = map(mouseX, 0, width, rotateYMinSpeed, rotateYMaxSpeed);
  }

  // mouseYが前フレームと同じであるとき(波の速度変化をなるべく滑らかにする)
  if (mouseY == preMouse.y) {
    waveSpeed = map(mouseY, 0, height, waveMinSpeed, waveMaxSpeed);
  }

  push();

  // 動作結果撮影用
  // rotateX(90);
  // translate(0, 100, 0);

  rotateY(rotateYSpeed * frameCount);

  // layerNum層だけ描画する
  for (let layer = 1; layer <= layerNum; layer++) {
    // 描画位置(層の半径)
    let r = layer * distance;

    // boxNum個のboxがある層を描画する
    for (let theta = 0; theta < 360; theta += 360 / boxNum) {
      // 座標を変換
      let position = SCStoRCS(r, theta, 90);

      // 波を形成する(y軸方向に波の位相を加算するだけ)
      position.add(
        createVector(
          0,
          amplitude * sin(waveSpeed * frameCount + layer / layerNum * 360),
          0
        )
      );

      // 描画スタイルの退避
      push();

      // 座標系(原点と座標軸の向き)の変更
      translate(position.x, position.y, position.z);
      rotateY(theta)

      // boxの描画
      stroke(
        map(layer, 0, layerNum, 0, hsbMaxValue.h), // 色相: 層毎に違う値
        hsbMaxValue.s * (saturationCentralRate + (1 - saturationCentralRate) * sin(frameCount % 360)), // 彩度: 白 ~ 濃
        hsbMaxValue.b * (brightnessCentralRate + (1 - brightnessCentralRate) * cos(frameCount / 2 % 360)) // 輝度: 黒 ~ 濃
      );
      box(getBoxSize(r, centralAngle));

      // 描画スタイルの復元
      pop();
    }
  }
  pop();

  // 次のフレームに向けて現在のマウス座標を格納する
  preMouse.set(mouseX, mouseY);
}

// 球面座標系(SCS)をデカルト座標系[直交座標系](RCS)に変換する
function SCStoRCS(rho, theta, phi) {
  return createVector(
    rho * sin(phi) * sin(theta),
    rho * cos(phi),
    rho * sin(phi) * cos(theta),
  );
}

// boxの長さを与える
function getBoxSize(r, theta) {
  // 半径rでtheta度における弧の長さの半分を計算する
  return theta / 360 * PI * r;
}
// 動作結果をダウンロードする(c: キャンバスを変数に入れよ)
function mousePressed() {
  // saveCanvas(c, '動作結果', 'jpg');
}