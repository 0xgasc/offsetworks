# Cyberdesign Main Website Documentation

## Overview
Main landing page for offsetworks.xyz featuring ASCII animation backgrounds with multiple themed sections.

## File Structure
- `index.html` - Main page with sections and ASCII background setup
- `styles.css` - Global styles including section backgrounds (line 599: text-shadow performance issue)
- `animations.js` - 30+ ASCII animation effects library
- `ig-posts.html` - Instagram post generator (separate feature)

## Architecture

### Section-Based Layout
Each section has its own ASCII background animation running independently.

### ASCII Background System
```javascript
// Grid calculation (index.html ~line 230)
const charWidth = 6;  // Estimated pixel width
const charHeight = 8; // Estimated pixel height
sections[id].cols = Math.ceil(width / charWidth) + 30;
sections[id].rows = Math.ceil(height / charHeight) + 20;
```

### Frame Skipping for Performance
```javascript
// index.html ~line 194
const frameSkip = prefersReducedMotion ? 8 :
                  (isSmallMobile ? 4 :
                  (isMobile || isLowPower ? 3 : 1));
```
- Desktop: Every frame (frameSkip = 1)
- Mobile/Low Power: Every 3rd frame
- Small Mobile: Every 4th frame
- Reduced Motion: Every 8th frame

## Known Performance Issues (from Plan)

### 1. Text-Shadow Glow (CRITICAL)
**Location**: styles.css line 599
```css
.section-bg {
  text-shadow: 0 0 30px currentColor, 0 0 60px currentColor;
}
```
**Impact**:
- Applies TWO Gaussian blur filters to 20,000+ characters per section
- Rendered 45 times per second
- Each blur has O(n²) complexity
- **This is the #1 performance killer**

**Fix**: Remove text-shadow entirely
```css
.section-bg {
  text-shadow: none;
}
```
**Expected improvement**: 10-20x rendering performance boost

### 2. Coverage Issues (MEDIUM)
**Location**: index.html line 230-231
**Problem**:
- Right edge of sections shows white gaps
- charWidth/charHeight are estimated, not measured
- Actual rendered character dimensions vary by browser
- Font: Space Mono at various sizes with letter-spacing

**Current**:
```javascript
sections[id].cols = Math.ceil(width / charWidth) + 30;
sections[id].rows = Math.ceil(height / charHeight) + 20;
```

**Recommended Fix**:
```javascript
// Increase buffer to compensate for font rendering variations
sections[id].cols = Math.ceil(width / charWidth) + 50;
sections[id].rows = Math.ceil(height / charHeight) + 30;
```

### 3. Frame Skip Too Conservative (LOW)
**Location**: index.html line 194
**Current**: Desktop renders every frame (frameSkip = 1)
**Recommended**:
```javascript
const frameSkip = prefersReducedMotion ? 8 :
                  (isSmallMobile ? 5 :
                  (isMobile || isLowPower ? 3 : 2));
```
**Impact**: Desktop 45fps → 22.5fps, still smooth but 2x less CPU

## Animation Effects Available

### From animations.js (30+ effects):
1. Plasma
2. Wave
3. Spiral
4. Pulse
5. Glitch
6. Noise
7. Matrix
8. Fire
9. Ripple
10. Vortex
11. Electric
12. Rain
13. Tunnel
14. Bokeh
15. Constellation
16. Starfield
17. Circuit
18. Terrain
19. Flow
20. DNA
... and more

## CSS Architecture

### Section Background Styling
```css
.section-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.1;
  white-space: pre;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  opacity: 0.12;
  /* text-shadow: 0 0 30px currentColor, 0 0 60px currentColor; */ /* REMOVE THIS */
}
```

## Performance Optimization Plan (Priority Order)

### Phase 1: Remove Text-Shadow (CRITICAL)
**File**: styles.css line 599
**Change**: Remove or comment out text-shadow
**Expected Impact**: 10-20x performance improvement

### Phase 2: Increase Coverage Buffer (MEDIUM)
**File**: index.html line 230-231
**Change**: Increase buffer from +30/+20 to +50/+30
**Expected Impact**: Eliminates white gaps on right edge

### Phase 3: Adjust Frame Skipping (LOW)
**File**: index.html line 194
**Change**: Desktop frameSkip from 1 to 2
**Expected Impact**: 2x less CPU usage on desktop

## Browser/Platform Targets
- Desktop Chrome 1920px width
- Desktop Safari 1920px width
- Laptop screens 1280-1920px
- Mobile devices (with reduced frame rates)

## Performance Expectations

### Before Optimization
- Choppy ~10-20fps with glow effects
- Right edge cut off showing white gaps
- High CPU usage on all devices

### After Optimization (All 3 Phases)
- Smooth 22-45fps without glows
- Full coverage, no white gaps
- Significantly reduced CPU usage
- Trade-off: Lose glow aesthetic for reliability and speed

## Related Projects
- `ig-posts.html` - Instagram post generator with custom plasma effects
- See `IG-POSTS-README.md` for Instagram-specific documentation

## Technical Notes

### Font Rendering Challenges
- Space Mono is a monospace font but rendering width varies slightly
- letter-spacing affects character positioning
- line-height affects vertical spacing
- Font loading timing can cause initial miscalculation
- Different browsers render fonts with slight variations

### Grid Calculation Limitations
- Uses estimated character dimensions, not measured
- Measurement would require:
  1. Wait for font to load
  2. Create hidden element with single character
  3. Measure getBoundingClientRect()
  4. Use measured values for grid calculation

### Animation Performance
- Each section generates 15,000-25,000 characters per frame
- Multiple sections can run simultaneously
- requestAnimationFrame runs at 60fps (or display refresh rate)
- Frame skipping reduces actual render frequency

## Future Enhancements
1. Implement actual font measurement for precise grid sizing
2. Add dynamic frame rate adjustment based on performance
3. Implement Web Workers for animation calculations
4. Add canvas-based rendering as alternative to text DOM
5. Implement lazy loading for off-screen sections
6. Add animation quality presets (low/medium/high)

## Critical Files Reference
- `/Volumes/WORKHORSE GS/vibecoding/cyberdesign/index.html`
- `/Volumes/WORKHORSE GS/vibecoding/cyberdesign/styles.css`
- `/Volumes/WORKHORSE GS/vibecoding/cyberdesign/animations.js`
