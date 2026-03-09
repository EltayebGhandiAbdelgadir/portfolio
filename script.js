// ===== TYPING EFFECT =====

const typingElement = document.getElementById("typing");

const titles = [
    "Cybersecurity Enthusiast",
    "Penetration Tester",
    "Vice President of SSA LPU",
    "AI Builder",
    "Future OSCP"
];

let titleIndex = 0;
let charIndex = 0;
let typingForward = true;

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

    setTimeout(typeTitle, typingForward ? 90 : 40);
}

typeTitle();



// ===== SMOOTH SCROLL =====

document.querySelectorAll(".nav-list a").forEach(link => {

    link.addEventListener("click", function(e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }

    });

});



// ===== CONTACT FORM =====

document.getElementById("contactForm").addEventListener("submit", function(e) {

    e.preventDefault();

    document.getElementById("contactStatus").textContent =
        "Message sent! (Demo only)";

    setTimeout(() => {

        document.getElementById("contactStatus").textContent = "";
        document.getElementById("contactForm").reset();

    }, 2500);

});



// ===== PARTICLES BACKGROUND =====

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".hero").offsetHeight;

}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();



function createParticles() {

    particles = [];

    for (let i = 0; i < 70; i++) {

        particles.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            r: Math.random() * 2 + 1,

            dx: (Math.random() - 0.5) * 0.6,
            dy: (Math.random() - 0.5) * 0.6,

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
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        ctx.fillStyle = "#ff0033";
        ctx.shadowColor = "#ff0033";
        ctx.shadowBlur = 10;

        ctx.fill();

        ctx.restore();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    }

    requestAnimationFrame(drawParticles);

}

drawParticles();



// ===== SCROLL REVEAL ANIMATION =====

const revealElements = document.querySelectorAll("section");

function revealOnScroll() {

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add("visible");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();



// ===== SKILL BAR ANIMATION =====

const skillBars = document.querySelectorAll(".skill-bar-fill");

function animateSkills() {

    skillBars.forEach(bar => {

        const width = bar.dataset.width;

        bar.style.width = width + "%";

    });

}

const skillSection = document.getElementById("skills");

window.addEventListener("scroll", () => {

    const sectionTop = skillSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {

        animateSkills();

    }

});



// ===== KEYBOARD ACCESSIBILITY =====

document.addEventListener("keydown", function(e) {

    if (e.key === "Tab") {

        document.body.classList.add("user-is-tabbing");

    }

});
