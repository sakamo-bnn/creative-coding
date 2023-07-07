const largestRadius = 100;
// const largestRadius = 10;
const largestSize = 3;
const angularVelocity = 0.5;
const recursionMaxLevel = 5;
let c;
function setup() {
  c = createCanvas(w = 600, w);
  angleMode(DEGREES);
  background(0);
  colorMode(HSB, 360, 1, 1)
}
let start = false;
function draw() {

  if (start) {
    push();
    translate(width / 2, height / 2);
    rotate(-90);
    reflexiveRevolution(largestRadius, largestSize, angularVelocity, 0, recursionMaxLevel);
    // rotate(180);
    // reflexiveRevolution(largestRadius, largestSize, angularVelocity, 0, recursionMaxLevel);

    pop();
  }
}

// 公転関数(再帰型)
function reflexiveRevolution(radius, size, velocity, level, maxLevel) {
  // let smallRate = 0.5;
  let smallRate = 2;
  if (level == maxLevel) {
    return;
  }

  let route = PCStoRCS(radius, velocity * frameCount);

  push();
  translate(route.x, route.y);

  strokeWeight(size);
  stroke((frameCount / 2 + 360 / maxLevel * level) % 360, 1, 1);
  point(0, 0);

  reflexiveRevolution(radius / smallRate, size, -velocity * 2, level + 1, maxLevel);

  pop();
}

// 極座標系からデカルト座標系への変換
function PCStoRCS(r, theta) {
  return createVector(r * cos(theta), r * sin(theta));
}

function mousePressed() {
  if (mouseX > 0 && mouseY > 0) {
    start = true;
    background(0);
    frameCount = 0;
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseY > 0) {
    start = true;
    background(0);
    frameCount = 0;
  }
  saveCanvas(c, '動作結果', 'jpg');
}