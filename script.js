const stars = document.getElementById("stars");
const intro = document.getElementById("intro");
const heartScene = document.getElementById("heartScene");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");
const emojiSpace = document.getElementById("emojiSpace");
const shootingStars = document.getElementById("shootingStars");

const ctx = stars.getContext("2d");
let W, H;
let particles = [];
let universeTimer;
let messageTimer;

const emojis = ["✨", "⭐", "🌟", "💫", "🪐", "🌙", "🌎", "☄️", "🌌", "⭐", "✨"];

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth;
  H = innerHeight;
  stars.width = W * dpr;
  stars.height = H * dpr;
  stars.style.width = W + "px";
  stars.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createStars();
}

function createStars() {
  particles = [];
  const count = Math.min(260, Math.floor(W * H / 4200));
  for (let i = 0; i < count; i++) {
    particles.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random(), size: Math.random() * 1.8 + 0.3, speed: Math.random() * 0.55 + 0.08, phase: Math.random() * Math.PI * 2 });
  }
}

function drawStars(time) {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.y += p.speed;
    if (p.y > H + 5) { p.y = -5; p.x = Math.random() * W; }
    const twinkle = 0.35 + 0.65 * Math.sin(time * 0.002 + p.phase);
    const alpha = 0.25 + twinkle * 0.7;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size + p.z * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.shadowBlur = p.z > 0.65 ? 8 : 0;
    ctx.shadowColor = "rgba(255,190,240,.9)";
    ctx.fill();
  }
  ctx.shadowBlur = 0;
}

function loop(time) { drawStars(time); requestAnimationFrame(loop); }
function show(el) { [intro, heartScene, message].forEach(x => x.classList.remove("active")); el.classList.add("active"); }

function crearUniverso() {
  emojiSpace.innerHTML = "";
  shootingStars.innerHTML = "";
  for (let i = 0; i < 55; i++) {
    const item = document.createElement("span");
    item.className = "space-emoji";
    item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    item.style.left = Math.random() * 100 + "%";
    item.style.top = Math.random() * 100 + "%";
    item.style.fontSize = (10 + Math.random() * 28) + "px";
    item.style.setProperty("--dur", (7 + Math.random() * 13) + "s");
    item.style.setProperty("--delay", (-Math.random() * 12) + "s");
    item.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
    item.style.setProperty("--zoom", (0.5 + Math.random() * 1.7).toFixed(2));
    emojiSpace.appendChild(item);
  }
  for (let i = 0; i < 9; i++) {
    const meteor = document.createElement("span");
    meteor.className = "meteor";
    meteor.style.top = (Math.random() * 75) + "%";
    meteor.style.left = (Math.random() * 110 - 10) + "%";
    meteor.style.animationDelay = (-Math.random() * 8) + "s";
    meteor.style.animationDuration = (4 + Math.random() * 5) + "s";
    shootingStars.appendChild(meteor);
  }
}

function iniciarViaje() {
  clearTimeout(universeTimer);
  clearTimeout(messageTimer);
  show(heartScene);
  crearUniverso();
  universeTimer = setTimeout(() => { heartScene.classList.add("leaving"); }, 5200);
  messageTimer = setTimeout(() => { heartScene.classList.remove("leaving"); show(message); }, 6500);
}

startBtn.addEventListener("click", iniciarViaje);
replayBtn.addEventListener("click", () => { show(intro); setTimeout(() => { iniciarViaje(); }, 500); });
addEventListener("resize", resize);
resize();
requestAnimationFrame(loop);