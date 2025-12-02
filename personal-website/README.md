# 🚀 Premium Personal Portfolio PWA

> A production-ready, fully-featured Progressive Web App for your personal portfolio with offline support, client-side encryption, and rich interactions.

[![PWA](https://img.shields.io/badge/PWA-enabled-purple)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Offline](https://img.shields.io/badge/Offline-ready-green)](service-worker.js)

## ✨ Features

### 🎯 Core Functionality
- **Progressive Web App** - Install on any device, works offline
- **Notes Management** - Create, edit, delete notes with Markdown support
- **Photo Gallery** - Beautiful masonry layout with lightbox viewer
- **Music Player** - Custom player with playlists and keyboard shortcuts
- **Watchlist Tracker** - Manage movies/series with ratings and drag-and-drop
- **Links Manager** - Organize important URLs with tags
- **Project Showcase** - Display portfolio projects with detailed modals

### 🔒 Privacy & Security
- **100% Client-Side** - All data stored locally (IndexedDB/localStorage)
- **Optional Encryption** - Password-protect sensitive notes (Web Crypto API)
- **No Tracking** - Optional client-side analytics (fully transparent)
- **Export/Import** - Backup and restore all your data as JSON

### 🎨 Customization
- **4 Theme Presets** - Modern, Cyberpunk, Pastel, Minimal
- **Dark/Light/Auto Mode** - Respects system preferences
- **Accent Color Picker** - Customize primary colors
- **Font Selection** - Choose from system fonts or Google Fonts
- **Card Style Variants** - Rounded, Flat, Glass, Minimal

### ⚡ Performance
- **Lazy Loading** - Images load on demand
- **Service Worker Caching** - Lightning-fast repeat visits
- **Optimized Assets** - Minimal bundle size (<100KB gzipped)
- **CSS-Only Animations** - Smooth 60fps interactions

### ♿ Accessibility
- **WCAG 2.1 Compliant** - AA standard
- **Full Keyboard Navigation** - No mouse required
- **Screen Reader Friendly** - Semantic HTML + ARIA labels
- **Focus Management** - Proper focus trapping in modals
- **Reduced Motion Support** - Respects user preferences

---

## 🚀 Quick Start

### Option 1: Open Locally (No Server Required)

1. **Download/Clone** this repository
2. **Open** `index.html` in your browser
3. **Done!** The app works as a static site

### Option 2: Local Development Server (Recommended)

For testing service worker and PWA features, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit:  
**http://localhost:8000**

---

## 📦 What's Included

```
personal-website/
├── index.html              # Main application HTML
├── style.css               # All styles with CSS variables
├── script.js               # Application logic & features
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline caching & updates
├── offline.html            # Offline fallback page
├── data.json               # Sample data (importable)
├── README.md               # This file
├── CHANGELOG.md            # Version history
└── INSTRUCTIONS.md         # Detailed customization guide
```

---

## 🌐 Deployment

### GitHub Pages (Free)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Enable Pages**:
   - Go to repository Settings
   - Navigate to "Pages"
   - Set source to `main` branch
   - Click Save

3. **Access**: `https://yourusername.github.io/portfolio`

### Netlify (Free, with CI/CD)

1. **Drag & Drop**: Go to [Netlify Drop](https://app.netlify.com/drop) and drag your folder

**OR using CLI**:
```bash
npm install -g netlify-cli
netlify deploy --dir=. --prod
```

2. **Configure** (optional):
   - Add custom domain in Netlify dashboard
   - Set build command to `echo "No build needed"`

3. **Auto-deploy**: Connect to GitHub for automatic deployments

### Vercel (Free, instant)

```bash
npm install -g vercel
cd your-website-folder
vercel --prod
```

**OR** use GitHub integration for zero-config deployments.

### Traditional Web Hosting

1. **Upload files** via FTP/cPanel to `public_html` or `www` directory
2. **Ensure** all files maintain proper permissions (644 for files, 755 for directories)
3. **Access** via your domain name

---

## ⚙️ Configuration

### 1. Personal Information

**Edit `index.html`** (around lines 120-145):
```html
<h1>Hi, I'm <span class="gradient-text">Your Name</span></h1>
<p class="hero-subtitle">Your Title Here</p>
<p class="hero-description">Your bio...</p>
```

**Social Links** (lines 150-165):
```html
<a href="https://instagram.com/yourusername" class="social-link">
```

### 2. Colors & Theme

**Option A: Use Settings Panel**
1. Click gear icon (⚙️) in header
2. Select theme preset or accent color
3. Changes save automatically to localStorage

**Option B: Edit CSS Variables** (`style.css` lines 28-35):
```css
:root {
    --primary: #a855f7;        /* Main accent color */
    --primary-dark: #9333ea;   
    --primary-light: #c084fc;
}
```

### 3. Fonts

**Google Fonts** (enabled by default in `index.html` line 24):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
```

**Change Font** via Settings Panel or edit CSS (`style.css` line 49):
```css
--font-family: 'Inter', sans-serif;
```

### 4. Import Sample Data

1. Click Settings (⚙️) → Data Management
2. Click "Import Data"
3. Select `data.json`
4. Confirm import

Or manually via browser console:
```javascript
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    // Import logic handled by app
  });
```

---

## 🔧 Advanced Features

### Client-Side Encryption

**Enable password protection** for sensitive notes:

1. Create/Edit note
2. Click "Encrypt" toggle
3. Enter password (min 8 characters)
4. Note content encrypted using AES-GCM (Web Crypto API)

**Note**: Encryption is client-side only. If you forget password, data is **unrecoverable**.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search |
| `Esc` | Close modals/overlays |
| `Space` | Play/Pause music (when player focused) |
| `←` / `→` | Navigate gallery |
| `Ctrl/Cmd + S` | Save note (in editor) |
| `Ctrl/Cmd + K` | Open command palette (future) |

### Export/Import Data

**Export** (backup):
1. Settings → Data Management → Export All Data
2. Saves `portfolio-backup-[date].json`

**Import** (restore):
1. Settings → Data Management → Import Data
2. Select backup JSON file
3. Choose merge or replace

### Diagnostics Panel

Access via Settings → Diagnostics or add `?diagnostics=1` to URL

Checks:
- ✅ Service Worker registration
- ✅ IndexedDB availability
- ✅ Storage quota usage
- ✅ PWA installability
- ✅ Browser compatibility

---

## 📊 Storage

### What's Stored Where

| Data Type | Storage Method | Size Limit |
|-----------|---------------|------------|
| Theme preferences | localStorage | ~10MB |
| Settings | localStorage | ~10MB |
| Notes | IndexedDB | ~50MB+ |
| Watchlist | IndexedDB | ~50MB+ |
| Gallery metadata | IndexedDB | ~50MB+ |
| Analytics | IndexedDB | ~50MB+ |

### Clear All Data

**Via UI**: Settings → Data Management → Clear All Data

**Via Console**:
```javascript
// Clear localStorage
localStorage.clear();

// Clear IndexedDB
indexedDB.deleteDatabase('PortfolioDB');

// Reload page
location.reload();
```

---

## ♿ Accessibility Checklist

- [x] **Semantic HTML5** - Proper heading hierarchy, landmarks
- [x] **ARIA Labels** - All interactive elements labeled
- [x] **Keyboard Navigation** - Tab through all features
- [x] **Focus Indicators** - Visible focus states
- [x] **Color Contrast** - WCAG AA compliant (4.5:1 minimum)
- [x] **Screen Reader** - Tested with NVDA/JAWS/VoiceOver
- [x] **Reduced Motion** - Respects `prefers-reduced-motion`
- [x] **Focus Trapping** - Modals trap focus properly
- [x] **Skip Links** - Jump to main content
- [x] **Live Regions** - Dynamic updates announced
- [x] **Alt Text** - All images have descriptive alt text
- [x] **Form Labels** - All inputs properly labeled

### Testing Accessibility

1. **Keyboard Only**: Unplug mouse, navigate entire site with Tab/Enter/Arrows
2. **Screen Reader**: Enable NVDA (Windows) or VoiceOver (Mac), navigate site
3. **Contrast**: Use browser DevTools or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
4. **Zoom**: Test at 200% zoom level

---

## 🔒 Privacy & Security

### Data Storage
- **100% Local**: All data stored in your browser (localStorage/IndexedDB)
- **No Server**: Zero data transmission to external servers
- **No Cookies**: No tracking cookies used
- **No Analytics**: Optional client-side event counters (fully transparent)

### Encryption Details
- **Algorithm**: AES-GCM (256-bit)
- **Key Derivation**: PBKDF2 with 100,000 iterations
- **Salt**: Random 16-byte salt per note
- **Limitations**: 
  - Client-side only (password not stored anywhere)
  - Vulnerable to memory dumps if device compromised
  - No protection if device unlocked

**For maximum security**: Use device encryption + strong device password.

### Analytics (Optional)
If enabled, tracks:
- Page views (count only)
- Feature usage (notes created, searches performed)
- **Does NOT track**: Personal data, IP addresses, identifiable information

Data never leaves your device. Export via Settings → Analytics.

---

## 🧪 Testing

### PWA Installation

1. **Desktop**: Click install icon in address bar (Chrome/Edge)
2. **Mobile**: "Add to Home Screen" from browser menu
3. **Verify**: App opens in standalone window

### Offline Mode

1. Open app while online
2. Open DevTools → Application → Service Workers
3. Check "Offline" checkbox
4. **Reload page** - Should load from cache
5. Create/edit notes - Should work offline
6. Go back online - Changes persist

### Browser Compatibility

Tested and working on:
- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Firefox 88+ (Desktop & Mobile)
- ✅ Safari 14+ (Desktop & Mobile)
- ✅ Edge 90+
- ⚠️ IE11 - Not supported (requires modern browser)

---

## 🛠️ Customization Guide

### Add New Project

**Edit `index.html`** projects section (line ~250):
```html
<div class="project-card" data-reveal="scale-up">
    <div class="project-image">
        <img src="path/to/image.jpg" alt="Project Name">
        <div class="project-overlay">
            <button class="btn-primary view-project" data-project="4">View Details</button>
        </div>
    </div>
    <div class="project-info">
        <h3 class="project-title">New Project</h3>
        <p class="project-description">Description...</p>
        <div class="project-tags">
            <span class="tag">Tech Stack</span>
        </div>
    </div>
</div>
```

**Update `script.js`** getProjectsData function (line ~940):
```javascript
{
    title: 'New Project',
    description: 'Short description',
    fullDescription: 'Detailed description...',
    tech: ['Tech1', 'Tech2'],
    image: 'path/to/image.jpg'
}
```

### Add Custom Theme Preset

**Edit `style.css`** (add after line 75):
```css
/* Custom Theme: Ocean */
body[data-theme="ocean"] {
    --primary: #0ea5e9;
    --primary-dark: #0284c7;
    --primary-light: #38bdf8;
}
```

**Update Settings UI** in `index.html`:
```html
<button class="color-option" data-color="ocean" style="background: #0ea5e9;">
```

### Change Music Player Sources

**Edit `index.html`** audio elements (line ~460):
```html
<audio class="audio-element" data-track="0">
    <source src="path/to/your-song.mp3" type="audio/mpeg">
</audio>
```

Update track info:
```html
<h3 class="music-title">Your Song Name</h3>
<p class="music-artist">Your Artist</p>
```

---

## 📈 Performance Optimization

### Image Optimization

**Before adding images**:
1. Compress using [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
2. Use WebP format when possible
3. Add `loading="lazy"` attribute:
   ```html
   <img src="image.jpg" loading="lazy" alt="Description">
   ```

### Service Worker Updates

When you update files, users get new version automatically:
1. Edit files
2. Service worker detects changes
3. Caches new version in background
4. User gets update on **next** visit

**Force immediate update**:
```javascript
// In browser console
navigator.serviceWorker.getRegistration().then(reg => {
    reg.update();
});
```

### Bundle Size

Current sizes (approximate):
- `index.html`: ~25KB (gzipped: ~8KB)
- `style.css`: ~30KB (gzipped: ~8KB)
- `script.js`: ~45KB (gzipped: ~12KB)
- **Total**: ~100KB gzipped ✅

---

## 🐛 Troubleshooting

### Service Worker Not Registering

**Cause**: Must be served over HTTPS (or localhost)

**Fix**:
- Use local server (see Quick Start)
- Deploy to hosting with HTTPS
- Check browser console for errors

### IndexedDB Quota Exceeded

**Cause**: Browser storage limit reached

**Fix**:
1. Export data as backup
2. Clear old data via Settings → Data Management
3. Re-import essential data only

### Images Not Loading

**Cause**: Incorrect file paths

**Fix**:
- Use relative paths: `images/photo.jpg`
- Or absolute URLs: `https://example.com/image.jpg`
- Check browser console for 404 errors

### PWA Won't Install

**Cause**: Missing manifest or service worker

**Check**:
1. DevTools → Application → Manifest (should show valid manifest)
2. DevTools → Application → Service Workers (should be registered)
3. Use Lighthouse audit to diagnose

---

## 📚 Resources

### Documentation
- [MDN Web Docs - PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker Cookbook](https://serviceworke.rs/)
- [IndexedDB Guide](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - PWA audit
- [PWA Builder](https://www.pwabuilder.com/) - Generate PWA assets
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [WebAIM WAVE](https://wave.webaim.org/) - Accessibility checker

---

## 🤝 Contributing

This is a personal portfolio template, but improvements are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📝 License

MIT License - feel free to use this for your own portfolio!

---

## 💬 Support

- **Issues**: Open an issue on GitHub
- **Questions**: Check INSTRUCTIONS.md for detailed guides
- **Updates**: Watch repository for new features

---

## ✅ Production Checklist

Before deploying:
- [ ] Update personal information (name, bio, social links)
- [ ] Replace placeholder images with your own
- [ ] Add real project descriptions and screenshots
- [ ] Test PWA installation on mobile device
- [ ] Test offline functionality
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test accessibility with keyboard only
- [ ] Test on multiple browsers
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (required for PWA)

---

**Built with ❤️ using modern web technologies**

No frameworks. No build step. Just vanilla HTML, CSS, and JavaScript.
