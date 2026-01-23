// Main Application - Card System with Animation & Color Randomizer

// ====== INTERNATIONALIZATION (i18n) ======
const translations = {
  en: {
    nav: {
      work: 'Work',
      services: 'Services',
      contact: "Let's Talk"
    },
    hero: {
      headline: 'What you imagine,<br>we <span class="highlight">ship</span>.',
      subtext: 'Design & development studio for founders, startups, and creatives. Custom-coded, no templates. Fast turnaround, competitive rates.',
      cta1: 'Start a Project →',
      cta2: 'See Our Work'
    },
    services: {
      shuffle: 'Shuffle Animations',
      landing: {
        title: 'Landing Pages',
        desc: 'High-converting pages with custom animations. No templates, no bloat.'
      },
      webapps: {
        title: 'Web Apps / Products',
        desc: 'Custom web applications, dashboards, and digital products. Built to scale.'
      },
      immersive: {
        title: 'Immersive Experiences',
        desc: 'WebGL, 3D, ASCII art, particle systems. Websites that feel like products.'
      }
    },
    process: {
      step1: { title: 'Intro Call', desc: '15 min to understand your project. Free, no pressure.' },
      step2: { title: 'Proposal', desc: 'Scope, timeline, and fixed price within 48 hours.' },
      step3: { title: 'Build Sprint', desc: 'We work fast. Most projects ship in 1-4 weeks.' },
      step4: { title: 'Launch + Support', desc: 'Go live, then optional retainer for ongoing needs.' }
    },
    work: {
      tag: 'Selected Work',
      badge: 'Coming Soon'
    },
    contact: {
      headline: 'Ready to build something?',
      subtext: 'Drop us a line. We respond fast (like everything else we do).'
    }
  },
  es: {
    nav: {
      work: 'Trabajo',
      services: 'Servicios',
      contact: 'Hablemos'
    },
    hero: {
      headline: 'Lo que imaginas,<br>lo <span class="highlight">hacemos realidad</span>.',
      subtext: 'Estudio de diseño y desarrollo para fundadores, startups y creativos. Código personalizado, sin plantillas. Entrega rápida, precios competitivos.',
      cta1: 'Iniciar Proyecto →',
      cta2: 'Ver Nuestro Trabajo'
    },
    services: {
      shuffle: 'Cambiar Animaciones',
      landing: {
        title: 'Landing Pages',
        desc: 'Páginas de alta conversión con animaciones personalizadas. Sin plantillas, sin excesos.'
      },
      webapps: {
        title: 'Apps Web / Productos',
        desc: 'Aplicaciones web personalizadas, dashboards y productos digitales. Hechos para escalar.'
      },
      immersive: {
        title: 'Experiencias Inmersivas',
        desc: 'WebGL, 3D, ASCII art, sistemas de partículas. Sitios web que se sienten como productos.'
      }
    },
    process: {
      step1: { title: 'Llamada Intro', desc: '15 min para entender tu proyecto. Gratis, sin compromiso.' },
      step2: { title: 'Propuesta', desc: 'Alcance, timeline y precio fijo en 48 horas.' },
      step3: { title: 'Sprint de Desarrollo', desc: 'Trabajamos rápido. La mayoría de proyectos se entregan en 1-4 semanas.' },
      step4: { title: 'Lanzamiento + Soporte', desc: 'Salimos en vivo, luego retainer opcional para necesidades continuas.' }
    },
    work: {
      tag: 'Trabajo Seleccionado',
      badge: 'Próximamente'
    },
    contact: {
      headline: '¿Listo para crear algo?',
      subtext: 'Escríbenos. Respondemos rápido (como todo lo que hacemos).'
    }
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
      value = value?.[k];
    }
    if (value) {
      el.innerHTML = value;
    }
  });

  // Update service cards
  updateServiceCardTranslations(t);

  // Update work card badges
  document.querySelectorAll('.work-badge').forEach(badge => {
    badge.textContent = t.work.badge;
  });

  // Update toggle button
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  }

  // Update html lang attribute
  document.documentElement.lang = lang;
}

function updateServiceCardTranslations(t) {
  const serviceKeys = ['landing', 'webapps', 'immersive'];
  document.querySelectorAll('#services-grid .card').forEach((card, idx) => {
    const key = serviceKeys[idx];
    if (t.services[key]) {
      const title = card.querySelector('.card-title');
      const desc = card.querySelector('.card-desc');
      if (title) title.textContent = t.services[key].title;
      if (desc) desc.textContent = t.services[key].desc;
    }
  });
}

