// ====== SCROLL ANIMATIONS ======
const elements = document.querySelectorAll('.fade-in, .fade-up, .slide-in, .zoom-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
});
elements.forEach(el => observer.observe(el));

// ====== MOBILE MENU TOGGLE ======
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navLinks.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
});

// ====== PARTICLE BACKGROUND ======
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray;
let mouse = { x: null, y: null, radius: 100 };

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function initParticles() {
  particlesArray = [];
  const count = Math.floor(window.innerWidth / 8);
  for (let i = 0; i < count; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 1.5;
    let dy = (Math.random() - 0.5) * 1.5;
    particlesArray.push({ x, y, dx, dy, size });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 245, 255, 0.7)';
    ctx.fill();
  });
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  drawParticles();
  particlesArray.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
    if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;

    // Mouse interaction
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius) {
      p.x -= dx / 10;
      p.y -= dy / 10;
    }
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateParticles();
