// Main Application - Card System with Animation & Color Randomizer

// ====== INTERNATIONALIZATION (i18n) ======
// Localized SEO metadata — kept in sync with server.js ES_META.
const seoMeta = {
  en: {
    title: 'offset works — digital products that work',
    description: 'Boutique design and development studio for startups, creatives and founders. Built from scratch, shipped in weeks.',
    canonical: 'https://offsetworks.xyz/',
    ogLocale: 'en_US',
    ogLocaleAlt: 'es_GT',
    ogImage: 'https://offsetworks.xyz/images/og-en.png',
    ogImageAlt: 'offset works — systems that work.',
  },
  es: {
    title: 'offset works — productos digitales que funcionan',
    description: 'Estudio boutique de diseño y desarrollo para startups, creativos y fundadores. Hechos desde cero, lanzados en semanas.',
    canonical: 'https://offsetworks.xyz/es',
    ogLocale: 'es_GT',
    ogLocaleAlt: 'en_US',
    ogImage: 'https://offsetworks.xyz/images/og-es.png',
    ogImageAlt: 'offset works — sistemas que funcionan.',
  },
};

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
      badges: {
        live: 'live',
        wip: 'launching soon'
      },
      visitSite: 'visit site'
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
      subtext: 'estudio boutique de diseño y desarrollo para startups, creativos y fundadores.<br>tarifas competitivas, hecho desde cero.',
      cta1: 'empezar proyecto →',
      cta2: 'ver trabajo'
    },
    services: {
      shuffle: 'mezclar animaciones',
      landing: {
        title: 'soluciones digitales',
        desc: 'sitios web personalizados con diseño moderno y animaciones. hechos para rendimiento y conversión.'
      },
      webapps: {
        title: 'apps web / productos',
        desc: 'aplicaciones a medida, soluciones y herramientas hechas para tus necesidades específicas.'
      },
      immersive: {
        title: 'experiencias inmersivas',
        desc: 'ecosistemas digitales para comunidades. experiencias interactivas con webgl, 3d, animaciones y funciones en tiempo real.'
      }
    },
    process: {
      step1: { title: 'llamada intro', desc: '15 min para entender tu proyecto. gratis, sin presión.' },
      step2: { title: 'propuesta', desc: 'alcance, timeline y precio fijo en 48 horas.' },
      step3: { title: 'sprint de desarrollo', desc: 'trabajamos rápido. la mayoría de proyectos salen en 1-4 semanas.' },
      step4: { title: 'lanzamiento + soporte', desc: 'salimos en vivo, después retainer opcional para lo que necesites.' }
    },
    work: {
      tag: 'trabajo reciente',
      badges: {
        live: 'en vivo',
        wip: 'próximamente'
      },
      visitSite: 'ver sitio'
    },
    contact: {
      headline: '¿listo para crear algo?',
      subtext: 'escríbenos. respondemos rápido.'
    }
  }
};

let currentLang = 'en';