function initLanguageToggle() {
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'es' : 'en';
      setLanguage(newLang);
    });
  }
}

const services = [
  {
    title: 'Landing Pages',
    desc: 'High-converting pages with custom animations. No templates, no bloat.',
    gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG8zeGQxbjhqajk0MDQ5N3dwZm1kY3JsMTU3N3ltbHlpb2czMDMweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bz9PIxJMQtkO943XeS/giphy.gif'
  },
  {
    title: 'Web Apps / Products',
    desc: 'Custom web applications, dashboards, and digital products. Built to scale.',
    gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2VvYzA1bWN3MWhma3F2YTR3bGx4aW1wMjd5cWVuOWZhZG1nZTdzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wgHY9nSrlTMt2/giphy.gif'
  },
  {
    title: 'Immersive Experiences',
    desc: 'WebGL, 3D, ASCII art, particle systems. Websites that feel like products.',
    gif: 'https://38.media.tumblr.com/807d0662a240d33e4a8dfce3c128f654/tumblr_nriviszxIb1s2t3cto1_500.gif'
  }
];

const workItems = [
  {
    title: 'FlyInGuate',
    type: 'Web App',
    desc: 'Helicopter tour booking platform for Guatemala. Real-time availability, payment processing, and automated confirmations.',
    link: 'https://flyinguate.com/',
    embed: 'https://flyinguate.com/'
  },
  {
    title: 'StablePay',
    type: 'Web3 Platform',
    badge: 'Live',
    desc: 'Stablecoin payment infrastructure for cross-border transactions. Built on Ethereum and Polygon with USDC integration.',
    link: 'https://stablepay-nine.vercel.app/crypto-pay.html?productId=Special&productName=Special+Edition&price=0.5',
    embed: 'https://stablepay-nine.vercel.app/crypto-pay.html?productId=Special&productName=Special+Edition&price=0.5'
  },
  {
    title: 'UMO Archive',
    type: 'Music Platform',
    badge: 'Live',
    desc: 'Live music setlist archive and discovery platform. Browse performances, track artists, and explore music history.',
    link: 'https://umo-live.xyz',
    embed: 'https://umo-live.xyz',
    hasAudio: true
  },
  {
    title: 'Geese Live Archive',
    type: 'Music Platform',
    desc: 'Live performance archive for Geese. Explore setlists, recordings, and concert history.',
    link: 'https://geeselive-production-4233.up.railway.app/',
    embed: 'https://geeselive-production-4233.up.railway.app/',
    hasAudio: true
  },
  {
    title: 'Cipher',
    type: 'Web3 Consultancy',
    desc: 'Investment and consultancy platform for decentralized assets. Strategic advisory for crypto portfolios and DeFi protocols.',
    link: 'https://cipher-fp31ikpx4-gs-projects-1311714b.vercel.app',
    embed: 'https://cipher-fp31ikpx4-gs-projects-1311714b.vercel.app'
  }
];

// Color themes list
const colorThemes = [
  'cyber', 'neon', 'fire', 'ice', 'gold', 'vapor', 'matrix',
  'sunset', 'ocean', 'toxic', 'blood', 'royal', 'mint', 'coral',
  'arctic', 'lava'
];

// Gradient options
const gradients = [
  'gradient-vapor', 'gradient-sunset', 'gradient-ocean',
  'gradient-royal', 'gradient-fire', 'gradient-cyber'
];

// Animation state tracking
const animationState = {
  services: [],
  work: [],
  hero: { animation: null, color: null },
  contact: { animation: null, color: null },
  running: true
};

// Get random color
function randomColor() {
  return colorThemes[Math.floor(Math.random() * colorThemes.length)];
}

// Get random gradient (with probability)
function maybeGradient() {
  if (Math.random() > 0.7) {
    return gradients[Math.floor(Math.random() * gradients.length)];
  }
  return null;
}

// Create dithered GIF element for service cards
function createDitheredGif(gifSrc) {
  const wrapper = document.createElement('div');
  wrapper.className = 'service-gif-wrapper';

  const img = document.createElement('img');
  img.src = gifSrc;
  img.className = 'service-gif';
  img.alt = '';

  // Halftone overlay
  const halftone = document.createElement('div');
  halftone.className = 'service-gif-halftone';

  // Scanline overlay
  const scanlines = document.createElement('div');
  scanlines.className = 'service-gif-scanlines';

  wrapper.appendChild(img);
  wrapper.appendChild(halftone);
  wrapper.appendChild(scanlines);

  return wrapper;
}

