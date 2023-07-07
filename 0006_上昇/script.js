// 範囲
let rangeHalf = 50;
// プロットする点の数
let sampleR = 10;
let sampleT = 30;
// 点の幅
let skip = rangeHalf * 2 / sampleR;

let plotBoxes = [[]];
let c;

function setup() {
  c = createCanvas(w = 600, w, WEBGL);

  angleMode(DEGREES);

  for (let r = 0; r < sampleR; r++) {
    let radius = (r + 1) * skip

    plotBoxes.push([]);

    for (let t = 0; t < sampleT; t++) {
      let theta = t * 360 / sampleT;

      plotBoxes[r].push(new PlotBox(radius, theta, -0.1));
    }
  }
}

function draw() {
  camera(
    cos(1 * frameCount) * 120, 120, sin(1 * frameCount) * 120,
    // cos(1 * frameCount) * 120, -120, sin(1 * frameCount) * 120, // 動作結果用
    0, 0, 0,
    0, -1, 0
  );

  // rotate(180);
  background(0);

  for (let r = 0; r < sampleR; r++) {
    for (let t = 0; t < sampleT; t++) {
      plotBoxes[r][t].update(sampleR * skip)
    }
  }
}

// 動作結果をダウンロードする(c: キャンバスを変数に入れよ)
function mousePressed() {
  saveCanvas(c, '動作結果', 'jpg');
}

class PlotBox {
  constructor(r, t, v) {
    this.radius = r;
    this.theta = t;
    this.posi = this.PCStoRCS(this.radius, this.theta);
    this.velocity = v;
  }

  update(nextRadius) {
    if ((this.posi.x ** 2 + this.posi.z ** 2) < 0.5) {
      this.radius = nextRadius;
    }
    //  点の移動
    this.radius += this.velocity;
    this.posi = this.PCStoRCS(this.radius, this.theta);

    // y座標の計算
    let denominator = this.posi.x ** 2 + this.posi.z ** 2;
    this.posi = this.getPosition(this.posi.x, this.posi.z, denominator);

    push();
    translate(this.posi);
    stroke(200, 200, 255);
    box(0.5);
    pop();
  }

  // 極座標系からデカルト座標系への変換(xz平面)
  PCStoRCS(r, theta) {
    return createVector(r * cos(theta), 0, r * sin(theta));
  }

  // 以下の式を返す(denominator: 分母)
  // y = 1000 / (x^2 + z^2)
  getPosition(x, z, denominator) {
    let y = 0;

    if (denominator != 0) {
      y = 10000 / denominator;
    }

    // return createVector(x, -y, z); // 動作結果用
    return createVector(x, y, z);
  }
}