// 正方形の回転度
const rotateSkipt = 30;
// 正方形の拡大間隔
const widthSkip = 10;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  colorMode(HSB, 1, 100, 100);
  rectMode(CENTER);
  noFill();
}

function draw() {
  background(0);

  push(); // スタイルの退避

  translate(width / 2, height / 2);

  for (let w = width; w > 0; w -= widthSkip) {
    rotate(rotateSkipt);
    stroke(w / width, 100, 100);
    strokeWeight(1 + w / (width / widthSkip));
    rect(0, 0, w, w);
  }

  pop(); // スタイルの復元
}