// Initialize service cards
function initServiceCards() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = '';

  // Custom animations for specific services
  const customAnimations = {
    'Landing Pages': 'landingPage',
    'Web Apps / Products': 'codeMatrix',
    'Immersive Experiences': 'bokeh'
  };

  // Custom colors for specific services
  const customColors = {
    'Immersive Experiences': 'fire'
  };

  services.forEach((service, idx) => {
    const animation = service.gif ? null : (customAnimations[service.title] || ASCII.random());
    const color = customColors[service.title] || randomColor();
    const gradient = maybeGradient();

    animationState.services[idx] = { animation, color, hasGif: !!service.gif };

    const card = document.createElement('div');
    let classes = `card color-${color}`;
    if (gradient) classes += ` ${gradient}`;
    if (service.gif) classes += ' has-gif';
    card.className = classes;

    card.innerHTML = `
      <div class="card-ascii" id="service-ascii-container-${idx}">
        <pre id="service-ascii-${idx}"></pre>
      </div>
      <div class="card-content">
        <div class="card-title">${service.title}</div>
        <div class="card-desc">${service.desc}</div>
      </div>
    `;
    grid.appendChild(card);

    // If service has a GIF, replace the ASCII animation
    if (service.gif) {
      const container = document.getElementById(`service-ascii-container-${idx}`);
      const pre = document.getElementById(`service-ascii-${idx}`);
      if (container && pre) {
        pre.style.display = 'none';
        const gifEl = createDitheredGif(service.gif);
        container.insertBefore(gifEl, container.firstChild);
      }
    }
  });
}

// Work carousel state
let currentWorkIndex = Math.floor(Math.random() * workItems.length);

// Create image element for work cards
function createWorkImage(imgSrc) {
  const wrapper = document.createElement('div');
  wrapper.className = 'pixel-art-wrapper';

  const img = document.createElement('img');
  img.src = imgSrc;
  img.className = 'pixel-art-img';
  img.alt = '';

  wrapper.appendChild(img);
  return wrapper;
}

// Create crossfade dither slideshow
function createDitherCollage(images) {
  const wrapper = document.createElement('div');
  wrapper.className = 'dither-slideshow';

  // Create image layers that crossfade
  images.forEach((src, idx) => {
    const layer = document.createElement('div');
    layer.className = 'dither-layer';
    layer.style.animationDelay = `${idx * 2}s`; // 2 seconds per image, 12s total cycle

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';

    layer.appendChild(img);
    wrapper.appendChild(layer);
  });

  // Add halftone overlay
  const halftone = document.createElement('div');
  halftone.className = 'dither-halftone';
  wrapper.appendChild(halftone);

  return wrapper;
}

// Create iframe embed for websites
function createIframeEmbed(url, hasAudio = false) {
  const wrapper = document.createElement('div');
  wrapper.className = 'work-iframe-wrapper';

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.className = 'work-iframe';
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');

  wrapper.appendChild(iframe);

  // Add dither overlay
  const ditherOverlay = document.createElement('div');
  ditherOverlay.className = 'iframe-dither-overlay';
  wrapper.appendChild(ditherOverlay);

  return wrapper;
}

// Create video player
function createVideoPlayer(videoUrl) {
  const wrapper = document.createElement('div');
  wrapper.className = 'work-video-wrapper';

  const video = document.createElement('video');
  video.src = videoUrl;
  video.className = 'work-video';
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'auto');

  // Prevent pausing
  video.addEventListener('pause', (e) => {
    video.play();
  });

  // Ensure autoplay starts
  video.addEventListener('loadeddata', () => {
    video.play().catch(err => console.log('Autoplay prevented:', err));
  });

  wrapper.appendChild(video);

  // Add dither overlay
  const ditherOverlay = document.createElement('div');
  ditherOverlay.className = 'video-dither-overlay';
  wrapper.appendChild(ditherOverlay);

  return wrapper;
}

