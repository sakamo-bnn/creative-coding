let c; // キャンバス
const boxSize = 7;
const boxNum = 100;

function setup() {
  c = createCanvas(600, 600, WEBGL);
  // debugMode(AXES, 2000, 0, 0, 0);

  camera(-50, 100, -200, 0, 0, 0, 0, -1, 0);
  colorMode(HSB, boxNum, 100, 100);
}

function draw() {
  // orbitControl();

  background(255);
  strokeWeight(1);
  noFill();

  for (let i = 1; i <= boxNum; i++) {
    // stroke(i - 1, 100, 100);
    box(boxSize * i);
  }
}

function mousePressed() {
  saveCanvas(c, '動作結果', 'jpg');
}