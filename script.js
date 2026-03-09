// 1. Matrix Background Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff003c"; // Red matrix theme
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// 2. Typing Effect
const phrases = ["Cybersecurity Specialist", "Penetration Tester", "AI Developer"];
let i = 0; let j = 0; let currentPhrase = [];
let isDeleting = false;
const typingTarget = document.getElementById('typing');

function loopPhrases() {
    const phrase = phrases[i];
    if (isDeleting) {
        currentPhrase.pop();
        j--;
    } else {
        currentPhrase.push(phrase[j]);
        j++;
    }
    typingTarget.innerHTML = currentPhrase.join("");

    if (!isDeleting && j === phrase.length) {
        isDeleting = true;
        setTimeout(loopPhrases, 2000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(loopPhrases, 500);
    } else {
        setTimeout(loopPhrases, isDeleting ? 50 : 100);
    }
}
loopPhrases();

// 3. Terminal Emulator logic
const termBody = document.getElementById('terminal-body');
const commands = [
    "> nmap -sV 192.168.1.1",
    "> Scanning for vulnerabilities...",
    "> Found CVE-2019-9053: CMS Made Simple Exploit",
    "> Initializing payload...",
    "> Access Granted. Session established.",
    "> Eltayeb Ghandi: Full Permissions verified."
];

let cmdIndex = 0;
function runTerminal() {
    if (cmdIndex < commands.length) {
        let p = document.createElement('p');
        p.className = "t-output";
        p.innerHTML = commands[cmdIndex];
        termBody.appendChild(p);
        termBody.scrollTop = termBody.scrollHeight;
        cmdIndex++;
        setTimeout(runTerminal, 1500);
    }
}

// 4. Scroll Reveal Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if(entry.target.id === 'terminal') runTerminal();
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