// Initialize work cards (carousel - one at a time)
function initWorkCards() {
  const grid = document.getElementById('work-grid');
  grid.innerHTML = '';

  const customWorkColors = {
    'FlyInGuate': 'cyber',
    'StablePay': 'ice',
    'ArtTab': 'vapor',
    'UMO Archive': 'gold'
  };

  // Create all cards but only show current one
  workItems.forEach((item, idx) => {
    const color = customWorkColors[item.title] || randomColor();

    animationState.work[idx] = { animation: null, color, useImage: !!item.image };

    const card = document.createElement('div');
    card.className = `work-card color-${color}`;
    card.style.display = idx === currentWorkIndex ? 'block' : 'none';
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="work-ascii" id="work-ascii-container-${idx}">
        <pre id="work-ascii-${idx}"></pre>
      </div>
      <div class="work-content" data-index="${idx}">
        <div class="work-header">
          <div>
            <div class="work-title">${item.title}</div>
            <div class="work-type">${item.type}</div>
          </div>
          ${item.desc ? `<span class="work-expand-icon">▼</span>` : ''}
        </div>
        ${item.link && item.link !== '#' ? `<a href="${item.link}" class="work-link" target="_blank" rel="noopener">Visit Site →</a>` : ''}
      </div>
      ${item.desc ? `<div class="work-details" data-index="${idx}">
        <p class="work-desc">${item.desc}</p>
      </div>` : ''}
    `;

    // Add click handler for expand/collapse
    const contentEl = card.querySelector('.work-content');
    const detailsEl = card.querySelector('.work-details');
    if (contentEl && detailsEl) {
      contentEl.addEventListener('click', () => {
        contentEl.classList.toggle('expanded');
        detailsEl.classList.toggle('expanded');
      });
    }

    grid.appendChild(card);

    // Show media based on type: embed, video, collage, or single image
    const container = document.getElementById(`work-ascii-container-${idx}`);
    const pre = document.getElementById(`work-ascii-${idx}`);

    if (container && pre) {
      if (item.embed) {
        // Embedded website
        pre.style.display = 'none';
        const embedEl = createIframeEmbed(item.embed, item.hasAudio);
        container.insertBefore(embedEl, container.firstChild);
      } else if (item.video) {
        // Video player
        pre.style.display = 'none';
        const videoEl = createVideoPlayer(item.video);
        container.insertBefore(videoEl, container.firstChild);
      } else if (item.collage && item.images) {
        // Image collage
        pre.style.display = 'none';
        const collageEl = createDitherCollage(item.images);
        container.insertBefore(collageEl, container.firstChild);
      } else if (item.image) {
        // Single image
        pre.style.display = 'none';
        const imageWrapper = createWorkImage(item.image);
        container.insertBefore(imageWrapper, container.firstChild);
      }
    }
  });

  // Set up carousel controls
  const prevBtn = document.getElementById('work-prev');
  const nextBtn = document.getElementById('work-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => showWorkCard(currentWorkIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => showWorkCard(currentWorkIndex + 1));
  }
}

// Show specific work card
function showWorkCard(index) {
  const cards = document.querySelectorAll('#work-grid .work-card');
  if (cards.length === 0) return;

  // Wrap around
  if (index < 0) index = cards.length - 1;
  if (index >= cards.length) index = 0;

  // Stop audio/video in hidden cards by reloading iframes
  cards.forEach((card, idx) => {
    if (idx !== index) {
      // Kill iframe/video when hiding
      const iframe = card.querySelector('.work-iframe');
      if (iframe) {
        const currentSrc = iframe.src;
        iframe.src = 'about:blank';
        // Reload when needed
        setTimeout(() => {
          iframe.src = currentSrc;
        }, 100);
      }
    }
  });

  currentWorkIndex = index;

  cards.forEach((card, idx) => {
    card.style.display = idx === index ? 'block' : 'none';
  });
}

// Hero dreamy color cycling
const heroColorCycle = {
  colors: ['cyber', 'ice', 'vapor', 'neon', 'gold', 'coral', 'royal', 'mint'],
  currentIndex: 0,
  lastChange: 0,
  interval: 4000 // Change color every 4 seconds
};

function updateHeroColor(time) {
  if (time - heroColorCycle.lastChange > heroColorCycle.interval) {
    heroColorCycle.currentIndex = (heroColorCycle.currentIndex + 1) % heroColorCycle.colors.length;
    heroColorCycle.lastChange = time;

    const heroAscii = document.querySelector('.hero-ascii pre');
    if (heroAscii) {
      const colorName = heroColorCycle.colors[heroColorCycle.currentIndex];
      const colors = ASCII.colors[colorName];
      if (colors) {
        heroAscii.style.color = colors.primary;
      }
    }
  }
}

// Initialize hero and contact animations
function initSpecialAnimations() {
  // Hero always uses bokeh for dreamy effect
  animationState.hero = {
    animation: 'bokeh',
    color: heroColorCycle.colors[0]
  };
  animationState.contact = {
    animation: ASCII.random(),
    color: randomColor()
  };

  // Apply hero color
  const heroAscii = document.querySelector('.hero-ascii pre');
  if (heroAscii) {
    const colors = ASCII.colors[animationState.hero.color];
    if (colors) heroAscii.style.color = colors.primary;
  }
}

// Randomize all animations and colors
function randomizeAnimations() {
  // Clear animation states to reset stateful animations
  ASCII.matrixState.clear();
  ASCII.particlesState.clear();
  ASCII.starsState.clear();
  ASCII.fireState.clear();
  ASCII.constellationState.clear();
  ASCII.bokehState.clear();
  ASCII.rainState.clear();
  ASCII.bubblesState.clear();

  // Randomize services (preserve custom animations and GIFs)
  const customAnimations = {
    'Landing Pages': 'landingPage',
    'Web Apps / Products': 'codeMatrix',
    'Immersive Experiences': 'bokeh'
  };
  const customColors = {
    'Immersive Experiences': 'fire'
  };
  const servicesGrid = document.getElementById('services-grid');
  servicesGrid.querySelectorAll('.card').forEach((card, idx) => {
    const service = services[idx];
    const title = service?.title;
    const hasGif = !!service?.gif;
    const animation = hasGif ? null : (customAnimations[title] || ASCII.random());
    const color = customColors[title] || randomColor();
    const gradient = maybeGradient();

    animationState.services[idx] = { animation, color, hasGif };

    // Update classes
    card.className = `card color-${color}`;
    if (gradient) card.classList.add(gradient);
    if (hasGif) card.classList.add('has-gif');
  });

  // Work cards keep their fixed animations/colors, just update display
  const workGrid = document.getElementById('work-grid');
  workGrid.querySelectorAll('.work-card').forEach((card, idx) => {
    // Preserve carousel display state
    card.style.display = idx === currentWorkIndex ? 'block' : 'none';
  });

  // Hero always stays bokeh (color cycles automatically)
  animationState.hero = {
    animation: 'bokeh',
    color: heroColorCycle.colors[heroColorCycle.currentIndex]
  };
  // Randomize contact
  animationState.contact = {
    animation: ASCII.random(),
    color: randomColor()
  };

}

// Animation loop with frame skipping for performance
let frameCount = 0;
const frameSkip = 3; // Only render every 3rd frame (60fps -> 20fps)
const heroFrameSkip = 6; // Hero needs even more skipping due to expensive bokeh

function animate() {
  if (!animationState.running) return;

  frameCount++;

  // Skip frames to reduce CPU load
  const shouldRenderNormal = frameCount % frameSkip === 0;
  const shouldRenderHero = frameCount % heroFrameSkip === 0;

  if (!shouldRenderNormal && !shouldRenderHero) {
    requestAnimationFrame(animate);
    return;
  }

  // Animate service cards (skip cards with GIFs)
  if (shouldRenderNormal) {
    animationState.services.forEach((state, idx) => {
      if (state.hasGif) return; // Skip GIF cards
      const canvas = document.getElementById(`service-ascii-${idx}`);
      if (canvas && state.animation) {
        ASCII.animate(canvas, state.animation, 45, 14);
      }
    });

    // Animate work cards
    animationState.work.forEach((state, idx) => {
      const canvas = document.getElementById(`work-ascii-${idx}`);
      if (canvas && state.animation) {
        ASCII.animate(canvas, state.animation, 60, 22);
      }
    });

  }

  // Animate hero (bokeh with color cycling) - smaller canvas + more skipping for performance
  if (shouldRenderHero) {
    const heroCanvas = document.getElementById('hero-animation');
    if (heroCanvas && animationState.hero.animation) {
      ASCII.animate(heroCanvas, animationState.hero.animation, 50, 25);
      updateHeroColor(performance.now());
    }
  }

  requestAnimationFrame(animate);
}

// Initialize everything
function init() {
  initServiceCards();
  initWorkCards();
  initSpecialAnimations();
  initLanguageToggle();

  // Start animation loop
  requestAnimationFrame(animate);

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);

// Pause animations when tab is hidden (performance)
document.addEventListener('visibilitychange', () => {
  animationState.running = !document.hidden;
  if (animationState.running) requestAnimationFrame(animate);
});
