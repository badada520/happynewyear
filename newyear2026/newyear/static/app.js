const pages = {
  intro: document.getElementById("page-intro"),
  transition: document.getElementById("page-transition"),
  draw: document.getElementById("page-draw"),
  bless: document.getElementById("page-bless"),
  game: document.getElementById("page-game"),
  share: document.getElementById("page-share"),
};

const nameInput = document.getElementById("name-input");
const nameHint = document.getElementById("name-hint");
const introBtn = document.getElementById("intro-btn");
const authLine = document.getElementById("auth-line");
const welcomeLine = document.getElementById("welcome-line");
const transitionBtn = document.getElementById("transition-btn");
const transitionTrain = document.getElementById("train");
const drawTitle = document.getElementById("draw-title");
const drawBtn = document.getElementById("draw-btn");
const jar = document.getElementById("jar");
const fortuneCard = document.getElementById("fortune-card");
const fortunePhotoWrap = document.getElementById("fortune-photo-wrap");
const fortuneTextWrap = document.getElementById("fortune-text-wrap");
const fortunePhoto = document.getElementById("fortune-photo");
const fortuneShowText = document.getElementById("fortune-show-text");
const fortuneTitle = document.getElementById("fortune-title");
const fortunePoem = document.getElementById("fortune-poem");
const fortuneExp = document.getElementById("fortune-exp");
const saveCard = document.getElementById("save-card");
const fortuneRedraw = document.getElementById("fortune-redraw");
const openBless = document.getElementById("open-bless");
const movieOpen1 = document.getElementById("movie-open-1");
const movieOpen2 = document.getElementById("movie-open-2");
const movieOpen3 = document.getElementById("movie-open-3");
const movieMain = document.getElementById("movie-main");
const movieVoice = document.getElementById("movie-voice");
const toShare = document.getElementById("to-share");
const copyLink = document.getElementById("copy-link");
const retryDraw = document.getElementById("retry-draw");
const backHome = document.getElementById("back-home");
const shareStatus = document.getElementById("share-status");
const shareFooter = document.getElementById("share-footer");
const appRoot = document.getElementById("app");
const blessBgm = document.getElementById("bless-bgm");
const fireworksCanvas = document.getElementById("fireworks-canvas");
const openGame = document.getElementById("open-game");
const gameMenu = document.getElementById("game-menu");
const gameAreaTapCatch = document.getElementById("game-area-tap-catch");
const gameAreaMemory = document.getElementById("game-area-memory");
const gameCanvas = document.getElementById("game-canvas");
const gameTimerText = document.getElementById("game-timer");
const gameScoreText = document.getElementById("game-score");
const gameResultText = document.getElementById("game-result");
const gameStartBtn = document.getElementById("game-start");
const gameBackBtn = document.getElementById("game-back");
const enterGameTap = document.getElementById("enter-game-tap");
const enterGameCatch = document.getElementById("enter-game-catch");
const enterGameMemory = document.getElementById("enter-game-memory");
const gameBackFromMenu = document.getElementById("game-back-from-menu");
const memoryGrid = document.getElementById("memory-grid");
const memoryTimerText = document.getElementById("memory-timer");
const memoryStepText = document.getElementById("memory-step");
const memoryResultText = document.getElementById("memory-result");
const memoryRestartBtn = document.getElementById("memory-restart");
const memoryBackBtn = document.getElementById("memory-back");
const gameResultOverlay = document.getElementById("game-result-overlay");
const gameResultTitle = document.getElementById("game-result-title");
const gameResultDetail = document.getElementById("game-result-detail");
const gameSaveShot = document.getElementById("game-save-shot");
const gameResultClose = document.getElementById("game-result-close");
const luckDecor = document.getElementById("luck-decor");
const soundToggle = document.getElementById("sound-toggle");

const BG_CLASSES = ["bg-intro", "bg-transition", "bg-draw", "bg-bless", "bg-game", "bg-share"];

let userName = "";
let currentFortune = null;
let isDrawing = false;
let audioContext = null;
let bgmNodes = [];
let soundEnabled = true;

let extraLuckLevel = 0;

let gameCtx = null;
let gameWidth = 0;
let gameHeight = 0;
let gameRunning = false;
let gameTimeLeft = 0;
let gameScore = 0;
let gameTarget = null;
let gameTimerId = null;
let gameMode = null;
let catchItems = [];
let catchPlayerX = 0;
let catchPlayerY = 0;
let catchFrameId = null;
let catchSpawnTick = 0;
let lastGameShot = null;

let memoryCards = [];
let memoryFirstCard = null;
let memoryLock = false;
let memoryMatchedCount = 0;
let memorySteps = 0;
let memoryTimerId = null;
let memoryTime = 0;
let memoryRunning = false;

let fwCtx = null;
let fwWidth = 0;
let fwHeight = 0;
let fwFireworks = [];
let fwParticles = [];
let fwTick = 0;
let fwRunning = false;
let fwFrameId = null;

