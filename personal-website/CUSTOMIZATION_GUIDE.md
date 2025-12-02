# Personal Website - Customization Guide

## 📁 File Structure
```
personal-website/
├── index.html
└── style.css
```

## 🎨 How to Customize

### 1. Change Colors
Open `style.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #6366f1;    /* Change main brand color */
    --secondary-color: #8b5cf6;  /* Change secondary color */
    --accent-color: #ec4899;     /* Change accent color */
    /* ... other colors */
}
```

**Popular Color Schemes:**
- **Blue Theme**: `--primary-color: #3b82f6;`
- **Green Theme**: `--primary-color: #10b981;`
- **Orange Theme**: `--primary-color: #f59e0b;`

### 2. Change Your Name and Description

Open `index.html` and find the Hero section:

```html
<!-- Line ~40 -->
<h1 class="hero-title">John Doe</h1>  <!-- Replace with your name -->

<p class="hero-description">
    Full Stack Developer | Creative Designer | Tech Enthusiast  <!-- Your title -->
    <br>
    Passionate about building beautiful and functional web experiences.  <!-- Your description -->
</p>
```

### 3. Update Profile Picture

Replace the placeholder image URL:

```html
<!-- Line ~37 -->
<img src="YOUR_IMAGE_URL_HERE" alt="Profile Picture" class="profile-pic">
```

**Options:**
- Use a URL from an online image
- Use a local file: `<img src="images/profile.jpg" ...>`

### 4. Update Social Media Links

Find the social icons section and replace `#` with your actual profile URLs:

```html
<!-- Lines ~54-67 -->
<a href="https://instagram.com/yourusername" class="social-icon">
<a href="https://linkedin.com/in/yourusername" class="social-icon">
<a href="https://github.com/yourusername" class="social-icon">
<a href="https://facebook.com/yourusername" class="social-icon">
```

### 5. Add Your Projects

In the Portfolio section, update each project card:

```html
<!-- Lines ~91-102 (Project Card 1) -->
<div class="project-card">
    <div class="project-image">
        <img src="YOUR_PROJECT_IMAGE_URL" alt="Project Name">
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Your project description goes here.</p>
    </div>
</div>
```

**To add more projects:** Copy the entire `<div class="project-card">...</div>` block and paste it inside the `portfolio-grid` div.

### 6. Update Personal Storage Items

Find the storage cards and update the lists:

```html
<!-- Example: Personal Notes Card (Lines ~189-196) -->
<ul class="storage-list">
    <li>Your note 1</li>
    <li>Your note 2</li>
    <li>Your note 3</li>
    <li>Your note 4</li>
</ul>
```

**For links:**
```html
<li><a href="https://yourlink.com">Link Name</a></li>
```

### 7. Add Music Files

Replace placeholder audio URLs with your music files:

```html
<!-- Lines ~292-296 -->
<audio controls class="audio-player">
    <source src="path/to/your/music.mp3" type="audio/mpeg">
</audio>
```

**Options:**
- Local file: `src="music/song.mp3"`
- Online URL: `src="https://example.com/song.mp3"`

### 8. Update Photo Gallery

Replace placeholder images:

```html
<!-- Lines ~349-354 -->
<div class="gallery-item">
    <img src="YOUR_PHOTO_URL" alt="Photo Description">
    <div class="gallery-overlay">
        <span class="gallery-caption">Your Caption</span>
    </div>
</div>
```

**To add more photos:** Copy the entire `<div class="gallery-item">...</div>` block.

### 9. Update Watchlist Items

Modify movie/series cards:

```html
<!-- Lines ~429-435 -->
<div class="watchlist-card">
    <img src="MOVIE_POSTER_URL" alt="Movie Name" class="watchlist-poster">
    <div class="watchlist-info">
        <h4 class="watchlist-title">Movie/Series Name</h4>
        <p class="watchlist-meta">Year • Genre</p>
    </div>
</div>
```

### 10. Update Footer Information

Change footer text:

```html
<!-- Lines ~533-535 -->
<p class="footer-name">Your Name</p>
<p class="footer-copyright">&copy; 2024 All Rights Reserved</p>
```

## 🖼️ Image Recommendations

- **Profile Picture**: 300x300px, square, high quality
- **Project Images**: 600x400px, landscape orientation
- **Gallery Photos**: 400x400px, square
- **Movie Posters**: 300x450px, portrait (2:3 ratio)

## 🎯 Quick Customization Checklist

- [ ] Change colors in CSS variables
- [ ] Update your name in hero section
- [ ] Add your profile picture
- [ ] Update social media links
- [ ] Add your real projects
- [ ] Fill in personal storage items
- [ ] Add music files (optional)
- [ ] Add gallery photos
- [ ] Update watchlist
- [ ] Update footer information

## 🚀 How to Use

1. **Open the website:**
   - Double-click `index.html` to open in your browser
   - OR right-click → "Open with" → Choose your browser

2. **Edit files:**
   - Use any text editor (Notepad, VS Code, Sublime Text, etc.)
   - Save changes and refresh browser to see updates

3. **Deploy online:**
   - Use GitHub Pages (free)
   - Use Netlify (free)
   - Use Vercel (free)

## 💡 Tips

- **Test responsiveness**: Resize your browser window or use browser dev tools (F12)
- **Use high-quality images**: They make your site look professional
- **Keep colors consistent**: Stick to 2-3 main colors
- **Update regularly**: Add new projects and content as you grow

## 🐛 Common Issues

**Issue**: Images not showing
- **Solution**: Check file path, make sure image exists, use full URL for online images

**Issue**: Colors not changing
- **Solution**: Make sure you're editing the `:root` section in CSS, clear browser cache

**Issue**: Layout broken on mobile
- **Solution**: The design is already mobile-responsive, but test in real devices or browser dev tools

## 📞 Need Help?

- Check HTML/CSS comments for explanations
- Use browser console (F12) to find errors
- Search for specific HTML/CSS topics online

---

**Enjoy your new personal website! 🎉**
