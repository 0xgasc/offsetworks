# Instagram Posts Generator - ASCII Animation Backgrounds

## Overview
Interactive web page for creating 12 Instagram-ready posts (3:4 aspect ratio, 1080x1440) featuring the "offset works" logo with trippy ASCII animation backgrounds.

## Features
- **12 unique posts** with different color schemes and effects
- **3:4 aspect ratio** (1080x1440) optimized for Instagram 2026 grid format
- **One-at-a-time display** for optimal performance
- **Navigation controls** (Previous/Next buttons)
- **Shuffle effect** for randomizing animations (except locked green plasma on post 1)
- **Pause/Play toggle** for animations
- **6 custom plasma variations** inspired by Terraforms by Mathcastles

## File Structure
- `ig-posts.html` - Main page with all post templates and plasma effect functions
- `animations.js` - 30+ ASCII animation effects library (pulse, vortex, etc.)

## Post Configuration

### Post 1: Multicolor Plasma (Green)
- **Effect**: `multicolorPlasma` (LOCKED - cannot shuffle)
- **Speed**: 3
- **Text Color**: Black (#000)
- **BG Color**: Green (#00ff88)
- **Pattern**: 4-layered sine waves with balanced flow
- **Characteristics**: Black text melts into dark plasma areas

### Post 2: Blue Wave
- **Effect**: `bluePlasma`
- **Speed**: 3
- **Text Color**: White (#fff)
- **BG Color**: Blue (#00ddff)
- **Pattern**: Wavy horizontal bands

### Post 3: Pink Spiral
- **Effect**: `pinkPlasma`
- **Speed**: 5 (faster)
- **Text Color**: White (#fff)
- **BG Color**: Very light pink (#ffe6f5)
- **Pattern**: Tight spirals with white gradients
- **Characteristics**: White text fuses with white areas of pattern

### Post 4: Yellow Fire
- **Effect**: `fireGradientPlasma`
- **Speed**: 3
- **Text Color**: Black (#000)
- **BG Color**: Yellow (#ffcc00)
- **Pattern**: Red/orange/yellow fire-like flow

### Post 5: Orange Vortex
- **Effect**: `vortex`
- **Speed**: 3
- **Text Color**: White (#fff)
- **BG Color**: Orange (#ff6b35)
- **Pattern**: Centered spiral vortex

### Post 6: Crimson Pulse
- **Effect**: `pulse`
- **Speed**: 4
- **Text Color**: White (#fff)
- **BG Color**: Crimson (#dc143c)
- **Pattern**: Concentric rings scrolling upward

### Post 7: Cyan Matrix
- **Effect**: `cyanPlasma`
- **Speed**: 3
- **Text Color**: Navy blue (#001f3f)
- **BG Color**: Cyan (#00ffff)
- **Pattern**: Organic blobs with dark blue gradients

### Post 8: Red Tunnel
- **Effect**: `redOrangePlasma`
- **Speed**: 3
- **Text Color**: White (#fff)
- **BG Color**: Red (#ff3366)
- **Pattern**: Lava flow mixing reds and oranges

### Post 9: Lime Spiral
- **Effect**: `spiral`
- **Speed**: 3
- **Text Color**: White (#fff)
- **BG Color**: Lime (#ccff00)
- **Pattern**: Spiral from animations.js

### Post 10: Teal Constellation
- **Effect**: `constellation`
- **Speed**: 3
- **Text Color**: White (#fff)
- **BG Color**: Teal (#008080)
- **Pattern**: Constellation from animations.js

### Post 11: Magenta Bokeh
- **Effect**: `bokeh`
- **Speed**: 3
- **Text Color**: Black (#000)
- **BG Color**: Magenta (#ff00ff)
- **Pattern**: Bokeh from animations.js

### Post 12: Gold Starfield
- **Effect**: `starfield`
- **Speed**: 3
- **Text Color**: Black (#000)
- **BG Color**: Gold (#ffd700)
- **Pattern**: Starfield from animations.js

## Custom Plasma Effects

### 1. multicolorPlasma (Green - Terraforms style)
```javascript
- 4 layered sine waves
- Radial component from center
- Character set: ' .:·░▒▓█'
- Speed: 0.003
- Locked to post 1, cannot be shuffled
```

### 2. bluePlasma
```javascript
- 3 wave components
- Horizontal band emphasis
- Character set: ' ·:░▒▓█'
- Speed: 0.0025
```

### 3. pinkPlasma
```javascript
- Spiral pattern with angle calculation
- White gradients for text fusion
- Character set: ' .·:░▒▓█▓▒░·. '
- Speed: 0.0035
- Special: Includes whites for text melting effect
```

### 4. cyanPlasma
```javascript
- Organic blob movement
- Extended character set for darker blues
- Character set: ' .·:░▒▓█▓▒░'
- Speed: 0.003
```

### 5. redOrangePlasma
```javascript
- 4-wave lava flow
- Off-center focal point
- Character set: ' .:░▒▓█'
- Speed: 0.0025
```

### 6. fireGradientPlasma
```javascript
- Fire-like flowing patterns
- Red/orange/yellow shades
- Character set: ' .·:░▒▓█'
- Speed: 0.0028
```

## Technical Details

### Grid Calculation
- **Character Width**: 2px (estimated)
- **Character Height**: 2.5px (estimated)
- **Buffer**: +150 cols/rows to ensure full coverage
- **Font**: Space Mono, 5px, line-height 0.85, letter-spacing -1.5px

### Animation Performance
- **One animation at a time** - only active post renders
- **Animation cleanup** - All frames cancelled when switching posts
- **Speed multipliers**: Frame increment varies by post (3-5)

### Controls
- **← Previous / Next →** - Navigate through posts
- **🎲 Shuffle This Effect** - Random effect + speed (not for post 1)
- **Pause/Play** - Toggle animation

## Usage Instructions

1. **View posts**: Click Next/Previous to cycle through all 12 posts
2. **Shuffle effects**: Click shuffle button on posts 2-12 to randomize
3. **Screenshot**: Pause animation, then right-click and save, or use OS screenshot tool
4. **Export for Instagram**: Images are 3:4 ratio, optimized for Instagram 2026

## Design Decisions

### Text Contrast
- Black text on light backgrounds (green, yellow, pink, cyan, magenta, gold)
- White text on dark backgrounds (blue, orange, crimson, red, lime, teal)
- Navy blue text on cyan for complementary blue-on-blue

### Special Effects
- **Pink Spiral**: Very light pink (#ffe6f5) allows white text to "melt" into white areas
- **Green Plasma**: Locked as signature effect, black text melts into dark plasma
- **Crimson Pulse**: Upward scrolling rings for dynamic movement

### Performance
- Grid size: ~300-400 cols × ~400-500 rows = 120,000-200,000 chars per frame
- Only one post animates at a time to prevent slowdown
- All animations cancelled when switching to prevent memory leaks

## Available Effects for Shuffle
All effects from animations.js are available: plasma, wave, spiral, glitch, noise, pulse, matrix, fire, ripple, vortex, electric, rain, tunnel, bokeh, constellation, starfield, circuit, terrain, flow, dna, plus all 6 custom plasma variations.

## Code Structure

### Main Functions
- `initPost(id, effect, speed)` - Initialize animation for a post
- `showPost(index)` - Display specific post, hide others, cancel animations
- `nextPost()` / `prevPost()` - Navigation
- `shuffleCurrentEffect()` - Randomize effect and speed (not post 1)
- `toggleAnimations()` - Pause/play global toggle

### Plasma Functions
All 6 plasma variations are defined inline and added to ASCII object for consistency with animations.js effects.

## Changelog

### Session Highlights
1. Created 12 Instagram posts with ASCII backgrounds
2. Changed aspect ratio from 1:1 to 4:5 to final 3:4 for IG 2026
3. Implemented one-at-a-time display for performance
4. Created 6 custom plasma variations
5. Locked green plasma to post 1
6. Adjusted speeds: Pink Spiral (5), Crimson Pulse (4)
7. Added upward scrolling to Crimson Pulse
8. Centered Orange Vortex
9. Made pink very light for text fusion effect
10. Changed Cyan Matrix text to navy blue

### Known Issues
- ASCII coverage still not 100% perfect on all browsers due to font rendering variations
- Grid calculation uses estimated character dimensions, not measured

## Future Enhancements
- Add export button for direct image download
- Add color picker for custom color schemes
- Implement actual font measurement for perfect coverage
- Add more plasma variations
- Create animation presets
