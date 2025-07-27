
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angleY = 0;
let dragging = false;
let lastX = 0;

const image = new Image();
image.src = 'couple.png';

const wordList = ['Yêu', 'Thương', 'Như Ý', 'Mãi mãi', 'Hạnh phúc', 'Love you', 'Cố gắng cùng nhau', 'Marry you'];

class Word {
  constructor(text) {
    this.text = text;
    this.reset();
  }
  reset() {
    this.x = Math.random() * 800 - 400;
    this.y = Math.random() * 800 - 400;
    this.z = Math.random() * 800 + 200;
    this.size = Math.random() * 30 + 20;
    this.speed = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.z -= this.speed;
    if (this.z < -200) {
      this.reset();
      this.z = 800;
    }
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const x = this.x * cosY - this.z * sinY;
    const z = this.x * sinY + this.z * cosY;
    const scale = 500 / (z + 800);
    this.screenX = x * scale + canvas.width / 2;
    this.screenY = this.y * scale + canvas.height / 2;
    this.scale = scale;
  }
  draw() {
    ctx.save();
    ctx.font = `${this.size * this.scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(255, 20, 147, 0.8)';
    ctx.shadowBlur = 20;
    ctx.fillStyle = `rgba(255, 20, 147, ${0.9 * this.scale})`;
    ctx.fillText(this.text, this.screenX, this.screenY);
    ctx.restore();
  }
  
}

class ImageParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * 800 - 400;
    this.y = Math.random() * 800 - 400;
    this.z = Math.random() * 800 + 200;
    this.size = Math.random() * 40 + 20;
    this.speed = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.z -= this.speed;
    if (this.z < -200) {
      this.reset();
      this.z = 800;
    }
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const x = this.x * cosY - this.z * sinY;
    const z = this.x * sinY + this.z * cosY;
    const scale = 500 / (z + 800);
    this.screenX = x * scale + canvas.width / 2;
    this.screenY = this.y * scale + canvas.height / 2;
    this.scale = scale;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = 0.85 * this.scale;
    ctx.drawImage(image, this.screenX, this.screenY, this.size * this.scale, this.size * this.scale);
    ctx.restore();
  }
}

const words = Array.from({ length: 80 }, () => new Word(wordList[Math.floor(Math.random() * wordList.length)]));
const images = Array.from({ length: 30 }, () => new ImageParticle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  images.forEach(img => {
    img.update();
    img.draw();
  });
  words.forEach(w => {
    w.update();
    w.draw();
  });
  requestAnimationFrame(animate);
}

image.onload = () => {
  animate();
};

canvas.addEventListener('mousedown', (e) => {
  dragging = true;
  lastX = e.clientX;
});
canvas.addEventListener('mouseup', () => {
  dragging = false;
});
canvas.addEventListener('mousemove', (e) => {
  if (dragging) {
    let dx = e.clientX - lastX;
    angleY += dx * 0.005;
    lastX = e.clientX;
  }
});
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
