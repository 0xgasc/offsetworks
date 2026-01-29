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
      headline: 'systems that <span class="highlight">work</span>.',
      subtext: 'boutique design and development studio for startups, creatives and founders.<br>competitive rates, built from scratch.',
      cta1: 'Start a Project →',
      cta2: 'See Our Work'
    },
    services: {
      shuffle: 'Shuffle Animations',
      landing: {
        title: 'Digital Solutions',
        desc: 'Custom websites with modern design and animations. Built for performance and conversion.'
      },
      webapps: {
        title: 'Web Apps / Products',
        desc: 'Bespoke applications, tailored solutions and tools built for your specific needs.'
      },
      immersive: {
        title: 'Immersive Experiences',
        desc: 'Building digital ecosystems for communities. Interactive experiences with WebGL, 3D, custom animations, and real-time features.'
      }
    },
    process: {
      step1: { title: 'Intro Call', desc: '15 min to understand your project. Free, no pressure.' },
      step2: { title: 'Proposal', desc: 'Scope, timeline, and fixed price within 48 hours.' },
      step3: { title: 'Build Sprint', desc: 'We work fast. Most projects ship in 1-4 weeks.' },
      step4: { title: 'Launch + Support', desc: 'Go live, then optional retainer for ongoing needs.' }
    },
    work: {
      tag: 'Recent Work',
      badge: 'Coming Soon'
    },
    contact: {
      headline: 'Ready to build something?',
      subtext: 'Drop us a line. We respond fast.'
    }
  },
  es: {
    nav: {
      work: 'Trabajo',
      services: 'Servicios',
      contact: 'Hablemos'
    },
    hero: {
      headline: 'sistemas que <span class="highlight">funcionan</span>.',
      subtext: 'estudio boutique de diseño y desarrollo para startups, creativos y fundadores.<br>tarifas competitivas, construido desde cero.',
      cta1: 'Iniciar Proyecto →',
      cta2: 'Ver Nuestro Trabajo'
    },
    services: {
      shuffle: 'Cambiar Animaciones',
      landing: {
        title: 'Soluciones Digitales',
        desc: 'Sitios web personalizados con diseño moderno y animaciones. Construidos para rendimiento y conversión.'
      },
      webapps: {
        title: 'Apps Web / Productos',
        desc: 'Aplicaciones a medida, soluciones personalizadas y herramientas construidas para tus necesidades específicas.'
      },
      immersive: {
        title: 'Experiencias Inmersivas',
        desc: 'Construyendo ecosistemas digitales para comunidades. Experiencias interactivas con WebGL, 3D, animaciones personalizadas y funciones en tiempo real.'
      }
    },
    process: {
      step1: { title: 'Llamada Intro', desc: '15 min para entender tu proyecto. Gratis, sin compromiso.' },
      step2: { title: 'Propuesta', desc: 'Alcance, timeline y precio fijo en 48 horas.' },
      step3: { title: 'Sprint de Desarrollo', desc: 'Trabajamos rápido. La mayoría de proyectos se entregan en 1-4 semanas.' },
      step4: { title: 'Lanzamiento + Soporte', desc: 'Salimos en vivo, luego retainer opcional para necesidades continuas.' }
    },
    work: {
      tag: 'Trabajo Reciente',
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

  // Update work track badges
  document.querySelectorAll('.work-badge-inline').forEach(badge => {
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
    title: 'Digital Solutions',
    desc: 'Custom websites with modern design and animations. Built for performance and conversion.',
    gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG8zeGQxbjhqajk0MDQ5N3dwZm1kY3JsMTU3N3ltbHlpb2czMDMweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bz9PIxJMQtkO943XeS/giphy.gif'
  },
  {
    title: 'Web Apps / Products',
    desc: 'Bespoke applications, tailored solutions and tools built for your specific needs.',
    gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2VvYzA1bWN3MWhma3F2YTR3bGx4aW1wMjd5cWVuOWZhZG1nZTdzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wgHY9nSrlTMt2/giphy.gif'
  },
  {
    title: 'Immersive Experiences',
    desc: 'Building digital ecosystems for communities. Interactive experiences with WebGL, 3D, custom animations, and real-time features.',
    gif: 'https://38.media.tumblr.com/807d0662a240d33e4a8dfce3c128f654/tumblr_nriviszxIb1s2t3cto1_500.gif'
  }
];

const workItems = [
  {
    title: 'Flyin',
    type: 'Web App',
    desc: 'Helicopter tour booking platform for Guatemala. Real-time availability, payment processing, and automated confirmations.',
    link: 'https://flyinguate.com/',
    image: 'images/flyin-screenshot.png'
  },
  {
    title: 'StablePay',
    type: 'Decentralized Payments Enabler',
    badge: 'Live',
    desc: 'Stablecoin enablement platform for small merchants. Gateway for decentralized payments with crypto-native backends.',
    link: 'https://stablepay-nine.vercel.app/crypto-pay.html?productId=Special&productName=Special+Edition&price=0.5',
    image: 'images/stablepay-screenshot.png'
  },
  {
    title: 'UMO Archive',
    type: 'Live Music Archive',
    badge: 'Live',
    desc: 'Live music setlist archive and discovery platform. Browse performances, track artists, and explore music history.',
    link: 'https://umo-live.xyz',
    image: 'images/umo-screenshot.png'
  },
  {
    title: 'Geese Live Archive',
    type: 'Live Music Archive',
    desc: 'Live performance archive for Geese. Explore setlists, recordings, and concert history.',
    link: 'https://geeselive-production-4233.up.railway.app/',
    image: 'images/geese-screenshot.png'
  },
  {
    title: 'EZTix (WIP)',
    type: 'P2P Ticketing Platform',
    desc: 'Decentralized ticketing platform to empower artists and users. Build events, sell tickets, and connect communities on-chain.',
    link: 'https://eztix-lyart.vercel.app',
    image: 'images/eztix-screenshot.png'
  },
  {
    title: 'Stash',
    type: 'Decentralized Storage Provider',
    desc: 'Decentralized storage infrastructure. Upload, manage, and access data on distributed networks with permanent, censorship-resistant storage.',
    link: '#',
    image: 'images/stash-screenshot.png'
  },
  {
    title: 'Stok',
    type: 'Inventory Management System',
    desc: 'Inventory and warehousing platform for small restaurants and manufacturers. Connected worker module for real-time stock tracking and operations management.',
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

// Initialize work list (rocola/jukebox tracklist - all visible, accordion expand)
function initWorkList() {
  const grid = document.getElementById('work-grid');
  grid.innerHTML = '';
  grid.className = 'work-list';

  workItems.forEach((item, idx) => {
    const track = document.createElement('div');
    track.className = 'work-track';
    track.innerHTML = `
      <div class="work-track-header">
        <span class="work-track-number">${String(idx + 1).padStart(2, '0')}</span>
        <span class="work-track-indicator">▶</span>
        <div class="work-track-info">
          <div class="work-track-title">${item.title}</div>
          <div class="work-track-type">${item.type}</div>
        </div>
        ${item.badge ? `<span class="work-badge-inline">${item.badge}</span>` : ''}
      </div>
      <div class="work-track-body">
        <div class="work-track-body-inner">
          ${item.image ? `<img class="work-track-image" src="${item.image}" alt="${item.title}" loading="lazy">` : ''}
          ${item.desc ? `<p class="work-track-desc">${item.desc}</p>` : ''}
          ${item.link && item.link !== '#' ? `<a href="${item.link}" class="work-link" target="_blank" rel="noopener">Visit Site</a>` : ''}
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
