// Image to ASCII Ditherer Module
// Converts images to ASCII art in real-time

const ImageDither = {
  // Character sets for different looks
  charSets: {
    standard: ' .:-=+*#%@',
    blocks: ' ░▒▓█',
    dense: ' ·:;+=xX$&#',
    minimal: ' .oO0@',
    dots: ' ·•●',
  },

  // Default settings
  defaults: {
    width: 70,
    contrast: 1.3,
    brightness: 0,
    invert: false,
    charset: 'blocks'
  },

  // Convert image to ASCII
  convert: function(img, options = {}) {
    const opts = { ...this.defaults, ...options };
    const chars = this.charSets[opts.charset] || this.charSets.blocks;

    // Create offscreen canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const targetWidth = opts.width;
    const aspectRatio = img.height / img.width;
    // Compensate for character aspect ratio
    const targetHeight = Math.floor(targetWidth * aspectRatio * 0.45);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Draw image scaled down
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    const pixels = imageData.data;

    let ascii = '';

    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const idx = (y * targetWidth + x) * 4;
        let r = pixels[idx];
        let g = pixels[idx + 1];
        let b = pixels[idx + 2];

        // Convert to grayscale (luminance)
        let gray = 0.299 * r + 0.587 * g + 0.114 * b;

        // Apply brightness
        gray += opts.brightness;

        // Apply contrast
        gray = ((gray - 128) * opts.contrast) + 128;

        // Clamp
        gray = Math.max(0, Math.min(255, gray));

        // Invert if needed
        if (opts.invert) gray = 255 - gray;

        // Map to character
        const charIdx = Math.floor((gray / 255) * (chars.length - 1));
        ascii += chars[charIdx];
      }
      ascii += '\n';
    }

    return ascii;
  },

  // Load image from URL and convert
  loadAndConvert: function(url, options = {}) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const ascii = this.convert(img, options);
        resolve(ascii);
      };
      img.onerror = reject;
      img.src = url;
    });
  },

  // Render ASCII to a pre element with animation
  renderToElement: function(element, ascii, animateIn = true) {
    if (animateIn) {
      // Fade in effect
      element.style.opacity = '0';
      element.textContent = ascii;
      requestAnimationFrame(() => {
        element.style.transition = 'opacity 0.5s';
        element.style.opacity = '1';
      });
    } else {
      element.textContent = ascii;
    }
  },

  // Create a "breathing" animation effect on ASCII art
  animateBreathing: function(element, ascii, options = {}) {
    const speed = options.speed || 0.002;
    const intensity = options.intensity || 0.15;
    const chars = this.charSets.blocks;

    let time = 0;
    const lines = ascii.split('\n');
    const rows = lines.length;
    const cols = lines[0]?.length || 0;

    const animate = () => {
      time += speed;
      let output = '';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const char = lines[y]?.[x] || ' ';
          if (char === ' ' || char === '\n') {
            output += char;
            continue;
          }

          // Add subtle wave effect
          const wave = Math.sin(x * 0.1 + y * 0.1 + time * 2) * intensity;
          const charIdx = chars.indexOf(char);
          if (charIdx >= 0) {
            const newIdx = Math.max(0, Math.min(chars.length - 1,
              Math.round(charIdx + wave * chars.length)));
            output += chars[newIdx];
          } else {
            output += char;
          }
        }
        if (y < rows - 1) output += '\n';
      }

      element.textContent = output;
      if (element.dataset.animating === 'true') {
        requestAnimationFrame(animate);
      }
    };

    element.dataset.animating = 'true';
    animate();

    // Return stop function
    return () => {
      element.dataset.animating = 'false';
    };
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageDither;
}
