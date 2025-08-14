// ====== TYPING EFFECT ======
const typingElement = document.getElementById('typing');
const titles = [
    "Cybersecurity Enthusiast",
    "Penetration Tester",
    "Data Analyst",
    "AI Builder"
];
let titleIndex = 0, charIndex = 0, typingForward = true;

function typeTitle() {
    const title = titles[titleIndex];
    if (typingForward) {
        charIndex++;
        if (charIndex === title.length) typingForward = false;
    } else {
        charIndex--;
        if (charIndex === 0) {
            typingForward = true;
            titleIndex = (titleIndex + 1) % titles.length;
        }
    }
    typingElement.textContent = title.slice(0, charIndex);
    setTimeout(typeTitle, typingForward ? 80 : 40);
}
typeTitle();

// ====== SMOOTH SCROLL FOR NAV ======
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ====== CONTACT FORM FEEDBACK ======
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('contactStatus').textContent = "Message sent! (Demo only)";
    setTimeout(() => {
        document.getElementById('contactStatus').textContent = "";
        document.getElementById('contactForm').reset();
    }, 2500);
});

// ====== BACKGROUND PARTICLES ======
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.hero').offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7,
            alpha: Math.random() * 0.5 + 0.3
        });
    }
}
createParticles();

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#ff0033";
        ctx.shadowColor = "#ff0033";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Move
        p.x += p.dx;
        p.y += p.dy;
        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// ====== SKILL BAR ANIMATION ======
function animateSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const width = bar.getAttribute('style').match(/width:(\d+)%/)[1];
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 400);
    });
}
window.addEventListener('DOMContentLoaded', animateSkillBars);

// ====== ACCESSIBILITY: KEYBOARD NAV ======
document.addEventListener('keydown', function(e) {
    if (e.key === "Tab") {
        document.body.classList.add('user-is-tabbing');
    }
});