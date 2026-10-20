/* ============================================================
   ASIYA'S ULTIMATE BEST FRIEND BIRTHDAY WEBSITE
   js/script.js
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     0. Helpers
     ------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = reduceMotion ? 'auto' : 'smooth';

  const CONFETTI_COLORS = [
    '#FFB6D9', '#C9B6FF', '#9275FF', '#FFD6B8',
    '#9BE7C4', '#FFE07A', '#FFF9F2'
  ];

  /* ------------------------------------------------------------
     1. Element cache
     ------------------------------------------------------------ */
  const el = {
    body: document.body,
    main: $('#main'),

    confettiLayer: $('#confettiLayer'),

    musicToggle: $('#musicToggle'),
    musicLabel: $('#musicLabel'),

    opening: $('#openingScreen'),
    openingMain: $('#openingMain'),
    openingDenied: $('#openingDenied'),
    openingWelcome: $('#openingWelcome'),
    btnYes: $('#btnYes'),
    btnNo: $('#btnNo'),
    btnTryAgain: $('#btnTryAgain'),

    hero: $('#hero'),
    heroTitle: $('.hero__title'),
    unlockBtn: $('#unlockBtn'),

    nonsense: $('#nonsense'),
    messageCard: $('#messageCard'),
    messageText: $('#messageText'),
    btnNewMessage: $('#btnNewMessage'),

    cakeScene: $('#cakeScene'),
    wishBtn: $('#wishBtn'),
    relightBtn: $('#relightBtn'),
    wishResult: $('#wishResult'),

    giftBox: $('#giftBox'),
    giftSparkles: $('#giftSparkles'),
    giftBtn: $('#giftBtn'),
    giftReveal: $('#giftReveal'),
    cuteBtn: $('#cuteBtn'),
    cuteExtra: $('#cuteExtra'),

    gameArea: $('#gameArea'),
    gameHint: $('#gameHint'),
    gameCake: $('#gameCake'),
    gameScore: $('#gameScore'),
    gameTime: $('#gameTime'),
    gameStart: $('#gameStart'),
    gameRestart: $('#gameRestart'),
    gameResult: $('#gameResult'),

    galleryGrid: $('#galleryGrid'),

    letter: $('#letter'),
    letterBody: $('#letterBody'),

    celebrateBtn: $('#celebrateBtn'),
    readAgainBtn: $('#readAgainBtn'),
    backToTopBtn: $('#backToTopBtn'),

    lightbox: $('#lightbox'),
    lightboxImg: $('#lightboxImg'),
    lightboxCaption: $('#lightboxCaption'),
    lightboxClose: $('#lightboxClose')
  };

  /* ------------------------------------------------------------
     2. Confetti
     ------------------------------------------------------------ */
  function launchConfetti(count = 80) {
    if (reduceMotion || !el.confettiLayer) return;

    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';

      const size = 6 + Math.random() * 7;
      const duration = 2.2 + Math.random() * 2.2;
      const delay = Math.random() * 0.45;

      piece.style.left = (Math.random() * 100) + '%';
      piece.style.width = size.toFixed(1) + 'px';
      piece.style.height = (size * 1.7).toFixed(1) + 'px';
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDuration = duration.toFixed(2) + 's';
      piece.style.animationDelay = delay.toFixed(2) + 's';
      piece.style.setProperty('--drift', (Math.random() * 240 - 120).toFixed(0) + 'px');

      if (Math.random() > 0.72) piece.style.borderRadius = '50%';

      frag.appendChild(piece);

      window.setTimeout(() => piece.remove(), (duration + delay + 0.4) * 1000);
    }

    el.confettiLayer.appendChild(frag);
  }

  /* ------------------------------------------------------------
     3. Opening screen
     ------------------------------------------------------------ */
  function initOpening() {
    if (!el.opening) return;

    // Keep the page behind the modal unreachable until it is dismissed.
    if (el.main && 'inert' in HTMLElement.prototype) {
      el.main.inert = true;
    }

    window.setTimeout(() => {
      if (el.btnYes) el.btnYes.focus({ preventScroll: true });
    }, 60);

    if (el.btnYes) {
      el.btnYes.addEventListener('click', () => {
        launchConfetti(100);

        if (el.openingMain) el.openingMain.hidden = true;
        if (el.openingDenied) el.openingDenied.hidden = true;
        if (el.openingWelcome) el.openingWelcome.hidden = false;

        window.setTimeout(() => {
          el.opening.hidden = true;
          el.body.classList.remove('is-locked');

          if (el.main && 'inert' in HTMLElement.prototype) {
            el.main.inert = false;
          }

          if (el.heroTitle) {
            el.heroTitle.setAttribute('tabindex', '-1');
            el.heroTitle.focus({ preventScroll: true });
          }
        }, reduceMotion ? 250 : 1600);
      });
    }

    if (el.btnNo) {
      el.btnNo.addEventListener('click', () => {
        if (el.openingMain) el.openingMain.hidden = true;
        if (el.openingDenied) el.openingDenied.hidden = false;

        if (el.btnTryAgain) el.btnTryAgain.focus({ preventScroll: true });
      });
    }

    if (el.btnTryAgain) {
      el.btnTryAgain.addEventListener('click', () => {
        if (el.openingDenied) el.openingDenied.hidden = true;
        if (el.openingMain) el.openingMain.hidden = false;
        if (el.btnYes) el.btnYes.focus({ preventScroll: true });
      });
    }
  }

  /* ------------------------------------------------------------
     4. Hero — unlock the chaos
     ------------------------------------------------------------ */
  function initHero() {
    if (!el.unlockBtn) return;

    el.unlockBtn.addEventListener('click', () => {
      launchConfetti(70);

      const target = el.nonsense || el.hero;
      if (target) {
        target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      }
    });
  }

  /* ------------------------------------------------------------
     5. Funny birthday message generator
     ------------------------------------------------------------ */
  const MESSAGES = [
    "Congratulations! You've unlocked another year of being absolutely impossible to ignore. 😂",
    "Breaking news: Asiya is getting more legendary. Scientists remain confused. 📰",
    "Happy Birthday! May your battery stay at 100%, your snacks never run out, and your problems forget your address.",
    "Your birthday cake called. It wants to know why it has to carry all these candles. 🎂",
    "You're not getting older. You're just becoming a limited-edition classic.",
    "Today's official schedule: Eat cake, accept compliments, act surprised, repeat.",
    "May your selfies be perfect, your internet be fast, and your bad days be extremely short.",
    "Congratulations on surviving another year of your own legendary personality. Respect. 😂",
    "Birthday rule number one: Calories are on vacation today.",
    "May all your wishes come true, except the ones that require me to share my fries."
  ];

  let lastMessageIndex = 0;

  function pickMessageIndex() {
    if (MESSAGES.length <= 1) return 0;

    let index = lastMessageIndex;
    while (index === lastMessageIndex) {
      index = Math.floor(Math.random() * MESSAGES.length);
    }
    return index;
  }

  function initMessageGenerator() {
    if (!el.btnNewMessage || !el.messageText) return;

    el.btnNewMessage.addEventListener('click', () => {
      const index = pickMessageIndex();
      lastMessageIndex = index;

      el.messageText.textContent = MESSAGES[index];

      if (el.messageCard && !reduceMotion) {
        el.messageCard.classList.remove('is-pop');
        void el.messageCard.offsetWidth; // force reflow to restart animation
        el.messageCard.classList.add('is-pop');
      }
    });
  }

  /* ------------------------------------------------------------
     6. Interactive cake
     ------------------------------------------------------------ */
  function initCake() {
    if (!el.wishBtn || !el.cakeScene) return;

    el.wishBtn.addEventListener('click', () => {
      el.cakeScene.classList.add('is-out');
      launchConfetti(90);

      if (el.wishResult) el.wishResult.hidden = false;
      if (el.relightBtn) el.relightBtn.hidden = false;
      el.wishBtn.hidden = true;
    });

    if (el.relightBtn) {
      el.relightBtn.addEventListener('click', () => {
        el.cakeScene.classList.remove('is-out');

        if (el.wishResult) el.wishResult.hidden = true;
        el.relightBtn.hidden = true;
        el.wishBtn.hidden = false;
        el.wishBtn.focus({ preventScroll: true });
      });
    }
  }

  /* ------------------------------------------------------------
     7. Mystery gift
     ------------------------------------------------------------ */
  function spawnGiftSparkles() {
    if (!el.giftSparkles || reduceMotion) return;

    for (let i = 0; i < 16; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = (8 + Math.random() * 84) + '%';
      sparkle.style.top = (10 + Math.random() * 60) + '%';
      sparkle.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      sparkle.style.animationDelay = (Math.random() * 0.35).toFixed(2) + 's';

      el.giftSparkles.appendChild(sparkle);
      window.setTimeout(() => sparkle.remove(), 1400);
    }
  }

  function initGift() {
    if (!el.giftBtn || !el.giftBox) return;

    el.giftBtn.addEventListener('click', () => {
      el.giftBox.classList.add('is-open');
      spawnGiftSparkles();
      launchConfetti(100);

      if (el.giftReveal) el.giftReveal.hidden = false;

      el.giftBtn.disabled = true;
      el.giftBtn.textContent = 'GIFT OPENED ✓';

      if (el.giftReveal) {
        window.setTimeout(() => {
          el.giftReveal.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
        }, reduceMotion ? 0 : 500);
      }
    });

    if (el.cuteBtn && el.cuteExtra) {
      el.cuteBtn.addEventListener('click', () => {
        el.cuteExtra.hidden = false;
        el.cuteBtn.disabled = true;
        el.cuteBtn.textContent = 'SOFT SIDE CONFIRMED ✓';
      });
    }
  }

  /* ------------------------------------------------------------
     8. Mini-game — Emergency Cake Rescue
     ------------------------------------------------------------ */
  const GAME_DURATION = 20;

  const game = {
    running: false,
    score: 0,
    time: GAME_DURATION,
    intervalId: null,
    lastPosition: null
  };

  function gameResultFor(score) {
    if (score >= 10) return 'CAKE LEGEND! Asiya approves this level of dedication.';
    if (score >= 5) return "Not bad! You're officially on the birthday team.";
    return 'The cake has escaped. We need a rescue team. 😂';
  }

  function resetGameState() {
    window.clearInterval(game.intervalId);
    game.intervalId = null;
    game.running = false;
    game.score = 0;
    game.time = GAME_DURATION;
    game.lastPosition = null;

    if (el.gameScore) el.gameScore.textContent = '0';
    if (el.gameTime) el.gameTime.textContent = String(GAME_DURATION);
    if (el.gameResult) el.gameResult.textContent = '';
  }

  function placeCake() {
    if (!el.gameArea || !el.gameCake) return;

    const areaRect = el.gameArea.getBoundingClientRect();
    const cakeRect = el.gameCake.getBoundingClientRect();

    const cakeW = cakeRect.width || 64;
    const cakeH = cakeRect.height || 64;

    const maxX = Math.max(0, areaRect.width - cakeW);
    const maxY = Math.max(0, areaRect.height - cakeH);

    let x = 0;
    let y = 0;
    let attempts = 0;

    do {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      attempts += 1;
    } while (
      attempts < 10 &&
      game.lastPosition &&
      Math.hypot(x - game.lastPosition.x, y - game.lastPosition.y) < 80
    );

    game.lastPosition = { x, y };

    el.gameCake.style.left = x.toFixed(0) + 'px';
    el.gameCake.style.top = y.toFixed(0) + 'px';
  }

  function endGame() {
    window.clearInterval(game.intervalId);
    game.intervalId = null;
    game.running = false;

    if (el.gameCake) el.gameCake.hidden = true;
    if (el.gameHint) el.gameHint.hidden = true;
    if (el.gameStart) el.gameStart.hidden = true;
    if (el.gameRestart) el.gameRestart.hidden = false;
    if (el.gameResult) el.gameResult.textContent = gameResultFor(game.score);
  }

  function startGame() {
    if (game.running) return;

    resetGameState();
    game.running = true;

    if (el.gameStart) el.gameStart.hidden = true;
    if (el.gameRestart) el.gameRestart.hidden = true;
    if (el.gameResult) el.gameResult.textContent = '';
    if (el.gameHint) el.gameHint.hidden = true;

    if (el.gameCake) {
      el.gameCake.hidden = false;
      placeCake();
    }

    game.intervalId = window.setInterval(() => {
      game.time -= 1;

      if (el.gameTime) el.gameTime.textContent = String(Math.max(0, game.time));

      if (game.time <= 0) endGame();
    }, 1000);
  }

  function initGame() {
    if (!el.gameStart || !el.gameArea || !el.gameCake) return;

    el.gameStart.addEventListener('click', startGame);

    if (el.gameRestart) {
      el.gameRestart.addEventListener('click', startGame);
    }

    el.gameCake.addEventListener('click', () => {
      if (!game.running) return;

      game.score += 1;
      if (el.gameScore) el.gameScore.textContent = String(game.score);
      placeCake();
    });

    window.addEventListener('resize', () => {
      if (game.running) placeCake();
    });
  }

  /* ------------------------------------------------------------
     9. Gallery + lightbox
     ------------------------------------------------------------ */
  let lastFocusedElement = null;

  function openLightbox(button) {
    if (!el.lightbox || !el.lightboxImg) return;

    const img = $('img', button);
    if (!img) return;

    const src = img.getAttribute('src') || '';
    const isPlaceholder = /placeholder/i.test(src);
    const hue = img.style.getPropertyValue('--hue') || '0deg';

    el.lightboxImg.src = src;
    el.lightboxImg.alt = img.alt || '';
    el.lightboxImg.style.setProperty('--hue', isPlaceholder ? hue : '0deg');

    if (el.lightboxCaption) {
      el.lightboxCaption.textContent = button.dataset.caption || '';
    }

    lastFocusedElement = button;
    el.lightbox.hidden = false;
    el.body.classList.add('is-locked');

    if (el.lightboxClose) el.lightboxClose.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!el.lightbox || el.lightbox.hidden) return;

    el.lightbox.hidden = true;
    el.body.classList.remove('is-locked');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus({ preventScroll: true });
    }
    lastFocusedElement = null;
  }

  function initGallery() {
    if (!el.galleryGrid) return;

    el.galleryGrid.addEventListener('click', (event) => {
      const btn = event.target.closest('.gallery__btn');
      if (btn) openLightbox(btn);
    });

    if (el.lightboxClose) {
      el.lightboxClose.addEventListener('click', closeLightbox);
    }

    const backdrop = $('[data-close-lightbox]');
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && el.lightbox && !el.lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  /* ------------------------------------------------------------
     10. Letter typing animation
     ------------------------------------------------------------ */
  let letterTimer = null;
  let letterStarted = false;

  function typeLetter() {
    if (!el.letterBody) return;

    const paragraphs = $$('p', el.letterBody);
    if (!paragraphs.length) return;

    window.clearTimeout(letterTimer);

    if (reduceMotion) {
      paragraphs.forEach((p) => p.classList.add('is-typed'));
      el.letterBody.classList.remove('is-typing');
      return;
    }

    el.letterBody.classList.add('is-typing');
    paragraphs.forEach((p) => p.classList.remove('is-typed'));
    void el.letterBody.offsetWidth; // force reflow to restart animations

    let index = 0;

    const revealNext = () => {
      if (index >= paragraphs.length) {
        el.letterBody.classList.remove('is-typing');
        return;
      }

      paragraphs[index].classList.add('is-typed');
      index += 1;
      letterTimer = window.setTimeout(revealNext, 430);
    };

    revealNext();
  }

  function initLetter() {
    if (!el.letterBody) return;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      typeLetter();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !letterStarted) {
            letterStarted = true;
            typeLetter();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el.letterBody);
  }

  /* ------------------------------------------------------------
     11. Finale controls
     ------------------------------------------------------------ */
  function initFinale() {
    if (el.celebrateBtn) {
      el.celebrateBtn.addEventListener('click', () => {
        launchConfetti(120);
        if (!reduceMotion) {
          window.setTimeout(() => launchConfetti(70), 450);
        }
      });
    }

    if (el.readAgainBtn) {
      el.readAgainBtn.addEventListener('click', () => {
        if (el.letter) {
          el.letter.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        }

        window.setTimeout(() => {
          letterStarted = true;
          typeLetter();
        }, reduceMotion ? 0 : 500);
      });
    }

    if (el.backToTopBtn) {
      el.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: scrollBehavior });
      });
    }
  }

  /* ------------------------------------------------------------
     12. Scroll reveal
     ------------------------------------------------------------ */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((item) => observer.observe(item));
  }

  /* ------------------------------------------------------------
     13. Music toggle
     ------------------------------------------------------------ */
  const Music = (function () {
    // To use a real music file, place it in assets/audio/ and put its
    // path here, e.g. 'assets/audio/birthday.mp3'. Leave '' to use the
    // built-in gentle synth melody (no external files, no 404s).
    const SRC = '';

    const AudioCtx = window.AudioContext || window.webkitAudioContext;

    // A soft music-box take on the Happy Birthday melody.
    const MELODY = [
      392.00, 392.00, 440.00, 392.00, 523.25, 493.88,
      392.00, 392.00, 440.00, 392.00, 587.33, 523.25,
      392.00, 392.00, 783.99, 659.25, 523.25, 493.88, 440.00,
      698.46, 698.46, 659.25, 523.25, 587.33, 523.25, 0
    ];

    let ctx = null;
    let master = null;
    let audioEl = null;
    let fileReady = false;
    let playing = false;
    let noteTimer = null;
    let noteIndex = 0;

    function initFile() {
      if (!SRC) return;

      audioEl = new Audio();
      audioEl.loop = true;
      audioEl.volume = 0.35;
      audioEl.preload = 'auto';

      audioEl.addEventListener('canplaythrough', () => { fileReady = true; }, { once: true });
      audioEl.addEventListener('error', () => { fileReady = false; }, { once: true });

      audioEl.src = SRC;
      audioEl.load();
    }

    function ensureContext() {
      if (!AudioCtx) return null;

      if (!ctx) {
        ctx = new AudioCtx();
        master = ctx.createGain();
        master.gain.value = 0.06;
        master.connect(ctx.destination);
      }

      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    function playNote(frequency, when, duration) {
      if (!ctx || !master || !frequency) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, when);

      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.linearRampToValueAtTime(1, when + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);

      osc.connect(gain).connect(master);
      osc.start(when);
      osc.stop(when + duration + 0.05);
    }

    function startSynth() {
      if (!ensureContext()) return;

      stopSynth();
      noteIndex = 0;

      noteTimer = window.setInterval(() => {
        if (!ctx) return;

        const frequency = MELODY[noteIndex % MELODY.length];
        noteIndex += 1;

        if (frequency) playNote(frequency, ctx.currentTime, 0.34);
      }, 420);
    }

    function stopSynth() {
      if (noteTimer !== null) {
        window.clearInterval(noteTimer);
        noteTimer = null;
      }
    }

    function updateUI() {
      if (!el.musicToggle) return;

      el.musicToggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
      if (el.musicLabel) {
        el.musicLabel.textContent = playing ? 'Music: On' : 'Music: Off';
      }
    }

    function start() {
      if (playing) return;

      if (fileReady && audioEl) {
        audioEl.play().then(() => {
          playing = true;
          updateUI();
        }).catch(() => {
          startSynth();
          playing = true;
          updateUI();
        });
        return;
      }

      startSynth();
      playing = true;
      updateUI();
    }

    function stop() {
      if (audioEl) audioEl.pause();
      stopSynth();
      playing = false;
      updateUI();
    }

    function toggle() {
      if (playing) stop();
      else start();
    }

    function init() {
      initFile();

      if (el.musicToggle) {
        el.musicToggle.addEventListener('click', toggle);
      }

      updateUI();
    }

    return { init };
  })();

  /* ------------------------------------------------------------
     14. Boot
     ------------------------------------------------------------ */
  function init() {
    initOpening();
    initHero();
    initMessageGenerator();
    initCake();
    initGift();
    initGame();
    initGallery();
    initLetter();
    initFinale();
    initReveal();
    Music.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();