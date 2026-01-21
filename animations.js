// ASCII Animation Library - 30+ unique animations with color themes

const ASCII = {
  cols: 45,
  rows: 14,
  miniCols: 30,
  miniRows: 8,

  chars: {
    blocks: '░▒▓█▓▒░',
    blocksHeavy: '▁▂▃▄▅▆▇█',
    dots: ' .·:+*#@',
    lines: '─│┌┐└┘├┤┬┴┼',
    arrows: '→←↑↓↗↘↙↖►◄▲▼',
    symbols: '◇◆○●□■△▲▽▼',
    glitch: '!@#$%^&*<>{}[]|\\/',
    matrix: 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789',
    code: '01{}[]()<>=/+-*&|;:',
    minimal: '.·:;',
    dense: ' .:;+=xX$#',
    braille: '⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿',
    box: '╔╗╚╝║═╠╣╦╩╬',
    shade: ' ░▒▓█',
    dots2: '⣀⣤⣶⣿',
    sparks: '✦✧★☆✴✵✶✷✸✹',
    moon: '◐◑◒◓●○',
    geometric: '◢◣◤◥',
    waves: '∿≋≈~',
  },

  // Color themes
  colors: {
    cyber: { primary: '#00ff88', secondary: '#00cc6a', bg: '#0a1a0f' },
    neon: { primary: '#ff00ff', secondary: '#ff66ff', bg: '#1a0a1a' },
    fire: { primary: '#ff4400', secondary: '#ff8800', bg: '#1a0a00' },
    ice: { primary: '#00ddff', secondary: '#88eeff', bg: '#001a1f' },
    gold: { primary: '#ffcc00', secondary: '#ffdd44', bg: '#1a1500' },
    vapor: { primary: '#ff71ce', secondary: '#01cdfe', bg: '#0d0221' },
    matrix: { primary: '#00ff00', secondary: '#008800', bg: '#000800' },
    sunset: { primary: '#ff6b6b', secondary: '#feca57', bg: '#1a0f0f' },
    ocean: { primary: '#0077be', secondary: '#00a8e8', bg: '#001020' },
    toxic: { primary: '#39ff14', secondary: '#ccff00', bg: '#0a0f00' },
    blood: { primary: '#8b0000', secondary: '#dc143c', bg: '#0f0505' },
    royal: { primary: '#9d4edd', secondary: '#c77dff', bg: '#10051a' },
    mint: { primary: '#98fb98', secondary: '#00fa9a', bg: '#051a10' },
    coral: { primary: '#ff7f50', secondary: '#ff6347', bg: '#1a0f0a' },
    arctic: { primary: '#e0ffff', secondary: '#afeeee', bg: '#0a1515' },
    lava: { primary: '#ff4500', secondary: '#ff6347', bg: '#150500' },
  },

  // 1. Wave Pattern
  wave: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const wave1 = Math.sin((x * 0.12) + (time * 0.003));
        const wave2 = Math.sin((x * 0.08) + (y * 0.15) + (time * 0.002));
        const combined = (wave1 + wave2) / 2;
        const idx = Math.floor((combined + 1) * 3.5);
        output += this.chars.blocks[Math.max(0, Math.min(6, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 2. Matrix Rain
  matrixState: new Map(),
  matrix: function(canvas, time, cols = this.cols, rows = this.rows) {
    const id = canvas.id || 'default';
    if (!this.matrixState.has(id)) {
      this.matrixState.set(id, Array(cols).fill(0).map(() => ({
        y: Math.random() * rows,
        speed: 0.08 + Math.random() * 0.15,
        chars: Array(rows).fill('').map(() => this.chars.matrix[Math.floor(Math.random() * this.chars.matrix.length)])
      })));
    }
    const drops = this.matrixState.get(id);
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));

    drops.forEach((drop, x) => {
      drop.y += drop.speed;
      if (drop.y > rows + 6) {
        drop.y = -6;
        drop.speed = 0.08 + Math.random() * 0.15;
      }
      for (let i = 0; i < 6; i++) {
        const y = Math.floor(drop.y) - i;
        if (y >= 0 && y < rows) {
          if (Math.random() < 0.05) drop.chars[y] = this.chars.matrix[Math.floor(Math.random() * this.chars.matrix.length)];
          grid[y][x] = drop.chars[y];
        }
      }
    });
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 3. Spiral
  spiral: function(canvas, time, cols = this.cols, rows = this.rows) {
    const centerX = cols / 2;
    const centerY = rows / 2;
    let output = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = (x - centerX) / 2;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const spiral = Math.sin(dist * 0.5 - angle * 2 + time * 0.003);
        const idx = Math.floor((spiral + 1) * 3.5);
        output += this.chars.dots[Math.max(0, Math.min(7, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 4. Pulse Rings
  pulse: function(canvas, time, cols = this.cols, rows = this.rows) {
    const centerX = cols / 2;
    const centerY = rows / 2;
    let output = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = (x - centerX) / 2.5;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pulse = Math.sin(dist * 0.8 - time * 0.005);
        const idx = Math.floor((pulse + 1) * 3.5);
        output += this.chars.dots[Math.max(0, Math.min(7, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 5. Particles Rising
  particlesState: new Map(),
  particles: function(canvas, time, cols = this.cols, rows = this.rows) {
    const id = canvas.id || 'default';
    if (!this.particlesState.has(id)) {
      this.particlesState.set(id, Array(25).fill(null).map(() => ({
        x: Math.random() * cols,
        y: Math.random() * rows,
        speed: 0.02 + Math.random() * 0.06,
        char: this.chars.symbols[Math.floor(Math.random() * this.chars.symbols.length)],
        drift: (Math.random() - 0.5) * 0.03
      })));
    }
    const parts = this.particlesState.get(id);
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));

    parts.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < 0) {
        p.y = rows;
        p.x = Math.random() * cols;
        p.char = this.chars.symbols[Math.floor(Math.random() * this.chars.symbols.length)];
      }
      const px = Math.floor(p.x + cols) % cols;
      const py = Math.floor(p.y);
      if (py >= 0 && py < rows) grid[py][px] = p.char;
    });
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 6. Noise Field
  noise: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    const t = time * 0.001;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const n = Math.sin(x * 0.1 + t) * Math.cos(y * 0.15 + t * 0.7) * Math.sin((x + y) * 0.05 + t * 0.5);
        const idx = Math.floor((n + 1) * 4);
        output += this.chars.dense[Math.max(0, Math.min(9, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 7. Binary Stream
  binary: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    const seed = Math.floor(time * 0.01);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const val = Math.sin(x * 0.3 + y * 0.2 + seed * 0.1) > 0;
        output += val ? '1' : '0';
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 8. Glitch Effect
  glitch: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    const glitchIntensity = Math.sin(time * 0.01) * 0.5 + 0.5;
    for (let y = 0; y < rows; y++) {
      const rowGlitch = Math.random() < glitchIntensity * 0.3;
      for (let x = 0; x < cols; x++) {
        if (rowGlitch && Math.random() < 0.7) {
          output += this.chars.glitch[Math.floor(Math.random() * this.chars.glitch.length)];
        } else {
          output += Math.random() < 0.1 ? '█' : ' ';
        }
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 9. Flowing Arrows
  flow: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    for (let y = 0; y < rows; y++) {
      const offset = Math.floor(time * 0.02 + y * 0.5) % 8;
      for (let x = 0; x < cols; x++) {
        const pos = (x + offset) % 8;
        output += pos < 3 ? '→' : pos < 4 ? '─' : ' ';
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 10. Checkerboard Morph
  checker: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    const phase = Math.sin(time * 0.002) * 2;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const check = Math.sin(x * 0.3 + phase) * Math.sin(y * 0.5 + phase);
        output += check > 0 ? '█' : '░';
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 11. DNA Helix
  dna: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const centerY = rows / 2;

    for (let x = 0; x < cols; x++) {
      const phase = x * 0.2 + time * 0.003;
      const y1 = Math.floor(centerY + Math.sin(phase) * (rows / 3));
      const y2 = Math.floor(centerY - Math.sin(phase) * (rows / 3));

      if (y1 >= 0 && y1 < rows) grid[y1][x] = '●';
      if (y2 >= 0 && y2 < rows) grid[y2][x] = '○';

      if (Math.abs(Math.sin(phase)) < 0.3) {
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        for (let y = minY + 1; y < maxY; y++) {
          if (y >= 0 && y < rows) grid[y][x] = '│';
        }
      }
    }
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 12. Terrain/Landscape
  terrain: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const height = Math.sin(x * 0.1 + time * 0.001) * Math.cos(x * 0.05) * 4 + rows / 2;
        const relY = rows - y;
        if (relY < height - 2) output += '█';
        else if (relY < height - 1) output += '▓';
        else if (relY < height) output += '▒';
        else if (relY < height + 1) output += '░';
        else output += ' ';
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 13. Radar Sweep
  radar: function(canvas, time, cols = this.cols, rows = this.rows) {
    const centerX = cols / 2;
    const centerY = rows / 2;
    const sweepAngle = (time * 0.003) % (Math.PI * 2);
    let output = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = (x - centerX) / 2;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        let angleDiff = angle - sweepAngle;
        while (angleDiff < 0) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI * 2) angleDiff -= Math.PI * 2;

        if (dist < rows / 2 - 1) {
          if (angleDiff < 0.3) output += '█';
          else if (angleDiff < 0.6) output += '▓';
          else if (angleDiff < 1.0) output += '▒';
          else if (angleDiff < 1.5) output += '░';
          else output += '·';
        } else {
          output += ' ';
        }
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 14. Waveform/Audio
  waveform: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const centerY = rows / 2;

    for (let x = 0; x < cols; x++) {
      const amp = Math.sin(x * 0.15 + time * 0.004) *
                  Math.sin(x * 0.07 + time * 0.002) *
                  (rows / 2 - 1);
      const y = Math.floor(centerY + amp);
      if (y >= 0 && y < rows) {
        grid[y][x] = '█';
        for (let fy = y + 1; fy < rows; fy++) {
          grid[fy][x] = '░';
        }
      }
    }
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 15. Circuit Board
  circuit: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    const seed = Math.floor(time * 0.005);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const hash = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
        const val = hash - Math.floor(hash);

        if (y % 3 === 0 && val > 0.6) output += '─';
        else if (x % 5 === 0 && val > 0.5) output += '│';
        else if (val > 0.95) output += '●';
        else if (val > 0.9) output += '○';
        else if (val > 0.85) output += '+';
        else output += ' ';
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 16. Starfield
  starsState: new Map(),
  starfield: function(canvas, time, cols = this.cols, rows = this.rows) {
    const id = canvas.id || 'default';
    if (!this.starsState.has(id)) {
      this.starsState.set(id, Array(40).fill(null).map(() => ({
        x: Math.random() * cols,
        y: Math.random() * rows,
        z: Math.random(),
        char: '.·*'[Math.floor(Math.random() * 3)]
      })));
    }
    const stars = this.starsState.get(id);
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));

    stars.forEach(star => {
      star.x -= (1 - star.z) * 0.3;
      if (star.x < 0) {
        star.x = cols;
        star.y = Math.random() * rows;
        star.z = Math.random();
      }
      const px = Math.floor(star.x);
      const py = Math.floor(star.y);
      if (px >= 0 && px < cols && py >= 0 && py < rows) {
        grid[py][px] = star.z > 0.7 ? '*' : star.z > 0.4 ? '·' : '.';
      }
    });
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 17. Hexagon Grid
  hexgrid: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    const phase = time * 0.002;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const offsetX = (y % 2) * 2;
        const hx = (x + offsetX) % 6;
        const hy = y % 4;
        const brightness = Math.sin(x * 0.2 + y * 0.3 + phase);

        if ((hy === 0 || hy === 3) && (hx >= 1 && hx <= 4)) {
          output += brightness > 0 ? '─' : '━';
        } else if ((hy === 1 || hy === 2) && (hx === 0 || hx === 5)) {
          output += brightness > 0 ? '/' : '\\';
        } else {
          output += ' ';
        }
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 18. Loading Spinner
  spinner: function(canvas, time, cols = this.cols, rows = this.rows) {
    const centerX = cols / 2;
    const centerY = rows / 2;
    const spinChars = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
    const spinIdx = Math.floor(time * 0.01) % spinChars.length;
    let output = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = Math.abs(x - centerX);
        const dy = Math.abs(y - centerY);
        if (dx < 2 && dy < 1) {
          output += spinChars[spinIdx];
        } else {
          const dist = Math.sqrt((dx/2) ** 2 + dy ** 2);
          if (dist < 4) output += '·';
          else output += ' ';
        }
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 19. Plasma Effect
  plasma: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    const t = time * 0.001;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v1 = Math.sin(x * 0.1 + t);
        const v2 = Math.sin((y * 0.1 + t) * 0.5);
        const v3 = Math.sin((x * 0.1 + y * 0.1 + t) * 0.5);
        const v4 = Math.sin(Math.sqrt(x * x + y * y) * 0.1 + t);
        const v = (v1 + v2 + v3 + v4) / 4;
        const idx = Math.floor((v + 1) * 4);
        output += this.chars.blocksHeavy[Math.max(0, Math.min(7, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 20. Fire Effect
  fireState: new Map(),
  fire: function(canvas, time, cols = this.cols, rows = this.rows) {
    const id = canvas.id || 'default';
    if (!this.fireState.has(id)) {
      this.fireState.set(id, Array(rows).fill(null).map(() => Array(cols).fill(0)));
    }
    const buffer = this.fireState.get(id);
    const fireChars = ' .:-=+*#%@';

    // Set bottom row to random values
    for (let x = 0; x < cols; x++) {
      buffer[rows - 1][x] = Math.random() > 0.4 ? 9 : Math.floor(Math.random() * 4);
    }

    // Propagate fire upward
    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols; x++) {
        const decay = Math.random() * 2;
        const spread = Math.floor(Math.random() * 3) - 1;
        const srcX = Math.max(0, Math.min(cols - 1, x + spread));
        buffer[y][x] = Math.max(0, buffer[y + 1][srcX] - decay);
      }
    }

    let output = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = Math.floor(buffer[y][x]);
        output += fireChars[Math.max(0, Math.min(9, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 21. Ripple Effect
  ripple: function(canvas, time, cols = this.cols, rows = this.rows) {
    const centerX = cols / 2;
    const centerY = rows / 2;
    let output = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = (x - centerX) / 2;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ripple = Math.sin(dist * 1.5 - time * 0.008) * Math.exp(-dist * 0.1);
        const idx = Math.floor((ripple + 1) * 4);
        output += this.chars.blocksHeavy[Math.max(0, Math.min(7, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 22. Constellation
  constellationState: new Map(),
  constellation: function(canvas, time, cols = this.cols, rows = this.rows) {
    const id = canvas.id || 'default';
    if (!this.constellationState.has(id)) {
      const stars = Array(15).fill(null).map(() => ({
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        twinkle: Math.random() * Math.PI * 2
      }));
      this.constellationState.set(id, stars);
    }
    const stars = this.constellationState.get(id);
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));

    // Draw connections
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dist = Math.sqrt((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2);
        if (dist < 15) {
          // Draw line between stars
          const steps = Math.floor(dist);
          for (let s = 0; s < steps; s++) {
            const t = s / steps;
            const lx = Math.floor(stars[i].x + (stars[j].x - stars[i].x) * t);
            const ly = Math.floor(stars[i].y + (stars[j].y - stars[i].y) * t);
            if (lx >= 0 && lx < cols && ly >= 0 && ly < rows) {
              grid[ly][lx] = '·';
            }
          }
        }
      }
    }

    // Draw stars with twinkle
    stars.forEach(star => {
      const brightness = Math.sin(time * 0.005 + star.twinkle);
      if (star.x >= 0 && star.x < cols && star.y >= 0 && star.y < rows) {
        grid[star.y][star.x] = brightness > 0.3 ? '★' : brightness > -0.3 ? '☆' : '·';
      }
    });

    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 23. Braille Waves
  brailleWave: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const wave = Math.sin(x * 0.15 + time * 0.003) * Math.cos(y * 0.2 + time * 0.002);
        const idx = Math.floor((wave + 1) * 31);
        output += this.chars.braille[Math.max(0, Math.min(63, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 24. Vortex
  vortex: function(canvas, time, cols = this.cols, rows = this.rows) {
    const centerX = cols / 2;
    const centerY = rows / 2;
    let output = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = (x - centerX) / 2;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const twist = angle + dist * 0.3 - time * 0.004;
        const v = Math.sin(twist * 4);
        const idx = Math.floor((v + 1) * 3.5);
        output += this.chars.blocks[Math.max(0, Math.min(6, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 25. Bokeh
  bokehState: new Map(),
  bokeh: function(canvas, time, cols = this.cols, rows = this.rows) {
    const id = canvas.id || 'default';
    if (!this.bokehState.has(id)) {
      this.bokehState.set(id, Array(12).fill(null).map(() => ({
        x: Math.random() * cols,
        y: Math.random() * rows,
        size: 1 + Math.random() * 2,
        speed: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2
      })));
    }
    const orbs = this.bokehState.get(id);
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));

    orbs.forEach(orb => {
      orb.y -= orb.speed;
      if (orb.y < -orb.size) {
        orb.y = rows + orb.size;
        orb.x = Math.random() * cols;
      }

      const pulse = Math.sin(time * 0.003 + orb.phase) * 0.5 + 1;
      const r = orb.size * pulse;

      for (let dy = -Math.ceil(r); dy <= Math.ceil(r); dy++) {
        for (let dx = -Math.ceil(r * 2); dx <= Math.ceil(r * 2); dx++) {
          const px = Math.floor(orb.x + dx);
          const py = Math.floor(orb.y + dy);
          if (px >= 0 && px < cols && py >= 0 && py < rows) {
            const dist = Math.sqrt((dx / 2) ** 2 + dy ** 2);
            if (dist < r) {
              grid[py][px] = dist < r * 0.3 ? '●' : dist < r * 0.6 ? '○' : '·';
            }
          }
        }
      }
    });
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 26. Electric
  electric: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const numBolts = 3;

    for (let b = 0; b < numBolts; b++) {
      let x = Math.floor(cols * (b + 0.5) / numBolts);
      const seed = Math.floor(time * 0.02) + b * 1000;

      for (let y = 0; y < rows; y++) {
        const hash = Math.sin(seed + y * 12.9898) * 43758.5453;
        const jitter = Math.floor((hash - Math.floor(hash) - 0.5) * 6);
        x = Math.max(0, Math.min(cols - 1, x + jitter));

        if (y >= 0 && y < rows && x >= 0 && x < cols) {
          grid[y][x] = '█';
          if (x > 0) grid[y][x - 1] = '▓';
          if (x < cols - 1) grid[y][x + 1] = '▓';
        }
      }
    }
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 27. Rain
  rainState: new Map(),
  rain: function(canvas, time, cols = this.cols, rows = this.rows) {
    const id = canvas.id || 'default';
    if (!this.rainState.has(id)) {
      this.rainState.set(id, Array(30).fill(null).map(() => ({
        x: Math.floor(Math.random() * cols),
        y: Math.random() * rows,
        speed: 0.2 + Math.random() * 0.3,
        length: 2 + Math.floor(Math.random() * 3)
      })));
    }
    const drops = this.rainState.get(id);
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));

    drops.forEach(drop => {
      drop.y += drop.speed;
      if (drop.y > rows + drop.length) {
        drop.y = -drop.length;
        drop.x = Math.floor(Math.random() * cols);
      }

      for (let i = 0; i < drop.length; i++) {
        const py = Math.floor(drop.y - i);
        if (py >= 0 && py < rows) {
          grid[py][drop.x] = i === 0 ? '|' : '│';
        }
      }
    });
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 28. Heartbeat
  heartbeat: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const centerY = rows / 2;

    for (let x = 0; x < cols; x++) {
      const phase = (x / cols) * Math.PI * 4 + time * 0.01;
      let y;

      const beat = phase % (Math.PI * 2);
      if (beat < 0.5) {
        y = centerY - Math.sin(beat * Math.PI * 4) * 3;
      } else if (beat < 1) {
        y = centerY + Math.sin((beat - 0.5) * Math.PI * 4) * 5;
      } else if (beat < 1.5) {
        y = centerY - Math.sin((beat - 1) * Math.PI * 4) * 2;
      } else {
        y = centerY;
      }

      const py = Math.floor(y);
      if (py >= 0 && py < rows) {
        grid[py][x] = '█';
      }
    }
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 29. Tunnel
  tunnel: function(canvas, time, cols = this.cols, rows = this.rows) {
    const centerX = cols / 2;
    const centerY = rows / 2;
    let output = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = (x - centerX) / 2;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const depth = 1 / (dist + 0.1) * 10 - time * 0.01;
        const v = Math.sin(depth * 5);
        const idx = Math.floor((v + 1) * 2);
        output += this.chars.shade[Math.max(0, Math.min(4, idx))];
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 30. Bubbles
  bubblesState: new Map(),
  bubbles: function(canvas, time, cols = this.cols, rows = this.rows) {
    const id = canvas.id || 'default';
    if (!this.bubblesState.has(id)) {
      this.bubblesState.set(id, Array(15).fill(null).map(() => ({
        x: Math.random() * cols,
        y: rows + Math.random() * rows,
        size: 0.5 + Math.random() * 1.5,
        speed: 0.03 + Math.random() * 0.05,
        wobble: Math.random() * Math.PI * 2
      })));
    }
    const bubbles = this.bubblesState.get(id);
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));

    bubbles.forEach(b => {
      b.y -= b.speed;
      b.x += Math.sin(time * 0.002 + b.wobble) * 0.05;

      if (b.y < -b.size * 2) {
        b.y = rows + b.size * 2;
        b.x = Math.random() * cols;
      }

      const px = Math.floor(b.x);
      const py = Math.floor(b.y);

      if (py >= 0 && py < rows && px >= 0 && px < cols) {
        if (b.size > 1) {
          grid[py][px] = '◯';
          if (py > 0 && px > 0) grid[py-1][px-1] = '·';
        } else {
          grid[py][px] = '○';
        }
      }
    });
    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 31. Scanlines
  scanlines: function(canvas, time, cols = this.cols, rows = this.rows) {
    let output = '';
    const scanPos = (time * 0.01) % rows;

    for (let y = 0; y < rows; y++) {
      const distFromScan = Math.abs(y - scanPos);
      for (let x = 0; x < cols; x++) {
        if (distFromScan < 1) {
          output += '█';
        } else if (distFromScan < 2) {
          output += '▓';
        } else if (distFromScan < 3) {
          output += '░';
        } else if (y % 2 === 0) {
          output += '─';
        } else {
          output += ' ';
        }
      }
      output += '\n';
    }
    canvas.textContent = output;
  },

  // 32. Cube Rotate (simplified)
  cube: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const centerX = cols / 2;
    const centerY = rows / 2;
    const size = Math.min(cols / 4, rows / 2) - 1;
    const angle = time * 0.002;

    // Simple rotating square
    const corners = [
      [-1, -1], [1, -1], [1, 1], [-1, 1]
    ].map(([x, y]) => {
      const rx = x * Math.cos(angle) - y * Math.sin(angle);
      const ry = x * Math.sin(angle) + y * Math.cos(angle);
      return [
        Math.floor(centerX + rx * size * 2),
        Math.floor(centerY + ry * size)
      ];
    });

    // Draw edges
    for (let i = 0; i < 4; i++) {
      const [x1, y1] = corners[i];
      const [x2, y2] = corners[(i + 1) % 4];
      const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
      for (let s = 0; s <= steps; s++) {
        const t = steps === 0 ? 0 : s / steps;
        const px = Math.floor(x1 + (x2 - x1) * t);
        const py = Math.floor(y1 + (y2 - y1) * t);
        if (px >= 0 && px < cols && py >= 0 && py < rows) {
          grid[py][px] = '█';
        }
      }
    }

    // Draw corners
    corners.forEach(([x, y]) => {
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        grid[y][x] = '●';
      }
    });

    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 33. Landing Page - Floating page with plane landing
  landingPage: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);

    function draw(x, y, char) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      if (px >= 0 && px < cols && py >= 0 && py < rows) {
        grid[py][px] = char;
      }
    }

    // Animation cycle (5 seconds)
    const cycle = (time * 0.001) % 5;

    // Floating page position
    const pageX = centerX - 5;
    const pageY = centerY + Math.sin(time * 0.002) * 1.5;

    // Stars background
    for (let i = 0; i < 12; i++) {
      const sx = (i * 7 + Math.sin(time * 0.001 + i) * 2) % cols;
      const sy = (i * 5 + Math.cos(time * 0.0015 + i * 0.7) * 1.5) % rows;
      const twinkle = Math.sin(time * 0.005 + i * 1.3);
      draw(sx, sy, twinkle > 0.3 ? '✦' : twinkle > -0.3 ? '·' : '.');
    }

    // Draw page/document
    function drawPage() {
      // Frame
      draw(pageX - 4, pageY - 3, '╭');
      draw(pageX + 4, pageY - 3, '╮');
      draw(pageX - 4, pageY + 3, '╰');
      draw(pageX + 4, pageY + 3, '╯');

      for (let i = -3; i <= 3; i++) {
        draw(pageX + i, pageY - 3, '─');
        draw(pageX + i, pageY + 3, '─');
      }
      for (let i = -2; i <= 2; i++) {
        draw(pageX - 4, pageY + i, '│');
        draw(pageX + 4, pageY + i, '│');
      }

      // Content lines
      for (let y = -2; y <= 2; y++) {
        for (let x = -3; x <= 3; x++) {
          const char = (y === 0) ? '▒' : '░';
          draw(pageX + x, pageY + y, char);
        }
      }

      // Header bar
      for (let x = -3; x <= 3; x++) {
        draw(pageX + x, pageY - 2, '▓');
      }
    }

    // Draw simple plane
    function drawPlane(px, py, trail) {
      // Body
      draw(px, py, '▶');
      draw(px - 1, py, '═');
      draw(px - 2, py, '═');

      // Wings
      draw(px - 1, py - 1, '╱');
      draw(px - 1, py + 1, '╲');

      // Trail
      if (trail) {
        const chars = ['·', '∘', '°'];
        for (let i = 0; i < 3; i++) {
          draw(px - 3 - i, py + Math.sin(time * 0.01 + i) * 0.5, chars[i]);
        }
      }
    }

    // Draw landing sparkles
    function drawSparkles() {
      const chars = ['✦', '✧', '★', '·'];
      for (let i = 0; i < 6; i++) {
        const angle = (time * 0.005 + i * 1.05) % (Math.PI * 2);
        const r = 5 + Math.sin(time * 0.004 + i) * 2;
        draw(pageX + Math.cos(angle) * r, pageY + Math.sin(angle) * r * 0.5, chars[i % 4]);
      }
    }

    // Render
    drawPage();

    if (cycle < 3) {
      // Plane approaching
      const progress = cycle / 3;
      const startX = cols - 5;
      const startY = 2;
      const endX = pageX + 6;
      const endY = pageY - 4;

      const px = startX + (endX - startX) * progress;
      const py = startY + (endY - startY) * Math.pow(progress, 0.6);

      drawPlane(px, py, progress < 0.8);
    } else if (cycle < 4) {
      // Plane landed
      drawPlane(pageX + 6, pageY - 4, false);
      drawSparkles();
    } else {
      // Celebration
      drawSparkles();
    }

    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 34. Idea to Product - Minimal person silhouette, idea flows to screen
  ideaToProduct: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);

    function draw(x, y, char) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      if (px >= 0 && px < cols && py >= 0 && py < rows) {
        grid[py][px] = char;
      }
    }

    // Animation cycle (6 seconds)
    const cycle = (time * 0.001) % 6;
    const personX = centerX - 10;
    const personY = centerY;
    const screenX = centerX + 8;
    const screenY = centerY - 1;

    // Draw minimal person silhouette
    function drawPerson() {
      // Head
      draw(personX, personY - 4, '█');
      draw(personX - 1, personY - 4, '▓');
      draw(personX + 1, personY - 4, '▓');
      draw(personX, personY - 5, '▓');

      // Neck + shoulders
      draw(personX, personY - 3, '█');
      draw(personX - 2, personY - 2, '▓');
      draw(personX - 1, personY - 2, '█');
      draw(personX, personY - 2, '█');
      draw(personX + 1, personY - 2, '█');
      draw(personX + 2, personY - 2, '▓');

      // Body
      for (let i = -1; i <= 1; i++) {
        draw(personX + i, personY - 1, '░');
        draw(personX + i, personY, '░');
        draw(personX + i, personY + 1, '░');
      }
    }

    // Draw phone/tablet screen
    function drawScreen(fill) {
      // Frame
      draw(screenX - 3, screenY - 3, '╭');
      draw(screenX + 3, screenY - 3, '╮');
      draw(screenX - 3, screenY + 3, '╰');
      draw(screenX + 3, screenY + 3, '╯');
      for (let i = -2; i <= 2; i++) {
        draw(screenX + i, screenY - 3, '─');
        draw(screenX + i, screenY + 3, '─');
      }
      for (let i = -2; i <= 2; i++) {
        draw(screenX - 3, screenY + i, '│');
        draw(screenX + 3, screenY + i, '│');
      }

      // Screen content
      const chars = fill ? ['▓', '▒', '░'] : ['░', '░', '░'];
      for (let y = -2; y <= 2; y++) {
        for (let x = -2; x <= 2; x++) {
          const charIdx = Math.abs(y) < 2 && fill ? (y + 2) % 3 : 2;
          draw(screenX + x, screenY + y, chars[charIdx]);
        }
      }
    }

    // Floating thought particles
    function drawThoughts(intensity) {
      const numParticles = Math.floor(intensity * 6);
      const chars = ['·', '°', '∘', '○', '◯', '●'];

      for (let i = 0; i < numParticles; i++) {
        const angle = (time * 0.002 + i * 1.1) % (Math.PI * 2);
        const radius = 3 + i * 0.8;
        const wobble = Math.sin(time * 0.004 + i * 0.7) * 0.5;
        const px = personX + 3 + Math.cos(angle) * radius + wobble;
        const py = personY - 4 + Math.sin(angle) * radius * 0.4;
        draw(px, py, chars[i % chars.length]);
      }
    }

    // Lightbulb burst
    function drawBulb(intensity) {
      const bx = personX + 5;
      const by = personY - 5;

      // Bulb
      draw(bx, by, intensity > 0.5 ? '★' : '☆');

      // Rays
      if (intensity > 0.3) {
        const rays = ['·', '∗', '✦', '✧'];
        const ri = Math.floor(time * 0.01) % rays.length;
        draw(bx - 1, by - 1, rays[ri]);
        draw(bx + 1, by - 1, rays[(ri + 1) % 4]);
        draw(bx - 1, by + 1, rays[(ri + 2) % 4]);
        draw(bx + 1, by + 1, rays[(ri + 3) % 4]);
      }
      if (intensity > 0.7) {
        draw(bx, by - 2, '✦');
        draw(bx - 2, by, '✧');
        draw(bx + 2, by, '✧');
      }
    }

    // Idea traveling to screen
    function drawFlow(progress) {
      const startX = personX + 5;
      const startY = personY - 5;
      const endX = screenX;
      const endY = screenY;

      const sparkles = ['★', '✦', '✧', '∗', '·'];
      for (let i = 0; i < 5; i++) {
        const t = Math.max(0, progress - i * 0.1);
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t + Math.sin(t * Math.PI * 2) * 2;
        draw(x, y, sparkles[i]);
      }
    }

    // Celebration
    function drawCelebration() {
      const chars = ['✦', '✧', '★', '·'];
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.004 + i * 0.8) % (Math.PI * 2);
        const r = 5 + Math.sin(time * 0.005 + i) * 2;
        draw(screenX + Math.cos(angle) * r, screenY + Math.sin(angle) * r * 0.5, chars[i % 4]);
      }
    }

    // Render phases
    drawPerson();

    if (cycle < 2) {
      drawThoughts(cycle / 2);
      drawScreen(false);
    } else if (cycle < 3.5) {
      const bulbPhase = (cycle - 2) / 1.5;
      drawBulb(bulbPhase);
      drawScreen(false);
    } else if (cycle < 5) {
      const flowPhase = (cycle - 3.5) / 1.5;
      drawFlow(flowPhase);
      drawScreen(flowPhase > 0.6);
    } else {
      drawScreen(true);
      drawCelebration();
    }

    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 35. Code Matrix - Floating code symbols with depth layers
  codeMatrix: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const t = time * 0.001;

    // Code symbol layers at different depths
    const symbols = ['{ }', '[ ]', '< >', '( )', '/ /', '=> ', '...', ' ; ', '0x', '##'];
    const depths = [0.3, 0.5, 0.7, 1.0];

    function draw(x, y, char) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      if (px >= 0 && px < cols && py >= 0 && py < rows && char !== ' ') {
        grid[py][px] = char;
      }
    }

    // Layer 1: Deep background - slow drifting dots
    for (let i = 0; i < 12; i++) {
      const baseX = (i * 7.3 + t * 2) % (cols + 10) - 5;
      const baseY = (i * 5.1 + t * 1.5) % (rows + 4) - 2;
      const char = '·';
      draw(baseX, baseY, char);
    }

    // Layer 2: Mid - floating brackets
    for (let i = 0; i < 8; i++) {
      const phase = t * 0.8 + i * 2.1;
      const x = (i * 9 + Math.sin(phase) * 3 + t * 5) % (cols + 6) - 3;
      const y = (i * 4.7 + Math.cos(phase * 0.7) * 2) % rows;
      const sym = symbols[i % symbols.length];
      for (let c = 0; c < sym.length; c++) {
        draw(x + c, y, sym[c]);
      }
    }

    // Layer 3: Foreground - bright symbols
    for (let i = 0; i < 5; i++) {
      const phase = t * 1.2 + i * 1.8;
      const x = (i * 11 + Math.sin(phase * 0.9) * 4 + t * 8) % (cols + 8) - 4;
      const y = (i * 3.3 + Math.cos(phase * 0.6) * 1.5) % rows;

      // Draw a small code block
      const block = i % 2 === 0 ? '{ }' : '< >';
      for (let c = 0; c < block.length; c++) {
        draw(x + c, y, block[c]);
      }
    }

    // Vertical scan pulse
    const scanX = Math.floor((t * 15) % (cols + 20)) - 10;
    for (let y = 0; y < rows; y++) {
      const dist = Math.abs(scanX - cols / 2);
      if (scanX >= 0 && scanX < cols) {
        const intensity = Math.sin(y * 0.5 + t * 3) * 0.5 + 0.5;
        if (intensity > 0.6 && grid[y][scanX] === ' ') {
          draw(scanX, y, '│');
        }
      }
    }

    // Central focus element - pulsing
    const cx = Math.floor(cols / 2);
    const cy = Math.floor(rows / 2);
    const pulse = Math.sin(t * 2) * 0.5 + 0.5;

    if (pulse > 0.3) {
      const focusChars = ['◇', '◆', '○', '●'];
      const fi = Math.floor(t * 2) % focusChars.length;
      draw(cx, cy, focusChars[fi]);

      if (pulse > 0.6) {
        draw(cx - 2, cy, '─');
        draw(cx + 2, cy, '─');
        draw(cx, cy - 1, '│');
        draw(cx, cy + 1, '│');
      }
    }

    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 36. Helicopter - Rotating blades hovering over city
  helicopter: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const t = time * 0.001;
    const cx = Math.floor(cols / 2);
    const cy = Math.floor(rows / 3);

    function draw(x, y, char) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      if (px >= 0 && px < cols && py >= 0 && py < rows) {
        grid[py][px] = char;
      }
    }

    // Hovering motion
    const hover = Math.sin(t * 2) * 1;
    const hx = cx;
    const hy = cy + hover;

    // Fast spinning rotor - just a line that rotates
    const rotorPhase = Math.floor(t * 15) % 4;
    const rotorChars = ['━━━━━━━━━━━━', '╲         ╱', '│         │', '╱         ╲'];
    const rotor = rotorChars[rotorPhase];
    for (let i = 0; i < rotor.length; i++) {
      draw(hx - 6 + i, hy - 2, rotor[i]);
    }

    // Rotor hub
    draw(hx, hy - 2, '◉');

    // Body
    draw(hx - 3, hy, '╭');
    draw(hx - 2, hy, '─');
    draw(hx - 1, hy, '─');
    draw(hx, hy, '●');
    draw(hx + 1, hy, '─');
    draw(hx + 2, hy, '─');
    draw(hx + 3, hy, '╮');
    draw(hx - 3, hy + 1, '╰');
    for (let i = -2; i <= 2; i++) draw(hx + i, hy + 1, '─');
    draw(hx + 3, hy + 1, '╯');

    // Mast
    draw(hx, hy - 1, '│');

    // Tail boom
    for (let i = 4; i <= 8; i++) draw(hx + i, hy, '─');
    draw(hx + 9, hy, '◁');

    // Tail rotor
    const tailPhase = Math.floor(t * 20) % 2;
    draw(hx + 9, hy - 1, tailPhase ? '│' : '─');
    draw(hx + 9, hy + 1, tailPhase ? '│' : '─');

    // Skids
    draw(hx - 2, hy + 2, '╷');
    draw(hx + 2, hy + 2, '╷');
    for (let i = -4; i <= 4; i++) draw(hx + i, hy + 3, '─');

    // City skyline - responsive to canvas width
    const numBuildings = Math.floor(cols / 5);
    const groundY = rows - 1;
    for (let i = 0; i < numBuildings; i++) {
      const bx = Math.floor(i * (cols / numBuildings)) + 1;
      const height = 2 + Math.floor(Math.sin(i * 1.3) * 2 + 2);
      for (let h = 0; h < height; h++) {
        draw(bx, groundY - h, '█');
        draw(bx + 1, groundY - h, '▓');
      }
      // Blinking window
      if (Math.sin(t * 2 + i * 1.5) > 0.3) {
        draw(bx, groundY - 1, '▪');
      }
    }

    // Location ping
    const pingPhase = (t * 1.5) % 3;
    const pingX = cx + Math.sin(t * 0.3) * (cols * 0.25);
    if (pingPhase < 2) {
      draw(pingX, groundY - 6, '▼');
      draw(pingX, groundY - 5, '│');
      if (pingPhase > 0.5) {
        draw(pingX - 1, groundY - 7, '(');
        draw(pingX + 1, groundY - 7, ')');
      }
      if (pingPhase > 1) {
        draw(pingX - 2, groundY - 8, '(');
        draw(pingX + 2, groundY - 8, ')');
      }
    }

    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // 37. Retro Player - Old school media player with VU meters
  retroPlayer: function(canvas, time, cols = this.cols, rows = this.rows) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
    const t = time * 0.001;
    const cx = Math.floor(cols / 2);
    const cy = Math.floor(rows / 2);

    function draw(x, y, char) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      if (px >= 0 && px < cols && py >= 0 && py < rows) {
        grid[py][px] = char;
      }
    }

    // Player frame
    const frameW = 20;
    const frameH = 10;
    const fx = cx - Math.floor(frameW / 2);
    const fy = cy - Math.floor(frameH / 2);

    // Top border
    draw(fx, fy, '╔');
    for (let i = 1; i < frameW - 1; i++) draw(fx + i, fy, '═');
    draw(fx + frameW - 1, fy, '╗');

    // Bottom border
    draw(fx, fy + frameH - 1, '╚');
    for (let i = 1; i < frameW - 1; i++) draw(fx + i, fy + frameH - 1, '═');
    draw(fx + frameW - 1, fy + frameH - 1, '╝');

    // Side borders
    for (let i = 1; i < frameH - 1; i++) {
      draw(fx, fy + i, '║');
      draw(fx + frameW - 1, fy + i, '║');
    }

    // Cassette reels
    const reelY = fy + 2;
    const reel1X = fx + 5;
    const reel2X = fx + 14;
    const reelPhase = (t * 3) % 4;
    const reelChars = ['◯', '◎', '●', '◎'];

    draw(reel1X, reelY, reelChars[Math.floor(reelPhase)]);
    draw(reel2X, reelY, reelChars[Math.floor((reelPhase + 2) % 4)]);

    // Tape between reels
    for (let i = reel1X + 1; i < reel2X; i++) {
      draw(i, reelY, '─');
    }
    draw(reel1X + 1, reelY + 1, '╲');
    draw(reel2X - 1, reelY + 1, '╱');
    for (let i = reel1X + 2; i < reel2X - 1; i++) {
      draw(i, reelY + 1, '▂');
    }

    // VU meters
    const vuY = fy + 5;
    const vu1X = fx + 3;
    const vu2X = fx + 12;

    // VU meter boxes
    for (let v = 0; v < 2; v++) {
      const vx = v === 0 ? vu1X : vu2X;
      draw(vx, vuY, '[');
      draw(vx + 6, vuY, ']');

      // Animated level
      const level = Math.floor((Math.sin(t * 4 + v * 2) * 0.5 + 0.5) * 5);
      for (let i = 0; i < 5; i++) {
        const char = i < level ? (i > 3 ? '█' : '▓') : '░';
        draw(vx + 1 + i, vuY, char);
      }
    }

    // Channel labels
    draw(vu1X + 2, vuY + 1, 'L');
    draw(vu2X + 2, vuY + 1, 'R');

    // Transport controls
    const ctrlY = fy + 7;
    const ctrlX = fx + 4;
    const playing = Math.floor(t) % 6 < 4;

    draw(ctrlX, ctrlY, '│◀◀│');
    draw(ctrlX + 5, ctrlY, playing ? '│ ▶│' : '│▐▐│');
    draw(ctrlX + 10, ctrlY, '│▶▶│');

    // Time counter
    const mins = Math.floor(t / 60) % 60;
    const secs = Math.floor(t) % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    for (let i = 0; i < timeStr.length; i++) {
      draw(cx - 2 + i, fy + 1, timeStr[i]);
    }

    // Decorative EQ visualization at bottom
    const eqY = fy + frameH;
    for (let i = 0; i < 16; i++) {
      const eqHeight = Math.floor((Math.sin(t * 5 + i * 0.8) * 0.5 + 0.5) * 3);
      const eqX = fx + 2 + i;
      for (let h = 0; h < eqHeight; h++) {
        draw(eqX, eqY + h, '▁');
      }
    }

    canvas.textContent = grid.map(row => row.join('')).join('\n');
  },

  // List of all animations
  list: [
    'wave', 'matrix', 'spiral', 'pulse', 'particles', 'noise', 'binary',
    'glitch', 'flow', 'checker', 'dna', 'terrain', 'radar', 'waveform',
    'circuit', 'starfield', 'hexgrid', 'spinner', 'plasma', 'fire',
    'ripple', 'constellation', 'brailleWave', 'vortex', 'bokeh', 'electric',
    'rain', 'heartbeat', 'tunnel', 'bubbles', 'scanlines', 'cube',
    'landingPage', 'ideaToProduct', 'codeMatrix', 'helicopter', 'retroPlayer'
  ],

  // Get random animation
  random: function() {
    return this.list[Math.floor(Math.random() * this.list.length)];
  },

  // Get random color theme
  randomColor: function() {
    const keys = Object.keys(this.colors);
    return keys[Math.floor(Math.random() * keys.length)];
  },

  // Run animation on canvas
  animate: function(canvas, type, cols, rows) {
    const fn = this[type];
    if (fn && typeof fn === 'function') {
      fn.call(this, canvas, performance.now(), cols, rows);
    }
  }
};