const fortunes = [
  {
    title: "马到成功",
    poem: ["千里良驹任驰骋，", "【name】此去事皆成。", "春风得意开新运，", "一路坦途万里程。"],
    exp: ["事业：如骏马奔腾，行动力拉满，想做的事现在就是最好的时机。", "生活：烦恼被甩在身后，自由自在，所到之处皆是风景。"],
  },
  {
    title: "龙马精神",
    poem: ["金鞍玉勒渡新春，", "元气满满精气神。", "【name】自有凌云志，", "福寿安康伴此身。"],
    exp: ["健康：身体倍儿棒，熬夜不垮，吃嘛嘛香。", "财运：付出必有回报，口袋充实，且花且有。"],
  },
  {
    title: "一马平川",
    poem: ["旧岁崎岖皆已过，", "眼前大道任穿梭。", "【name】本是有福人，", "好事连连乐呵呵。"],
    exp: ["运势：水逆退散，以前觉得难的事，今年会变得格外简单。", "缘分：会遇到懂你的人，无论是朋友还是爱人。"],
  },
  {
    title: "倚马千言",
    poem: ["文思泉涌似流星，", "【name】落笔如有神。", "胸藏锦绣通大道，", "金榜题名事事顺。"],
    exp: ["学业/事业：思维敏捷，难题迎刃而解，无论是考试还是什么，都能一气呵成。", "创作：灵感爆棚，不再卡壳，所有的想法都能完美落地。"],
  },
  {
    title: "天马行空",
    poem: ["金鞭指处是通途，", "【name】乘风绘蓝图。", "旧规旧矩皆打破，", "自在逍遥乐无忧。"],
    exp: ["生活：打破常规，生活充满新鲜感，会有很多有趣的新体验。", "心态：告别内耗，活得潇洒自在，拥有“说走就走”的勇气和自由。"],
  },
  {
    title: "玉堂金马",
    poem: ["门前喜鹊叫喳喳，", "【name】好运到谁家。", "忽遇贵人来指路，", "金银财宝进账啦。"],
    exp: ["财运：正财稳健，偏财有喜，投资理财眼光独到。", "贵人运：关键时刻总有人帮，职场或学业上能遇到赏识你的伯乐。"],
  },
  {
    title: "并辔追星",
    poem: ["天骥昂首啸春风，", "【name】绝尘志气雄。", "巴陵仙姿惊鸿现，", "你如神骏亦如虹。"],
    exp: [
      "🐎 追星运：见面运Max！今年极易在活动中近距离见到迪丽热巴，抢票必中，甚至可能收获眼神对视或签名，圆梦就在眼前。",
      "💫 自信力：以她为光，成为更好的自己。像神骏一样奔跑，变美变优秀，你也能在自己的领域里闪闪发光。",
    ],
  },
];

function showPage(target) {
  Object.values(pages).forEach((page) => page.classList.remove("active"));
  pages[target].classList.add("active");
  if (appRoot) {
    appRoot.classList.remove(...BG_CLASSES);
    if (target === "intro") appRoot.classList.add("bg-intro");
    if (target === "transition") appRoot.classList.add("bg-transition");
    if (target === "draw") appRoot.classList.add("bg-draw");
    if (target === "bless") appRoot.classList.add("bg-bless");
    if (target === "game") appRoot.classList.add("bg-game");
    if (target === "share") appRoot.classList.add("bg-share");
  }
  if (target === "transition") {
    startTransition();
  }
  if (target === "draw") {
    fortuneCard.classList.add("hidden");
    updateDrawTitle();
  }
  if (target === "bless") {
    startBlessing();
  }
  if (target === "share") {
    updateShare();
  }
}

function updateDrawTitle() {
  const displayName = userName || "你";
  drawTitle.textContent = `${displayName}，抽一支你的新年上上签`;
}

