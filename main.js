// Main Application - Card System with Animation & Color Randomizer

// ====== INTERNATIONALIZATION (i18n) ======
const translations = {
  en: {
    nav: {
      work: 'work',
      services: 'services',
      contact: "let's talk"
    },
    hero: {
      headline: 'systems that <span class="highlight">work</span>.',
      subtext: 'boutique design and development studio for startups, creatives and founders.<br>competitive rates, built from scratch.',
      cta1: 'start a project →',
      cta2: 'see our work'
    },
    services: {
      shuffle: 'shuffle animations',
      landing: {
        title: 'digital solutions',
        desc: 'custom websites with modern design and animations. built for performance and conversion.'
      },
      webapps: {
        title: 'web apps / products',
        desc: 'bespoke applications, tailored solutions and tools built for your specific needs.'
      },
      immersive: {
        title: 'immersive experiences',
        desc: 'building digital ecosystems for communities. interactive experiences with webgl, 3d, custom animations, and real-time features.'
      }
    },
    process: {
      step1: { title: 'intro call', desc: '15 min to understand your project. free, no pressure.' },
      step2: { title: 'proposal', desc: 'scope, timeline, and fixed price within 48 hours.' },
      step3: { title: 'build sprint', desc: 'we work fast. most projects ship in 1-4 weeks.' },
      step4: { title: 'launch + support', desc: 'go live, then optional retainer for ongoing needs.' }
    },
    work: {
      tag: 'recent work',
      badge: 'coming soon'
    },
    contact: {
      headline: 'ready to build something?',
      subtext: 'drop us a line. we respond fast.'
    }
  },
  es: {
    nav: {
      work: 'trabajo',
      services: 'servicios',
      contact: 'hablemos'
    },
    hero: {
      headline: 'sistemas que <span class="highlight">funcionan</span>.',
      subtext: 'estudio boutique de diseño y desarrollo para startups, creativos y fundadores.<br>tarifas competitivas, construido desde cero.',
      cta1: 'iniciar proyecto →',
      cta2: 'ver nuestro trabajo'
    },
    services: {
      shuffle: 'cambiar animaciones',
      landing: {
        title: 'soluciones digitales',
        desc: 'sitios web personalizados con diseño moderno y animaciones. construidos para rendimiento y conversión.'
      },
      webapps: {
        title: 'apps web / productos',
        desc: 'aplicaciones a medida, soluciones personalizadas y herramientas construidas para tus necesidades específicas.'
      },
      immersive: {
        title: 'experiencias inmersivas',
        desc: 'construyendo ecosistemas digitales para comunidades. experiencias interactivas con webgl, 3d, animaciones personalizadas y funciones en tiempo real.'
      }
    },
    process: {
      step1: { title: 'llamada intro', desc: '15 min para entender tu proyecto. gratis, sin compromiso.' },
      step2: { title: 'propuesta', desc: 'alcance, timeline y precio fijo en 48 horas.' },
      step3: { title: 'sprint de desarrollo', desc: 'trabajamos rápido. la mayoría de proyectos se entregan en 1-4 semanas.' },
      step4: { title: 'lanzamiento + soporte', desc: 'salimos en vivo, luego retainer opcional para necesidades continuas.' }
    },
    work: {
      tag: 'trabajo reciente',
      badge: 'próximamente'
    },
    contact: {
      headline: '¿listo para crear algo?',
      subtext: 'escríbenos. respondemos rápido (como todo lo que hacemos).'
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

  // Update work track badges
  document.querySelectorAll('.work-badge-inline').forEach(badge => {
    badge.textContent = t.work.badge;
  });

  // Update toggle button
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? 'es' : 'en';
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

// Mobile hamburger menu
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
}

const services = [
  {
    title: 'digital solutions',
    desc: 'custom websites with modern design and animations. built for performance and conversion.',
    gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG8zeGQxbjhqajk0MDQ5N3dwZm1kY3JsMTU3N3ltbHlpb2czMDMweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bz9PIxJMQtkO943XeS/giphy.gif'
  },
  {
    title: 'web apps / products',
    desc: 'bespoke applications, tailored solutions and tools built for your specific needs.',
    gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2VvYzA1bWN3MWhma3F2YTR3bGx4aW1wMjd5cWVuOWZhZG1nZTdzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wgHY9nSrlTMt2/giphy.gif'
  },
  {
    title: 'immersive experiences',
    desc: 'building digital ecosystems for communities. interactive experiences with webgl, 3d, custom animations, and real-time features.',
    gif: 'https://38.media.tumblr.com/807d0662a240d33e4a8dfce3c128f654/tumblr_nriviszxIb1s2t3cto1_500.gif'
  }
];

const workItems = [
  {
    title: 'flyin',
    type: 'web app',
    badge: 'live',
    desc: 'helicopter tour booking platform for guatemala. real-time availability, payment processing, and automated confirmations.',
    link: 'https://flyinguate.com/',
    image: 'images/flyin-screenshot.png'
  },
  {
    title: 'stablepay',
    type: 'decentralized payments enabler',
    badge: 'live',
    desc: 'stablecoin enablement platform for small merchants. gateway for decentralized payments with crypto-native backends.',
    link: 'https://stablepay-nine.vercel.app/crypto-pay.html?productId=Special&productName=Special+Edition&price=0.5',
    image: 'images/stablepay-screenshot.png'
  },
  {
    title: 'umo archive',
    type: 'live music archive',
    badge: 'live',
    desc: 'live music setlist archive and discovery platform. browse performances, track artists, and explore music history.',
    link: 'https://umo-live.xyz',
    image: 'images/umo-screenshot.png'
  },
  {
    title: 'geese live archive',
    type: 'live music archive',
    badge: 'live',
    desc: 'live performance archive for geese. explore setlists, recordings, and concert history.',
    link: 'https://geeselive-production-4233.up.railway.app/',
    image: 'images/geese-screenshot.png'
  },
  {
    title: 'eztix',
    type: 'p2p ticketing platform',
    badge: 'live',
    desc: 'decentralized ticketing platform to empower artists and users. build events, sell tickets, and connect communities on-chain.',
    link: 'https://eztix-lyart.vercel.app',
    image: 'images/eztix-screenshot.png'
  },
  {
    title: 'stash',
    type: 'decentralized storage provider',
    badge: 'live',
    desc: 'decentralized storage infrastructure. upload, manage, and access data on distributed networks with permanent, censorship-resistant storage.',
    link: 'https://aeter-eight.vercel.app/',
    image: 'images/stash-screenshot.png'
  },
  {
    title: 'lynx',
    type: 'creator profile platform',
    badge: 'wip',
    desc: 'link-in-bio meets patronage for artists and small businesses. unified profiles with stripe and crypto payments, music-first design, and built-in support tools.',
    link: '#',
    image: 'images/lynx-screenshot.png'
  },
  {
    title: 'stok',
    type: 'inventory management system',
    badge: 'wip',
    desc: 'inventory and warehousing platform for small restaurants and manufacturers. connected worker module for real-time stock tracking and operations management.',
    link: '#',
    image: 'images/stok-screenshot.png'
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
    'landing pages': 'landingPage',
    'web apps / products': 'codeMatrix',
    'immersive experiences': 'bokeh'
  };

  // Custom colors for specific services
  const customColors = {
    'immersive experiences': 'fire'
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

// Initialize work list (rocola/jukebox tracklist - all visible, accordion expand)
function initWorkList() {
  const grid = document.getElementById('work-grid');
  grid.innerHTML = '';
  grid.className = 'work-list';

  // Shuffle order each time
  const shuffled = [...workItems].sort(() => Math.random() - 0.5);

  shuffled.forEach((item, idx) => {
    const track = document.createElement('div');
    track.className = 'work-track';
    track.innerHTML = `
      <div class="work-track-header">
        <span class="work-track-indicator">▶</span>
        <div class="work-track-info">
          <div class="work-track-title">${item.title}</div>
          <div class="work-track-type">${item.type}</div>
        </div>
        ${item.badge ? `<span class="work-badge-inline" data-badge="${item.badge.toLowerCase()}">${item.badge}</span>` : ''}
      </div>
      <div class="work-track-body">
        <div class="work-track-body-inner">
          ${item.image ? `<img class="work-track-image" src="${item.image}" alt="${item.title}" loading="lazy">` : ''}
          ${item.desc ? `<p class="work-track-desc">${item.desc}</p>` : ''}
          ${item.link && item.link !== '#' ? `<a href="${item.link}" class="work-link" target="_blank" rel="noopener">visit site</a>` : ''}
        </div>
      </div>
    `;

    track.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return; // don't toggle on link click
      const wasActive = track.classList.contains('active');
      // Close all
      grid.querySelectorAll('.work-track.active').forEach(t => t.classList.remove('active'));
      // Toggle clicked
      if (!wasActive) track.classList.add('active');
    });

    grid.appendChild(track);
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
    'landing pages': 'landingPage',
    'web apps / products': 'codeMatrix',
    'immersive experiences': 'bokeh'
  };
  const customColors = {
    'immersive experiences': 'fire'
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

  // Work list doesn't need randomization (no ASCII animations)

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
  initWorkList();
  initSpecialAnimations();
  initLanguageToggle();
  initHamburgerMenu();

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
