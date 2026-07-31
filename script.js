/**
 * script.js — Romantic "Us" Website
 *
 * PERFORMANCE TIPS (read before sharing):
 * - Compress JPGs via TinyPNG or Squoosh (target < 500KB each)
 * - Keep videos under 15–20MB; use HandBrake for web compression
 * - Use will-change sparingly; we apply it only on animated elements
 */

(function () {
  'use strict';

  /* ========== DOM REFS ========== */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderPercent = document.getElementById('preloader-percent');
  const mainContent = document.getElementById('main-content');
  const heroBg = document.getElementById('hero-bg');
  const photoTimeline = document.getElementById('photo-timeline');
  const videoCarousel = document.getElementById('video-carousel');
  const letterBody = document.getElementById('letter-body');
  const reasonsGrid = document.getElementById('reasons-grid');
  const musicToggle = document.getElementById('music-toggle');
  const videoLightbox = document.getElementById('video-lightbox');
  const lightboxVideo = document.getElementById('lightbox-video');

  let ytPlayer = null;
  let musicPlaying = false;
  let musicNeedsUnmute = false;
  let siteReady = false;
  let counterInterval = null;

  const aspectClasses = ['', 'tall', 'wide'];

  /* ========== APPLY SITE CONFIG ========== */
  function applyConfig() {
    const c = SITE_CONFIG;
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el && val) el.textContent = val;
    };

    setText('hero-your-name', c.yourName);
    setText('hero-her-name', c.herName);
    setText('hero-tagline', c.heroTagline);
    setText('hero-subline', c.heroSubline);
    setText('hero-mahadev', c.mahadevLine);
    setText('hero-occasion', c.girlfriendDayHeadline.split(',')[0] || 'Happy Girlfriend Day');
    setText('closing-headline', c.girlfriendDayHeadline);
    setText('closing-message', c.closingMessage);
    setText('closing-joke', c.closingJoke);
    setText('closing-your-name', c.yourName);
    setText('closing-her-name', c.herName);

    const musicLabel = musicToggle?.querySelector('.music-label');
    if (musicLabel && c.youtubeSongTitle) {
      musicLabel.textContent = c.youtubeSongTitle;
    }

    if (heroBg && c.heroImage) {
      heroBg.style.backgroundImage = `url('${c.heroImage}')`;
    }
  }

  /* ========== ASSET PRELOADER ========== */
  function preloadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  function preloadFont() {
    return document.fonts.ready.catch(() => {});
  }

  async function runPreloader() {
    document.body.classList.add('loading');

    // Start loading YouTube player early so Hawayein is ready when site opens
    if (typeof YT !== 'undefined' && YT.Player && SITE_CONFIG.youtubeVideoId) {
      window.onYouTubeIframeAPIReady();
    }

    preloader.addEventListener('click', () => {
      unmuteMusic();
      tryStartMusic();
    }, { once: true });

    const criticalAssets = [
      SITE_CONFIG.heroImage,
      ...PHOTOS.slice(0, 3).map((p) => p.file),
    ].filter(Boolean);

    const total = criticalAssets.length + 1; // +1 for fonts
    let loaded = 0;

    function updateProgress() {
      loaded++;
      const pct = Math.min(100, Math.round((loaded / total) * 100));
      preloaderBar.style.width = pct + '%';
      preloaderPercent.textContent = pct + '%';
    }

    await preloadFont();
    updateProgress();

    await Promise.all(
      criticalAssets.map(async (src) => {
        await preloadImage(src);
        updateProgress();
      })
    );

    // Animate heart stroke
    const heartPath = document.querySelector('.heart-path');
    if (heartPath && typeof gsap !== 'undefined') {
      gsap.to(heartPath, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }

    preloaderBar.style.width = '100%';
    preloaderPercent.textContent = '100%';

    await new Promise((r) => setTimeout(r, 400));

    preloader.classList.add('done');
    mainContent.classList.remove('hidden');
    document.body.classList.remove('loading');

    siteReady = true;
    tryStartMusic();
    setupUnmuteOnInteraction();

    initSite();
  }

  /* ========== PHOTO TIMELINE RENDER ========== */
  function renderTimeline() {
    if (!photoTimeline) return;

    PHOTOS.forEach((photo, index) => {
      // Insert quote strip every 8 photos
      if (index > 0 && index % 8 === 0) {
        const quoteIdx = Math.floor(index / 8) - 1;
        const quote = QUOTE_STRIPS[quoteIdx % QUOTE_STRIPS.length];
        const strip = document.createElement('div');
        strip.className = 'quote-strip';
        strip.innerHTML = `<p>${quote}</p>`;
        photoTimeline.appendChild(strip);
      }

      const item = document.createElement('article');
      item.className = 'timeline-item';
      item.dataset.index = index;

      const aspectClass = aspectClasses[index % 3];

      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="media-wrap ${aspectClass}">
            <div class="media-shimmer"></div>
            <img data-src="${photo.file}" alt="Memory ${index + 1}" loading="lazy" decoding="async">
          </div>
          <p class="timeline-caption">${photo.caption}</p>
        </div>
      `;

      photoTimeline.appendChild(item);
    });

    initLazyImages();
  }

  /* ========== LAZY LOAD IMAGES (IntersectionObserver + blur-up) ========== */
  function initLazyImages() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const loadImage = (img) => {
      const src = img.dataset.src;
      if (!src || img.dataset.loaded) return;
      img.dataset.loaded = 'true';

      const wrap = img.closest('.media-wrap');
      const temp = new Image();
      temp.onload = () => {
        img.src = src;
        requestAnimationFrame(() => {
          img.classList.add('loaded');
          if (wrap) wrap.classList.add('loaded');
        });
      };
      temp.onerror = () => {
        if (wrap) {
          wrap.classList.add('loaded');
          wrap.style.background = 'var(--blush-dark)';
        }
      };
      temp.src = src;
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '200px' }
      );
      images.forEach((img) => io.observe(img));
    } else {
      images.forEach(loadImage);
    }
  }

  /* ========== VIDEO CAROUSEL ========== */
  function renderVideos() {
    if (!videoCarousel) return;

    VIDEOS.forEach((video, index) => {
      const card = document.createElement('div');
      card.className = 'video-card reveal';
      card.dataset.videoSrc = video.file;

      const posterHtml = video.poster
        ? `<img src="${video.poster}" alt="Video thumbnail" loading="lazy">`
        : `<div class="video-poster-placeholder"></div>`;

      card.innerHTML = `
        <div class="video-thumb-wrap">
          ${posterHtml}
          <button class="video-play-btn" aria-label="Play video">
            <span class="play-circle"><span class="play-triangle"></span></span>
          </button>
        </div>
        <p class="video-caption">${video.caption}</p>
      `;

      const playBtn = card.querySelector('.video-play-btn');
      playBtn.addEventListener('click', () => openVideoLightbox(video.file));

      // Lazy preload video metadata when near viewport
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              io.disconnect();
            }
          },
          { rootMargin: '300px' }
        );
        io.observe(card);
      }

      videoCarousel.appendChild(card);
    });
  }

  function openVideoLightbox(src) {
    lightboxVideo.src = src;
    videoLightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxVideo.play().catch(() => {});
  }

  function closeVideoLightbox() {
    lightboxVideo.pause();
    lightboxVideo.src = '';
    videoLightbox.hidden = true;
    document.body.style.overflow = '';
  }

  videoLightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeVideoLightbox);
  videoLightbox?.querySelector('.lightbox-backdrop')?.addEventListener('click', closeVideoLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !videoLightbox.hidden) closeVideoLightbox();
  });

  /* ========== LOVE LETTER ========== */
  function renderLetter() {
    if (!letterBody) return;

    LETTER_LINES.forEach((line, i) => {
      const p = document.createElement('p');
      p.className = 'letter-line';
      if (line === '') {
        p.innerHTML = '&nbsp;';
        p.style.height = '0.5rem';
      } else {
        p.textContent = line;
      }
      if (i >= LETTER_LINES.length - 2) p.classList.add('signature');
      letterBody.appendChild(p);
    });
  }

  /* ========== REASONS FLIP CARDS ========== */
  function renderReasons() {
    if (!reasonsGrid) return;

    REASONS.forEach((reason, i) => {
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Reason ${i + 1}, tap to reveal`);

      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">${reason.front}</div>
          <div class="flip-card-back">${reason.back}</div>
        </div>
      `;

      const toggle = () => card.classList.toggle('flipped');
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });

      reasonsGrid.appendChild(card);
    });
  }

  /* ========== LOVE COUNTER ========== */
  function updateCounter() {
    const start = new Date(SITE_CONFIG.startDate + 'T00:00:00');
    const now = new Date();
    const diff = Math.max(0, now - start);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, '0');
    };

    setVal('count-days', days);
    setVal('count-hours', hours);
    setVal('count-minutes', minutes);
    setVal('count-seconds', seconds);
  }

  function startCounter() {
    updateCounter();
    counterInterval = setInterval(updateCounter, 1000);
  }

  /* ========== FLOATING PARTICLES (hearts + petals) ========== */
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const symbols = ['♥', '♡', '🌸', '✿', '❀'];
    const count = Math.min(35, Math.floor(window.innerWidth / 25));

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 14 + 8,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.25 + 0.08,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.5,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: count }, createParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = p.symbol.includes('♥') || p.symbol.includes('♡') ? '#6B2737' : '#C9A962';
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();

        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    window.addEventListener('resize', () => {
      resize();
    });

    return () => cancelAnimationFrame(animId);
  }

  /* ========== CLOSING CONFETTI ========== */
  function spawnConfetti() {
    const container = document.getElementById('closing-particles');
    if (!container || typeof gsap === 'undefined') return;

    const colors = ['#6B2737', '#C9A962', '#F5E1DA', '#E8C4B8'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.background = colors[i % colors.length];
      piece.style.left = Math.random() * 100 + '%';
      piece.style.top = '-10px';
      container.appendChild(piece);

      gsap.to(piece, {
        y: window.innerHeight + 50,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720,
        opacity: 1,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 0.5,
        ease: 'power1.in',
        onComplete: () => piece.remove(),
      });
    }
  }

  /* ========== GSAP SCROLL ANIMATIONS ========== */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      gsap.set('.reveal, .timeline-item, .letter-line, .flip-card, .quote-strip p', {
        opacity: 1,
        y: 0,
        x: 0,
      });
      document.querySelectorAll('.letter-line').forEach((l) => l.classList.add('visible'));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.from('.hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2,
    });

    gsap.from('.scroll-hint', {
      opacity: 0,
      y: -10,
      duration: 0.8,
      delay: 1.2,
    });

    // Hero parallax
    gsap.to('.hero-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Section reveals
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      const x = i % 2 === 0 ? -60 : 60;
      gsap.from(item, {
        x,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Quote strips
    gsap.utils.toArray('.quote-strip p').forEach((q) => {
      gsap.to(q, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: q,
          start: 'top 88%',
        },
      });
    });

    // Mahadev parallax
    gsap.to('.mahadev-content', {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#mahadev',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Letter lines — line by line reveal
    gsap.utils.toArray('.letter-line').forEach((line) => {
      ScrollTrigger.create({
        trigger: line,
        start: 'top 92%',
        onEnter: () => line.classList.add('visible'),
      });
      gsap.to(line, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Flip cards stagger
    gsap.utils.toArray('.flip-card').forEach((card, i) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: (i % 3) * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Closing confetti on scroll into view
    ScrollTrigger.create({
      trigger: '#closing',
      start: 'top 60%',
      once: true,
      onEnter: spawnConfetti,
    });
  }

  /* ========== YOUTUBE MUSIC — Hawayein autoplay ========== */
  function updateMusicUI(playing) {
    if (!musicToggle) return;
    const label = musicToggle.querySelector('.music-label');
    const title = SITE_CONFIG.youtubeSongTitle || 'Hawayein';
    musicToggle.classList.toggle('playing', playing);
    if (label) label.textContent = playing ? `Pause ${title}` : title;
  }

  function unmuteMusic() {
    if (!ytPlayer || typeof ytPlayer.unMute !== 'function') return;
    try {
      ytPlayer.unMute();
      ytPlayer.setVolume(80);
      musicNeedsUnmute = false;
    } catch (e) { /* ignore */ }
  }

  function startMusic() {
    const videoId = SITE_CONFIG.youtubeVideoId;
    if (!videoId || !ytPlayer) return;

    try {
      ytPlayer.playVideo();
      musicPlaying = true;
      updateMusicUI(true);

      // Try with sound first; browsers often block — fall back to muted
      try {
        ytPlayer.unMute();
        ytPlayer.setVolume(80);
        musicNeedsUnmute = false;
      } catch (e) {
        musicNeedsUnmute = true;
      }
    } catch (e) {
      try {
        ytPlayer.mute();
        ytPlayer.playVideo();
        musicPlaying = true;
        musicNeedsUnmute = true;
        updateMusicUI(true);
      } catch (e2) { /* ignore */ }
    }
  }

  function tryStartMusic() {
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      startMusic();
    }
  }

  function setupUnmuteOnInteraction() {
    const unlock = () => {
      if (musicNeedsUnmute) unmuteMusic();
      if (!musicPlaying) tryStartMusic();
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('scroll', unlock, { capture: true });
    };
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
    document.addEventListener('scroll', unlock, { once: true, capture: true });
  }

  window.onYouTubeIframeAPIReady = function () {
    const videoId = SITE_CONFIG.youtubeVideoId;
    if (!videoId) return;

    ytPlayer = new YT.Player('youtube-player', {
      height: '1',
      width: '1',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: videoId,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        mute: 1,
      },
      events: {
        onReady: () => {
          if (siteReady) tryStartMusic();
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            musicPlaying = true;
            updateMusicUI(true);
          } else if (e.data === YT.PlayerState.PAUSED) {
            musicPlaying = false;
            updateMusicUI(false);
          }
        },
      },
    });
  };

  function initMusicToggle() {
    if (!musicToggle) return;

    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const videoId = SITE_CONFIG.youtubeVideoId;
      if (!videoId) return;

      if (!ytPlayer && typeof YT !== 'undefined' && YT.Player) {
        window.onYouTubeIframeAPIReady();
        setTimeout(() => musicToggle.click(), 800);
        return;
      }

      if (!ytPlayer) return;

      if (musicPlaying) {
        ytPlayer.pauseVideo();
        musicPlaying = false;
        updateMusicUI(false);
      } else {
        unmuteMusic();
        ytPlayer.playVideo();
        musicPlaying = true;
        updateMusicUI(true);
      }
    });
  }

  /* ========== INIT ========== */
  function initSite() {
    applyConfig();
    renderTimeline();
    renderVideos();
    renderLetter();
    renderReasons();
    startCounter();
    initParticles();
    initMusicToggle();

    // Defer GSAP until layout ready
    requestAnimationFrame(() => {
      initGSAP();
    });
  }

  /* ========== BOOT ========== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPreloader);
  } else {
    runPreloader();
  }
})();