function typeText(element, text, speed = 80) {
  element.textContent = "";
  return new Promise((resolve) => {
    let index = 0;
    const timer = setInterval(() => {
      element.textContent += text[index];
      index += 1;
      if (index >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

function startTransition() {
  authLine.textContent = "";
  welcomeLine.textContent = "";
  transitionBtn.classList.add("hidden");
  const displayName = userName || "你";
  playWhoosh();
  if (transitionTrain) {
    transitionTrain.classList.remove("train-run");
    void transitionTrain.offsetWidth;
    transitionTrain.classList.add("train-run");
    playTrainRumble();
  }
  typeText(authLine, "身份确认中...", 90)
    .then(() => typeText(welcomeLine, `欢迎你，${displayName}！`, 90))
    .then(() => {
      transitionBtn.classList.remove("hidden");
    });
}

function openAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playBeep() {
  if (!soundEnabled) {
    return;
  }
  const ctx = openAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 880;
  gain.gain.value = 0.05;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

function playWhoosh() {
  if (!soundEnabled) {
    return;
  }
  const ctx = openAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.36);
}

function playShake() {
  if (!soundEnabled) {
    return;
  }
  const ctx = openAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = 180;
  gain.gain.value = 0.03;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.18);
}

function playDing() {
  if (!soundEnabled) {
    return;
  }
  const ctx = openAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
  gain.gain.value = 0.05;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.22);
}

function playTrainRumble() {
  if (!soundEnabled) {
    return;
  }
  const ctx = openAudioContext();
  const base = ctx.currentTime;
  for (let i = 0; i < 4; i += 1) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t0 = base + i * 0.22;
    osc.type = "square";
    osc.frequency.value = 90;
    gain.gain.setValueAtTime(0.0, t0);
    gain.gain.linearRampToValueAtTime(0.06, t0 + 0.04);
    gain.gain.linearRampToValueAtTime(0.0, t0 + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.18);
  }
}

function playSlipAnimation(onDone) {
  const jarRect = jar.getBoundingClientRect();
  const rootRect = appRoot.getBoundingClientRect();
  const slip = document.createElement("div");
  slip.className = "slip-fly";
  const centerX = jarRect.left + jarRect.width / 2 - rootRect.left;
  const startY = jarRect.top + jarRect.height * 0.3 - rootRect.top;
  slip.style.left = `${centerX}px`;
  slip.style.top = `${startY}px`;
  appRoot.appendChild(slip);
  slip.addEventListener(
    "animationend",
    () => {
      appRoot.removeChild(slip);
      if (onDone) {
        onDone();
      }
    },
    { once: true }
  );
}

function fwRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function fwDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

class FWFirework {
  constructor(startX) {
    this.x = startX !== undefined ? startX : fwRandom(fwWidth * 0.1, fwWidth * 0.9);
    this.y = fwHeight;
    this.tx = this.x + fwRandom(-20, 20);
    this.ty = fwRandom(fwHeight * 0.15, fwHeight * 0.45);
    this.speed = fwRandom(12, 20);
    this.lineWidth = fwRandom(3, 6);
    this.hue = fwRandom(0, 360);
    this.brightness = fwRandom(50, 80);
    this.distToTarget = fwDistance(this.x, this.y, this.tx, this.ty);
    this.distTraveled = 0;
    this.coordinates = [];
    this.coordinateCount = 3;
    while (this.coordinateCount > 0) {
      this.coordinates.push([this.x, this.y]);
      this.coordinateCount -= 1;
    }
    this.angle = Math.atan2(this.ty - this.y, this.tx - this.x);
    this.acceleration = 1.015;
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.speed *= this.acceleration;
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.distTraveled = fwDistance(this.x, this.y, this.x + vx, this.y + vy) + this.distTraveled;
    if (this.distTraveled >= this.distToTarget) {
      fwCreateParticles(this.tx, this.ty, this.hue);
      fwFireworks.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  }

  draw() {
    fwCtx.beginPath();
    const last = this.coordinates[this.coordinates.length - 1];
    fwCtx.moveTo(last[0], last[1]);
    fwCtx.lineTo(this.x, this.y);
    fwCtx.lineWidth = this.lineWidth;
    fwCtx.strokeStyle = `hsl(${this.hue}, 100%, 60%)`;
    fwCtx.stroke();
    fwCtx.lineWidth = 1;
  }
}

class FWParticle {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.coordinates = [];
    this.coordinateCount = 6;
    while (this.coordinateCount > 0) {
      this.coordinates.push([this.x, this.y]);
      this.coordinateCount -= 1;
    }
    this.hue = hue;
    this.alpha = 1;
    const angle = fwRandom(0, Math.PI * 2);
    const speed = fwRandom(3, 18);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.friction = 0.96;
    this.gravity = 0.04;
    this.decay = fwRandom(0.01, 0.02);
    this.brightness = fwRandom(50, 80);
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= this.decay) {
      fwParticles.splice(index, 1);
    }
  }

  draw() {
    fwCtx.beginPath();
    const last = this.coordinates[this.coordinates.length - 1];
    fwCtx.moveTo(last[0], last[1]);
    fwCtx.lineTo(this.x, this.y);
    fwCtx.lineWidth = 3;
    fwCtx.strokeStyle = `hsla(${this.hue}, 100%, 60%, ${this.alpha})`;
    fwCtx.stroke();
  }
}

function fwCreateParticles(x, y, hue) {
  let count = 120;
  while (count > 0) {
    fwParticles.push(new FWParticle(x, y, hue));
    count -= 1;
  }
}

function fwResize() {
  if (!fireworksCanvas) {
    return;
  }
  const rect = fireworksCanvas.getBoundingClientRect();
  fwWidth = rect.width;
  fwHeight = rect.height;
  fireworksCanvas.width = fwWidth;
  fireworksCanvas.height = fwHeight;
}

function fwLoop() {
  if (!fwRunning || !fwCtx) {
    return;
  }
  fwFrameId = window.requestAnimationFrame(fwLoop);
  fwCtx.globalCompositeOperation = "source-over";
  fwCtx.fillStyle = "rgba(0,0,0,0.12)";
  fwCtx.fillRect(0, 0, fwWidth, fwHeight);
  fwCtx.globalCompositeOperation = "lighter";
  let i = fwFireworks.length - 1;
  while (i >= 0) {
    fwFireworks[i].draw();
    fwFireworks[i].update(i);
    i -= 1;
  }
  let j = fwParticles.length - 1;
  while (j >= 0) {
    fwParticles[j].draw();
    fwParticles[j].update(j);
    j -= 1;
  }
  fwTick += 1;
  if (fwTick >= 24) {
    fwFireworks.push(new FWFirework(fwRandom(fwWidth * 0.1, fwWidth * 0.3)));
    fwFireworks.push(new FWFirework(fwRandom(fwWidth * 0.7, fwWidth * 0.9)));
    fwTick = 0;
  }
}

function startFireworks() {
  if (!fireworksCanvas) {
    return;
  }
  if (!fwCtx) {
    fwCtx = fireworksCanvas.getContext("2d");
    window.addEventListener("resize", fwResize);
  }
  fwResize();
  fwRunning = true;
  if (!fwFrameId) {
    fwLoop();
  }
}

function stopFireworks() {
  fwRunning = false;
  if (fwFrameId) {
    window.cancelAnimationFrame(fwFrameId);
    fwFrameId = null;
  }
  if (fwCtx) {
    fwCtx.clearRect(0, 0, fwWidth, fwHeight);
  }
  fwFireworks = [];
  fwParticles = [];
}

function startBgm() {
  if (!soundEnabled) {
    return;
  }
  if (blessBgm && blessBgm.src) {
    blessBgm.currentTime = 0;
    blessBgm.volume = 0.7;
    blessBgm.play().catch(() => {});
    return;
  }
  if (bgmNodes.length) {
    return;
  }
  const ctx = openAudioContext();
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.type = "sine";
  osc2.type = "sine";
  osc1.frequency.value = 196;
  osc2.frequency.value = 246.94;
  gain.gain.value = 0.03;
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  osc1.start();
  osc2.start();
  bgmNodes = [osc1, osc2, gain];
}

function stopBgm() {
  if (blessBgm) {
    blessBgm.pause();
  }
  if (!bgmNodes.length) {
    return;
  }
  bgmNodes.forEach((node) => {
    if (node.stop) {
      node.stop();
    }
  });
  bgmNodes = [];
}

function buildFortune(name) {
  const index = Math.floor(Math.random() * fortunes.length);
  const fortune = fortunes[index];
  const replacedPoem = fortune.poem.map((line) => line.replace("【name】", name));
  const replacedExp = fortune.exp.join("\n");
  return { ...fortune, poemText: replacedPoem.join("\n"), expText: replacedExp, index };
}

function showFortune() {
  const displayName = userName || "你";
  currentFortune = buildFortune(displayName);
  if (fortunePhotoWrap && fortuneTextWrap) {
    fortunePhotoWrap.classList.remove("hidden");
    fortuneTextWrap.classList.add("hidden");
  }
  if (fortunePhoto && currentFortune && typeof currentFortune.index === "number") {
    const imgIndex = currentFortune.index + 1;
    fortunePhoto.src = `image/fortune-${imgIndex}.jpg`;
  }
  fortuneTitle.textContent = `【${currentFortune.title}】`;
  fortunePoem.textContent = currentFortune.poemText;
  fortuneExp.textContent = currentFortune.expText;
  fortuneCard.classList.remove("hidden");
}

function startBlessing() {
  movieOpen1.textContent = "";
  movieOpen2.textContent = "";
  movieOpen3.textContent = "";
  movieMain.textContent = "";
  movieVoice.textContent = "";
  const displayName = userName || "你";
  if (luckDecor) {
    if (extraLuckLevel > 0) {
      luckDecor.classList.remove("hidden");
    } else {
      luckDecor.classList.add("hidden");
    }
  }
  startFireworks();
  startBgm();
  typeText(movieOpen1, "2026年 新的一年", 80)
    .then(() => typeText(movieOpen2, `献给${displayName}的新年祝福`, 80))
    .then(() => typeText(movieOpen3, " ", 80))
    .then(() =>
      typeText(
        movieMain,
        "愿你以梦为马，不负韶华。\n\n愿你马不停蹄，奔赴热爱。",
        40
      )
    )
    .then(() =>
      typeText(
        movieVoice,
        `亲爱的${displayName}，\n在过去的日子里，你辛苦了。\n2026年，愿你拥有“马”的速度与力量，\n去奔跑，去拥抱，去成为更好的自己。爱你老己！`,
        28
      )
    );
}

function updateShare() {
  const displayName = userName || "你";
  let text = `感谢${displayName}参与本次新年之旅 | 2026 马年大吉 暴富暴富暴富\n    ————来自mj的祝福`;
  if (extraLuckLevel > 0) {
    text += ` | 已解锁迷你游戏好运加成 ×${extraLuckLevel}`;
  }
  shareFooter.textContent = text;
}

function flashEffect() {
  appRoot.classList.add("flash");
  setTimeout(() => appRoot.classList.remove("flash"), 500);
}

function setName(value) {
  userName = value.trim();
  introBtn.disabled = !userName;
  nameHint.textContent = userName ? "" : "还没告诉我你的名字呢~";
}

nameInput.addEventListener("input", (event) => {
  setName(event.target.value);
});

introBtn.addEventListener("click", () => {
  if (!userName) {
    nameHint.textContent = "还没告诉我你的名字呢~";
    return;
  }
  playBeep();
  showPage("transition");
});

transitionBtn.addEventListener("click", () => {
  flashEffect();
  showPage("draw");
});

drawBtn.addEventListener("click", () => {
  if (isDrawing) {
    return;
  }
  isDrawing = true;
  jar.classList.add("shake");
  playShake();
  setTimeout(() => {
    jar.classList.remove("shake");
    playDing();
    playSlipAnimation(() => {
      showFortune();
      isDrawing = false;
    });
  }, 600);
});

saveCard.addEventListener("click", () => {
  if (!currentFortune) {
    return;
  }
  const displayName = userName || "你";
  const canvas = document.createElement("canvas");
  const width = 800;
  const height = 1200;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#060814";
  ctx.fillRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgba(244,195,90,0.25)");
  gradient.addColorStop(0.5, "rgba(8,10,30,0.6)");
  gradient.addColorStop(1, "rgba(4,3,12,0.9)");
  ctx.fillStyle = gradient;
  ctx.fillRect(40, 40, width - 80, height - 80);
  ctx.fillStyle = "#f4c35a";
  ctx.font = "bold 40px 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', serif";
  ctx.textAlign = "center";
  ctx.fillText(`【${currentFortune.title}】`, width / 2, 150);
  ctx.fillStyle = "#f5e9d8";
  ctx.font = "28px 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', serif";
  let y = 240;
  const poemLines = currentFortune.poemText.split("\n");
  poemLines.forEach((line) => {
    ctx.fillText(line, width / 2, y);
    y += 48;
  });
  ctx.font = "22px 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', serif";
  y += 36;
  const expLines = currentFortune.expText.split("\n");
  expLines.forEach((line) => {
    ctx.fillText(line, width / 2, y);
    y += 40;
  });
  ctx.font = "20px 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', serif";
  ctx.fillStyle = "rgba(245,233,216,0.8)";
  ctx.fillText(`—— ${displayName} 的2026马年签文`, width / 2, height - 120);
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `${displayName}-签文.png`;
  a.click();
});

if (fortuneShowText && fortunePhotoWrap && fortuneTextWrap) {
  fortuneShowText.addEventListener("click", () => {
    fortunePhotoWrap.classList.add("hidden");
    fortuneTextWrap.classList.remove("hidden");
  });
}

if (fortuneRedraw) {
  fortuneRedraw.addEventListener("click", () => {
    showFortune();
  });
}

openBless.addEventListener("click", () => {
  fortuneCard.classList.add("hidden");
  showPage("bless");
});

toShare.addEventListener("click", () => {
  stopFireworks();
  showPage("share");
});

copyLink.addEventListener("click", async () => {
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const params = new URLSearchParams();
  if (userName) {
    params.set("name", userName);
  }
  if (currentFortune) {
    params.set("sign", currentFortune.title);
  }
  const link = `${baseUrl}?${params.toString()}`;
  const signTitle = currentFortune ? currentFortune.title : "马到成功";
  const shareText = `我的2026马年专属祝福生成啦！签文是【${signTitle}】，祝你也能像我一样好运连连！✨`;
  const fullText = `${shareText}\n${link}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(fullText);
      shareStatus.textContent = "已复制到剪贴板，快去分享吧！";
      return;
    } catch {}
  }
  const textarea = document.createElement("textarea");
  textarea.value = fullText;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.left = "0";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {}
  document.body.removeChild(textarea);
  if (ok) {
    shareStatus.textContent = "已复制到剪贴板，快去分享吧！";
  } else {
    shareStatus.textContent = "复制失败，请手动复制链接。";
  }
});

retryDraw.addEventListener("click", () => {
  fortuneCard.classList.add("hidden");
  showPage("draw");
});

backHome.addEventListener("click", () => {
  stopBgm();
  stopFireworks();
  showPage("intro");
});

function gameResize() {
  if (!gameCanvas) {
    return;
  }
  gameWidth = gameCanvas.clientWidth;
  gameHeight = gameCanvas.clientHeight;
  const ratio = window.devicePixelRatio || 1;
  gameCanvas.width = gameWidth * ratio;
  gameCanvas.height = gameHeight * ratio;
  if (!gameCtx) {
    gameCtx = gameCanvas.getContext("2d");
  }
  gameCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function resetGameTexts() {
  if (gameTimerText) {
    gameTimerText.textContent = "";
  }
  if (gameScoreText) {
    gameScoreText.textContent = "";
  }
  if (gameResultText) {
    gameResultText.textContent = "";
  }
}

function updateGameTexts() {
  if (gameTimerText) {
    gameTimerText.textContent = `倒计时：${gameTimeLeft}s`;
  }
  if (gameScoreText) {
    if (gameMode === "catch") {
      gameScoreText.textContent = `得分：${gameScore} 分`;
    } else {
      gameScoreText.textContent = `命中：${gameScore} 次`;
    }
  }
}

function stopCanvasGame() {
  gameRunning = false;
  if (gameTimerId) {
    window.clearInterval(gameTimerId);
    gameTimerId = null;
  }
  if (catchFrameId) {
    window.cancelAnimationFrame(catchFrameId);
    catchFrameId = null;
  }
  catchItems = [];
  gameTarget = null;
  if (gameCtx) {
    gameCtx.clearRect(0, 0, gameWidth, gameHeight);
  }
}

function showGameResultOverlay(config) {
  lastGameShot = config;
  if (gameResultTitle) {
    gameResultTitle.textContent = config.title;
  }
  if (gameResultDetail) {
    gameResultDetail.textContent = config.detail;
  }
  if (typeof config.luckLevel === "number" && config.luckLevel > 0) {
    extraLuckLevel += config.luckLevel;
  }
  if (gameResultOverlay) {
    gameResultOverlay.classList.remove("hidden");
  }
}

function hideGameResultOverlay() {
  if (gameResultOverlay) {
    gameResultOverlay.classList.add("hidden");
  }
}

function startTapGame() {
  if (!gameCanvas) {
    return;
  }
  gameMode = "tap";
  gameRunning = true;
  gameTimeLeft = 10;
  gameScore = 0;
  gameTarget = null;
  if (gameResultText) {
    gameResultText.textContent = "";
  }
  gameResize();
  const r = Math.max(18, Math.min(gameWidth, gameHeight) * 0.05);
  const x = r + Math.random() * (gameWidth - r * 2);
  const y = r + Math.random() * (gameHeight - r * 2);
  gameTarget = { x, y, r };
  if (gameCtx) {
    gameCtx.clearRect(0, 0, gameWidth, gameHeight);
    gameCtx.beginPath();
    gameCtx.arc(x, y, r, 0, Math.PI * 2);
    gameCtx.fillStyle = "rgba(244,195,90,0.95)";
    gameCtx.fill();
    gameCtx.beginPath();
    gameCtx.arc(x, y, r * 0.6, 0, Math.PI * 2);
    gameCtx.fillStyle = "rgba(255,255,255,0.9)";
    gameCtx.fill();
    gameCtx.beginPath();
    gameCtx.arc(x, y, r * 0.3, 0, Math.PI * 2);
    gameCtx.fillStyle = "rgba(255,77,77,0.95)";
    gameCtx.fill();
  }
  updateGameTexts();
  if (gameTimerId) {
    window.clearInterval(gameTimerId);
  }
  gameTimerId = window.setInterval(() => {
    if (!gameRunning || gameMode !== "tap") {
      return;
    }
    gameTimeLeft -= 1;
    if (gameTimeLeft <= 0) {
      updateGameTexts();
      stopCanvasGame();
      if (gameResultText) {
        if (gameScore >= 5) {
          const displayName = userName || "你";
          gameResultText.textContent =
            "挑战成功！hey, friend手速够快呀❤！️额外解锁N层好运加成哦！😜";
          showGameResultOverlay({
            title: `${displayName} 的马年点点点战绩`,
            detail: `在 10 秒内命中了 ${gameScore} 次小金圈，手速爆棚，马力全开！`,
            luckLevel: 1,
          });
        } else {
          gameResultText.textContent = "还差一点点，再来一局试试吧，come on!";
        }
      }
      return;
    }
    const r2 = Math.max(18, Math.min(gameWidth, gameHeight) * 0.05);
    const nx = r2 + Math.random() * (gameWidth - r2 * 2);
    const ny = r2 + Math.random() * (gameHeight - r2 * 2);
    gameTarget = { x: nx, y: ny, r: r2 };
    if (gameCtx) {
      gameCtx.clearRect(0, 0, gameWidth, gameHeight);
      gameCtx.beginPath();
      gameCtx.arc(nx, ny, r2, 0, Math.PI * 2);
      gameCtx.fillStyle = "rgba(244,195,90,0.95)";
      gameCtx.fill();
      gameCtx.beginPath();
      gameCtx.arc(nx, ny, r2 * 0.6, 0, Math.PI * 2);
      gameCtx.fillStyle = "rgba(255,255,255,0.9)";
      gameCtx.fill();
      gameCtx.beginPath();
      gameCtx.arc(nx, ny, r2 * 0.3, 0, Math.PI * 2);
      gameCtx.fillStyle = "rgba(255,77,77,0.95)";
      gameCtx.fill();
    }
    updateGameTexts();
  }, 1000);
}

function startCatchGame() {
  if (!gameCanvas) {
    return;
  }
  gameMode = "catch";
  gameRunning = true;
  gameTimeLeft = 30;
  gameScore = 0;
  catchItems = [];
  catchSpawnTick = 0;
  catchPlayerX = gameWidth / 2 || 0;
  catchPlayerY = (gameHeight || gameCanvas.clientHeight) - 60;
  if (gameResultText) {
    gameResultText.textContent = "";
  }
  gameResize();
  updateGameTexts();
  if (gameTimerId) {
    window.clearInterval(gameTimerId);
  }
  gameTimerId = window.setInterval(() => {
    if (!gameRunning || gameMode !== "catch") {
      return;
    }
    gameTimeLeft -= 1;
    if (gameTimeLeft <= 0) {
      updateGameTexts();
      const success = gameScore >= 60;
      stopCanvasGame();
      if (gameResultText) {
        if (success) {
          const displayName = userName || "你";
          gameResultText.textContent =
            "接得真稳！你的元宝、福袋和烟花都装满啦～";
          showGameResultOverlay({
            title: `${displayName} 的马年接元宝战绩`,
            detail: `30 秒内收集了 ${gameScore} 分，已为祝福页解锁「福字飘落+小马贴纸」好运特效。`,
            luckLevel: 1,
          });
        } else {
          gameResultText.textContent = "再多接一点点元宝，奖励就要到手啦！";
        }
      }
      return;
    }
    updateGameTexts();
  }, 1000);
  function loop() {
    if (!gameRunning || gameMode !== "catch") {
      return;
    }
    catchFrameId = window.requestAnimationFrame(loop);
    if (!gameCtx) {
      return;
    }
    catchSpawnTick += 1;
    if (catchSpawnTick % 20 === 0) {
      const kinds = ["coin", "bag", "firework", "bomb"];
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      const size = 18 + Math.random() * 10;
      catchItems.push({
        x: size + Math.random() * (gameWidth - size * 2),
        y: -size,
        r: size,
        kind,
        speed: 2 + Math.random() * 2,
      });
    }
    catchItems.forEach((item) => {
      item.y += item.speed;
    });
    const playerW = Math.max(60, gameWidth * 0.15);
    const playerH = 28;
    const px = catchPlayerX || gameWidth / 2;
    const py = catchPlayerY || gameHeight - 60;
    const hitItems = [];
    catchItems.forEach((item, index) => {
      if (item.y - item.r > gameHeight + 40) {
        hitItems.push(index);
        return;
      }
      const closestX = Math.max(px - playerW / 2, Math.min(item.x, px + playerW / 2));
      const closestY = Math.max(py - playerH / 2, Math.min(item.y, py + playerH / 2));
      const dx = item.x - closestX;
      const dy = item.y - closestY;
      const distSq = dx * dx + dy * dy;
      if (distSq <= item.r * item.r) {
        hitItems.push(index);
        if (item.kind === "bomb") {
          gameScore = Math.max(0, gameScore - 10);
          playShake();
        } else {
          gameScore += item.kind === "coin" ? 10 : item.kind === "bag" ? 15 : 20;
          playDing();
        }
      }
    });
    hitItems
      .sort((a, b) => b - a)
      .forEach((index) => {
        catchItems.splice(index, 1);
      });
    gameCtx.clearRect(0, 0, gameWidth, gameHeight);
    catchItems.forEach((item) => {
      let icon = "🪙";
      if (item.kind === "bag") {
        icon = "🧧";
      } else if (item.kind === "firework") {
        icon = "🎇";
      } else if (item.kind === "bomb") {
        icon = "🧨";
      }
      const fontSize = item.r * 1.6;
      gameCtx.font = `${fontSize}px system-ui, emoji`;
      gameCtx.textAlign = "center";
      gameCtx.textBaseline = "middle";
      gameCtx.fillText(icon, item.x, item.y);
    });
    gameCtx.beginPath();
    gameCtx.roundRect(
      px - playerW / 2,
      py - playerH / 2,
      playerW,
      playerH,
      playerH / 2
    );
    gameCtx.fillStyle = "rgba(244,195,90,0.9)";
    gameCtx.fill();
    const horseFont = playerH * 1.2;
    gameCtx.font = `${horseFont}px system-ui, emoji`;
    gameCtx.textAlign = "left";
    gameCtx.textBaseline = "middle";
    gameCtx.fillStyle = "#2b1a05";
    gameCtx.fillText("🐎", px - playerW / 2 + playerH * 0.4, py);
    updateGameTexts();
  }
  loop();
}

function showGameMenu() {
  stopCanvasGame();
  memoryRunning = false;
  if (memoryTimerId) {
    window.clearInterval(memoryTimerId);
    memoryTimerId = null;
  }
  if (memoryResultText) {
    memoryResultText.textContent = "";
  }
  if (memoryTimerText) {
    memoryTimerText.textContent = "";
  }
  if (memoryStepText) {
    memoryStepText.textContent = "";
  }
  if (memoryGrid) {
    memoryGrid.innerHTML = "";
  }
  if (gameMenu) {
    gameMenu.classList.remove("hidden");
  }
  if (gameAreaTapCatch) {
    gameAreaTapCatch.classList.add("hidden");
  }
  if (gameAreaMemory) {
    gameAreaMemory.classList.add("hidden");
  }
  hideGameResultOverlay();
  resetGameTexts();
}

function saveGameShotImage() {
  if (!lastGameShot) {
    return;
  }
  const displayName = userName || "你";
  const canvas = document.createElement("canvas");
  const width = 900;
  const height = 1400;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#060814";
  ctx.fillRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgba(244,195,90,0.3)");
  gradient.addColorStop(0.5, "rgba(10,12,28,0.95)");
  gradient.addColorStop(1, "rgba(4,3,12,1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(40, 40, width - 80, height - 80);
  ctx.fillStyle = "#f4c35a";
  ctx.font = "bold 40px 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', serif";
  ctx.textAlign = "center";
  ctx.fillText(lastGameShot.title, width / 2, 140);
  ctx.fillStyle = "#f5e9d8";
  ctx.font = "24px 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', serif";
  const detailLines = lastGameShot.detail.split(/\n|。/).filter((s) => s.trim());
  let y = 240;
  detailLines.forEach((line) => {
    const text = line.endsWith("。") ? line : `${line}`;
    ctx.fillText(text, width / 2, y);
    y += 40;
  });
  ctx.font = "20px 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', serif";
  ctx.fillStyle = "rgba(245,233,216,0.8)";
  ctx.fillText(`—— ${displayName} 的2026马年游戏战绩`, width / 2, height - 120);
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `${displayName}-马年小游戏战绩.png`;
  a.click();
}

function setupMemoryGame() {
  if (!memoryGrid) {
    return;
  }
  memoryCards = [];
  memoryFirstCard = null;
  memoryLock = false;
  memoryMatchedCount = 0;
  memorySteps = 0;
  memoryTime = 0;
  memoryRunning = true;
  memoryGrid.innerHTML = "";
  const displayName = userName || "你";
  const symbols = [
    "🐎",
    "🪙",
    "🎆",
    "🧧",
    "🎁",
    "🏅",
    "📜",
    "💫",
  ];
  const pool = symbols.slice(0, 8);
  const pairs = [];
  pool.forEach((symbol, index) => {
    pairs.push({ id: index * 2, symbol });
    pairs.push({ id: index * 2 + 1, symbol });
  });
  pairs.sort(() => Math.random() - 0.5);
  if (memoryTimerId) {
    window.clearInterval(memoryTimerId);
  }
  memoryTimerId = window.setInterval(() => {
    if (!memoryRunning) {
      return;
    }
    memoryTime += 1;
    if (memoryTimerText) {
      memoryTimerText.textContent = `用时：${memoryTime}s`;
    }
  }, 1000);
  if (memoryStepText) {
    memoryStepText.textContent = "步数：0";
  }
  if (memoryResultText) {
    memoryResultText.textContent = "";
  }
  pairs.forEach((pair, index) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.symbol = pair.symbol;
    card.dataset.index = String(index);
    const icon = document.createElement("div");
    icon.className = "memory-card-icon";
    icon.textContent = "❓";
    const name = document.createElement("div");
    name.className = "memory-card-name";
    name.textContent = displayName;
    card.appendChild(icon);
    card.appendChild(name);
    memoryGrid.appendChild(card);
    memoryCards.push(card);
  });
}

function revealMemoryCard(card) {
  if (!card || memoryLock || card.classList.contains("matched")) {
    return;
  }
  if (card === memoryFirstCard) {
    return;
  }
  const symbol = card.dataset.symbol || "";
  const icon = card.querySelector(".memory-card-icon");
  if (icon) {
    icon.textContent = symbol;
  }
  card.classList.add("flipped");
  if (!memoryFirstCard) {
    memoryFirstCard = card;
    playBeep();
    return;
  }
  memoryLock = true;
  memorySteps += 1;
  if (memoryStepText) {
    memoryStepText.textContent = `步数：${memorySteps}`;
  }
  const firstSymbol = memoryFirstCard.dataset.symbol;
  if (firstSymbol === symbol) {
    playDing();
    memoryFirstCard.classList.add("matched");
    card.classList.add("matched");
    memoryMatchedCount += 2;
    memoryFirstCard = null;
    memoryLock = false;
    if (memoryMatchedCount >= memoryCards.length) {
      memoryRunning = false;
      if (memoryTimerId) {
        window.clearInterval(memoryTimerId);
        memoryTimerId = null;
      }
      const displayName = userName || "你";
      if (memoryResultText) {
        memoryResultText.textContent = `${displayName} 的 2026，事事配对，好运成双！`;
      }
      showGameResultOverlay({
        title: `${displayName} 的福马翻牌消消乐战绩`,
        detail: `用了 ${memoryTime}s 完成全部配对，${displayName} 的 2026，事事配对，好运成双。`,
        luckLevel: 1,
      });
    }
  } else {
    setTimeout(() => {
      if (memoryFirstCard) {
        memoryFirstCard.classList.remove("flipped");
        const icon1 = memoryFirstCard.querySelector(".memory-card-icon");
        if (icon1) {
          icon1.textContent = "❓";
        }
      }
      card.classList.remove("flipped");
      const icon2 = card.querySelector(".memory-card-icon");
      if (icon2) {
        icon2.textContent = "❓";
      }
      memoryFirstCard = null;
      memoryLock = false;
    }, 700);
  }
}

if (gameCanvas) {
  window.addEventListener("resize", gameResize);
  gameResize();
  gameCanvas.addEventListener("click", (event) => {
    if (!gameRunning) {
      return;
    }
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (gameMode === "tap") {
      if (!gameTarget) {
        return;
      }
      const dx = x - gameTarget.x;
      const dy = y - gameTarget.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= gameTarget.r) {
        gameScore += 1;
        playDing();
        updateGameTexts();
      }
    } else if (gameMode === "catch") {
      catchPlayerX = x;
    }
  });
}

if (openGame) {
  openGame.addEventListener("click", () => {
    showPage("game");
    showGameMenu();
  });
}

if (enterGameTap) {
  enterGameTap.addEventListener("click", () => {
    if (gameMenu && gameAreaTapCatch) {
      gameMenu.classList.add("hidden");
      gameAreaTapCatch.classList.remove("hidden");
    }
    resetGameTexts();
    startTapGame();
  });
}

if (enterGameCatch) {
  enterGameCatch.addEventListener("click", () => {
    if (gameMenu && gameAreaTapCatch) {
      gameMenu.classList.add("hidden");
      gameAreaTapCatch.classList.remove("hidden");
    }
    resetGameTexts();
    startCatchGame();
  });
}

if (enterGameMemory) {
  enterGameMemory.addEventListener("click", () => {
    if (gameMenu && gameAreaMemory) {
      gameMenu.classList.add("hidden");
      gameAreaMemory.classList.remove("hidden");
    }
    setupMemoryGame();
  });
}

if (gameStartBtn) {
  gameStartBtn.addEventListener("click", () => {
    if (gameMode === "catch") {
      startCatchGame();
    } else {
      startTapGame();
    }
  });
}

if (gameBackBtn) {
  gameBackBtn.addEventListener("click", () => {
    showGameMenu();
  });
}

if (gameBackFromMenu) {
  gameBackFromMenu.addEventListener("click", () => {
    showPage("bless");
  });
}

if (memoryGrid) {
  memoryGrid.addEventListener("click", (event) => {
    const target = event.target;
    const card =
      target instanceof HTMLElement && target.classList.contains("memory-card")
        ? target
        : target instanceof HTMLElement
        ? target.closest(".memory-card")
        : null;
    if (card && card instanceof HTMLElement) {
      revealMemoryCard(card);
    }
  });
}

if (memoryRestartBtn) {
  memoryRestartBtn.addEventListener("click", () => {
    setupMemoryGame();
  });
}

if (memoryBackBtn) {
  memoryBackBtn.addEventListener("click", () => {
    showGameMenu();
  });
}

if (gameSaveShot) {
  gameSaveShot.addEventListener("click", () => {
    saveGameShotImage();
  });
}

if (gameResultClose) {
  gameResultClose.addEventListener("click", () => {
    hideGameResultOverlay();
    showGameMenu();
  });
}

if (soundToggle && appRoot) {
  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    appRoot.dataset.sound = soundEnabled ? "on" : "off";
    soundToggle.textContent = soundEnabled ? "🔊 声音已开启" : "🔈 声音已关闭";
    if (!soundEnabled) {
      stopBgm();
    }
  });
}

fortuneCard.addEventListener("click", (event) => {
  if (event.target === fortuneCard) {
    fortuneCard.classList.add("hidden");
  }
});

function initFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if (name) {
    nameInput.value = name;
    setName(name);
  }
  showPage("intro");
}

initFromUrl();