// Check URL for language: pathname (/es, /en) first, then ?lang= query
function getInitialLanguage() {
  const path = window.location.pathname;
  if (path === '/es' || path.startsWith('/es/')) return 'es';
  if (path === '/en' || path.startsWith('/en/')) return 'en';

  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  if (langParam && translations[langParam]) {
    return langParam;
  }
  return 'en';
}

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

  // Update work track badges based on their data-badge attribute
  document.querySelectorAll('.work-badge-inline').forEach(badge => {
    const badgeType = badge.dataset.badge;
    if (badgeType && t.work.badges[badgeType]) {
      badge.textContent = t.work.badges[badgeType];
    }
  });

  // Update visit site links
  document.querySelectorAll('.work-link').forEach(link => {
    link.textContent = t.work.visitSite;
  });

  // Update work items (type, desc)
  updateWorkItemTranslations();

  // Update toggle button
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? 'es' : 'en';
  }

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Update SEO/meta tags so they match the active language
  const meta = seoMeta[lang];
  if (meta) {
    document.title = meta.title;
    const set = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', meta.description);
    set('link[rel="canonical"]', 'href', meta.canonical);
    set('meta[property="og:title"]', 'content', meta.title);
    set('meta[property="og:description"]', 'content', meta.description);
    set('meta[property="og:url"]', 'content', meta.canonical);
    set('meta[property="og:locale"]', 'content', meta.ogLocale);
    set('meta[property="og:locale:alternate"]', 'content', meta.ogLocaleAlt);
    set('meta[name="twitter:title"]', 'content', meta.title);
    set('meta[name="twitter:description"]', 'content', meta.description);
    set('meta[property="og:image"]', 'content', meta.ogImage);
    set('meta[property="og:image:alt"]', 'content', meta.ogImageAlt);
    set('meta[name="twitter:image"]', 'content', meta.ogImage);
  }
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
      const newPath = newLang === 'es' ? '/es' : '/';
      history.replaceState({}, '', newPath + window.location.hash);
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
    type: { en: 'helicopter tours, online', es: 'tours en helicóptero, en línea' },
    badge: 'wip',
    desc: {
      en: 'helicopter tours over guatemala, booked in seconds. pick a route, pay, and the confirmation hits your inbox before you close the tab.',
      es: 'tours en helicóptero sobre guatemala, reservados en segundos. elegí ruta, pagá, y la confirmación te llega al correo antes de cerrar la pestaña.'
    },
    link: 'https://flyinguate.vercel.app/',
    image: 'images/flyin-screenshot.png'
  },
  {
    title: 'stablepay',
    type: { en: 'payments for small merchants', es: 'pagos para pequeños comercios' },
    badge: 'live',
    desc: {
      en: 'accept dollar-stable payments from any customer, anywhere. no bank, no chargebacks — money lands in your wallet instantly.',
      es: 'recibí pagos estables en dólares desde cualquier cliente. sin banco, sin chargebacks — el dinero entra a tu billetera al instante.'
    },
    link: 'https://stablepay-nine.vercel.app/',
    image: 'images/stablepay-screenshot.png'
  },
  {
    title: 'manto',
    type: { en: 'property management for landlords', es: 'gestión para arrendadores' },
    badge: 'live',
    desc: {
      en: 'collect rent, handle maintenance requests, and track every lease in one place. built for landlords in guatemala managing more than one property.',
      es: 'cobrá renta, atendé mantenimiento y llevá cada contrato desde un solo lugar. hecho para arrendadores en guatemala con más de una propiedad.'
    },
    link: 'https://manto-propiedades.vercel.app/',
    image: 'images/manto-screenshot.png'
  },
  {
    title: 'umo archive',
    type: { en: 'live music archive', es: 'archivo de música en vivo' },
    badge: 'live',
    useImage: true,
    desc: {
      en: 'every unknown mortal orchestra show, in one place. setlists, recordings, and a community-built history of every performance.',
      es: 'cada concierto de unknown mortal orchestra, en un solo lugar. setlists, grabaciones y un historial de cada presentación construido por la comunidad.'
    },
    link: 'https://umo.livemoments.online/songs',
    image: 'images/umo-screenshot.png'
  },
  {
    title: 'tiqueteo',
    type: { en: 'tickets + resale, for guatemala', es: 'tickets + reventa, para guatemala' },
    badge: 'live',
    desc: {
      en: 'buy tickets direct from the organizer, or pass them on safely when plans change. one app for going out in guatemala.',
      es: 'comprá tickets directo del organizador, o pasalos de forma segura cuando cambien los planes. una sola app para salir en guatemala.'
    },
    link: 'https://tiqueteo-v2.vercel.app',
    image: 'images/tiqueteo-screenshot.png'
  },
  {
    title: 'stash',
    type: { en: 'permanent file storage', es: 'almacenamiento permanente de archivos' },
    badge: 'live',
    desc: {
      en: 'upload once, keep forever. files live on a network that does not go down — even if the company behind it does.',
      es: 'subí una vez, guardalo para siempre. los archivos viven en una red que no se cae, ni aunque la empresa detrás desaparezca.'
    },
    link: 'https://aeter-eight.vercel.app/',
    image: 'images/stash-screenshot.png'
  },
  {
    title: 'lynx',
    type: { en: 'one page for artists', es: 'una página para artistas' },
    badge: 'wip',
    desc: {
      en: 'your music, links, store, and tips on a single page. built for independent artists, made to actually get you paid.',
      es: 'tu música, links, tienda y propinas en una sola página. hecha para artistas independientes, pensada para que cobres de verdad.'
    },
    link: '#',
    image: 'images/lynx-screenshot.png'
  },
  {
    title: 'stok',
    type: { en: 'inventory for small businesses', es: 'inventario para pequeños negocios' },
    badge: 'wip',
    desc: {
      en: 'know what is in stock at every location, in real time. for restaurants, bars, and small manufacturers ready to grow.',
      es: 'sabé qué hay en stock en cada lugar, en tiempo real. para restaurantes, bares y pequeños fabricantes listos para crecer.'
    },
    link: '#',
    image: 'images/stok-screenshot.png'
  },
  {
    title: 'obro',
    type: { en: 'construction expenses, simplified', es: 'gastos de obra, simplificados' },
    badge: 'live',
    desc: {
      en: 'every cobro, gasto, and documento for your construction site in one app. for the residentes and contratistas who actually run the work.',
      es: 'cada cobro, gasto y documento de tu obra en una sola app. para los residentes y contratistas que de verdad llevan la obra.'
    },
    link: 'https://obro-gt.vercel.app',
    iframeSrc: 'https://obro-gt.vercel.app/login?demo=1',
    image: 'images/obro-screenshot.png'
  },
  {
    title: 'king of hearts',
    type: { en: 'fashion brand site', es: 'sitio de marca de ropa' },
    badge: 'live',
    desc: {
      en: 'website for the king of hearts clothing brand. interactive vintage tv channels turn each drop into a moment, with curated archives and a built-in shop.',
      es: 'sitio web para la marca de ropa king of hearts. canales de tv vintage interactivos convierten cada drop en un momento, con archivos curados y tienda integrada.'
    },
    link: 'https://sincerelykingofhearts.up.railway.app/',
    image: 'images/koh-screenshot.png'
  },
  {
    title: 'convoca',
    type: { en: 'civic event discovery', es: 'descubrimiento de eventos cívicos' },
    badge: 'live',
    useImage: true,
    desc: {
      en: 'find the protests, town halls, and community events near you that you would have missed. ai agents do the digging across instagram, telegram, and city calendars.',
      es: 'encontrá las protestas, asambleas y eventos comunitarios cerca tuyo que de otra forma se te pasaban. agentes de ia hacen el trabajo entre instagram, telegram y calendarios de la ciudad.'
    },
    link: 'https://convoca-web-production.up.railway.app/',
    image: 'images/convoca-screenshot.png'
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

// Store shuffled work items for consistent order
let shuffledWorkItems = [];

// Initialize work list (rocola/jukebox tracklist - all visible, accordion expand)
function initWorkList() {
  const grid = document.getElementById('work-grid');
  grid.innerHTML = '';
  grid.className = 'work-list';

  // Shuffle order once
  if (shuffledWorkItems.length === 0) {
    shuffledWorkItems = [...workItems].sort(() => Math.random() - 0.5);
  }

  const t = translations[currentLang];

  shuffledWorkItems.forEach((item, idx) => {
    const itemType = typeof item.type === 'object' ? item.type[currentLang] : item.type;
    const itemDesc = typeof item.desc === 'object' ? item.desc[currentLang] : item.desc;

    const track = document.createElement('div');
    track.className = 'work-track';
    track.dataset.itemIndex = idx;
    const hasLink = item.link && item.link !== '#';
    const useIframe = hasLink && !item.useImage;
    const needsZoom = false;

    // Media: iframe if we have a real link and aren't opted into image-only,
    // otherwise clickable image (if we have a link), otherwise plain image.
    let mediaContent = '';
    if (useIframe) {
      const iframeSrc = item.iframeSrc || item.link;
      // Lazy-mount: src empty until track is expanded. loading="lazy" alone
      // doesn't reliably fire inside a collapsed (max-height:0) accordion,
      // so we set src on first expand instead.
      mediaContent = `<div class="work-track-iframe-wrapper" data-link="${item.link}"><iframe class="work-track-iframe" src="about:blank" data-src="${iframeSrc}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe><div class="iframe-click-overlay"></div></div>`;
    } else if (item.image) {
      const zoomClass = needsZoom ? ' work-track-image-zoomed' : '';
      if (hasLink) {
        mediaContent = `<a href="${item.link}" target="_blank" rel="noopener" class="work-track-image-link"><img class="work-track-image${zoomClass}" src="${item.image}" alt="${item.title}" loading="lazy"></a>`;
      } else {
        mediaContent = `<img class="work-track-image${zoomClass}" src="${item.image}" alt="${item.title}" loading="lazy">`;
      }
    }

    track.innerHTML = `
      <div class="work-track-header">
        <span class="work-track-indicator">▶</span>
        <div class="work-track-info">
          <div class="work-track-title">${item.title}</div>
          <div class="work-track-type">${itemType}</div>
        </div>
        ${item.badge ? `<span class="work-badge-inline" data-badge="${item.badge.toLowerCase()}">${item.badge}</span>` : ''}
      </div>
      <div class="work-track-body">
        <div class="work-track-body-inner">
          ${itemDesc ? `<p class="work-track-desc">${itemDesc}</p>` : ''}
          ${mediaContent}
          ${hasLink ? `<a href="${item.link}" class="work-link" target="_blank" rel="noopener">${t.work.visitSite}</a>` : ''}
        </div>
      </div>
    `;

    track.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return; // don't toggle on link click

      // Handle iframe overlay click - open link in new tab
      if (e.target.classList.contains('iframe-click-overlay')) {
        const wrapper = e.target.closest('.work-track-iframe-wrapper');
        if (wrapper && wrapper.dataset.link) {
          window.open(wrapper.dataset.link, '_blank');
        }
        return;
      }

      // Handle WIP image click - show modal
      if (item.badge === 'wip' && e.target.classList.contains('work-track-image')) {
        if (window.showWipModal) window.showWipModal();
        return;
      }

      const wasActive = track.classList.contains('active');
      // Close all
      grid.querySelectorAll('.work-track.active').forEach(t => t.classList.remove('active'));
      // Toggle clicked
      if (!wasActive) {
        track.classList.add('active');
        // Lazy-mount the iframe src on first expand
        const iframe = track.querySelector('iframe.work-track-iframe[data-src]');
        if (iframe) {
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute('data-src');
        }
      }
    });

    grid.appendChild(track);
  });
}

