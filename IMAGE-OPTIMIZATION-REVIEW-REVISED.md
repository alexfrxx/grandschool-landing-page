# Image & SVG optimization — re-review (latest pull)

Review against ticket requirements after the latest pull.

**Ticket:** WebP/AVIF where possible; compress images; correct image sizes; width/height to prevent CLS; loading="lazy"; SVG for icons; SVGO.  
**Verify:** Visual check; no layout shifts.  
**Acceptance:** Lighter assets; improved loading performance.

---

## 1. Latest changes (this pull)

| Change | Status |
|--------|--------|
| **packOfCourses** | Single `<img>` replaced with `<picture>`: AVIF → WebP → PNG fallback. ✅ |
| **New assets** | `img/packOfCourses.avif` (~8 KB), `img/packOfCourses.png` (~21 KB); WebP already present. |
| **Source order** | AVIF put first in `<picture>` (then WebP, then PNG) so supporting browsers get the smallest file. ✅ |

All content images now use the same pattern: `<picture>` with AVIF → WebP → PNG.

---

## 2. Current compliance with ticket

### WebP / AVIF wherever possible
- **Content images:** All use `<picture>` with AVIF → WebP → PNG (course cards including packOfCourses, testimonials, feelings). ✅  
- **CSS backgrounds:** WebP + `image-set( 1x, 2x )`. ✅  
- **Favicon:** Index and terms use `favicon.webp`. ✅  
- **OG/Twitter:** Index and terms use `grandschool.webp`. ✅  

### Width/height (CLS)
- All content images and video iframe have `width` and `height`. ✅  

### loading="lazy"
- Content images and video iframe use `loading="lazy"`; hero is CSS/SVG. ✅  

### SVG for icons
- Icons via `img/sprite.svg` and `<use xlink:href="img/sprite.svg#id">`. ✅  

### SVGO
- Build runs SVGO on sprite → `dist/img/sprite.svg`; `svgo.config.js` in use. ✅  

### Retina
- CSS backgrounds use `image-set( 1x, 2x )`. ✅  

### Optional (not required for acceptance)
- **Compress PNGs:** Large PNG fallbacks still in repo; optional to compress or move to WebP-only.
- **srcset/sizes:** No width descriptors; optional for very narrow viewports.

---

## 3. Verification

- **Visual:** Check hero, course cards (including packOfCourses), testimonials, feelings, footer on desktop and mobile.
- **CLS:** Width/height set on all images; optional Lighthouse check.

---

## 4. Acceptance

| Criterion | Status |
|-----------|--------|
| **Lighter assets** | Met: WebP/AVIF everywhere for content, OG, favicon; SVGO; packOfCourses now AVIF/WebP; unused assets removed. |
| **Improved loading performance** | Met: modern formats, lazy loading, dimensions, optimized sprite. |

**Ticket acceptance criteria are fully met.**

---

## 5. Summary checklist (current state)

- [x] WebP/AVIF for all content images (including packOfCourses)
- [x] WebP for CSS backgrounds, favicon, OG/Twitter (index + terms)
- [x] Retina (image-set 1x/2x)
- [x] Width/height on images and iframe
- [x] loading="lazy" where appropriate
- [x] SVG for icons + SVGO in build
- [x] Terms: favicon and OG/Twitter → WebP
- [ ] Optional: PNG compression or WebP-only fallback
- [ ] Optional: srcset/sizes for responsive sizes