// Update work items text when language changes
function updateWorkItemTranslations() {
  const t = translations[currentLang];

  document.querySelectorAll('.work-track').forEach(track => {
    const idx = parseInt(track.dataset.itemIndex);
    const item = shuffledWorkItems[idx];
    if (!item) return;

    const itemType = typeof item.type === 'object' ? item.type[currentLang] : item.type;
    const itemDesc = typeof item.desc === 'object' ? item.desc[currentLang] : item.desc;

    const typeEl = track.querySelector('.work-track-type');
    const descEl = track.querySelector('.work-track-desc');

    if (typeEl) typeEl.textContent = itemType;
    if (descEl) descEl.textContent = itemDesc;
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
  // Check URL for language param first
  const initialLang = getInitialLanguage();

  initServiceCards();
  initWorkList();
  initSpecialAnimations();
  initLanguageToggle();
  initHamburgerMenu();

  // Apply initial language (after DOM elements exist)
  if (initialLang !== 'en') {
    setLanguage(initialLang);
  }

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

// ====== WIP MODAL ======
const wipModal = {
  el: null,
  ascii: null,
  message: null,
  animationId: null,
  chars: ' .·:░▒▓█▓▒░:·. ',

  init() {
    this.el = document.getElementById('wip-modal');
    this.ascii = document.getElementById('wip-modal-ascii');
    this.message = document.getElementById('wip-modal-message');
    const closeBtn = document.getElementById('wip-modal-close');
    const backdrop = this.el?.querySelector('.wip-modal-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', () => this.hide());
    if (backdrop) backdrop.addEventListener('click', () => this.hide());

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.el?.classList.contains('active')) {
        this.hide();
      }
    });
  },

  show() {
    if (!this.el) return;

    // Update message based on language
    if (this.message) {
      this.message.textContent = currentLang === 'es' ? 'disponible pronto' : 'check back soon';
    }

    this.el.classList.add('active');
    this.startAnimation();
  },

  hide() {
    if (!this.el) return;
    this.el.classList.remove('active');
    this.stopAnimation();
  },

  startAnimation() {
    if (!this.ascii) return;

    const cols = Math.ceil(500 / 6);
    const rows = Math.ceil(300 / 10);

    const animate = (time) => {
      let out = '';
      const t = time * 0.002;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const wave1 = Math.sin(x * 0.15 + t);
          const wave2 = Math.sin(y * 0.2 + t * 1.5);
          const wave3 = Math.sin((x + y) * 0.1 + t * 0.8);
          const v = (wave1 + wave2 + wave3) / 3;
          const idx = Math.floor((v + 1) * (this.chars.length - 1) / 2);
          out += this.chars[Math.max(0, Math.min(this.chars.length - 1, idx))];
        }
        out += '\n';
      }

      this.ascii.textContent = out;
      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  },

  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
};

// Initialize modal after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  wipModal.init();
});

// Export for use in work track clicks
window.showWipModal = () => wipModal.show();
