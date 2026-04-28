/* =============================
   CYBERSECURITY PORTFOLIO JS
   ============================= */

'use strict';

// ── Typed Tagline ──────────────────────────────────────────
const taglines = [
  "Securing systems. Breaking vulnerabilities.",
  "Hack the planet. Ethically.",
  "CTF is not a crime.",
  "chmod 777 my future.",
  "root@career: find /internship",
];

let currentTagline = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  if (!typedEl) return;
  const current = taglines[currentTagline];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      currentTagline = (currentTagline + 1) % taglines.length;
      setTimeout(typeEffect, 500);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2200);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 45 : 75);
}

// ── Navbar scroll style ────────────────────────────────────
const navbar = document.getElementById('navbar');
function handleNavbar() {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(5,10,15,0.97)';
  } else {
    navbar.style.background = 'rgba(5,10,15,0.85)';
  }
}

// ── Hamburger ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// ── Scroll Reveal ───────────────────────────────────────────
function revealOnScroll() {
  const triggers = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const threshold = window.innerHeight * 0.88;
  triggers.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < threshold) el.classList.add('visible');
  });
}

// ── Back to Top ────────────────────────────────────────────
const backTopBtn = document.getElementById('back-top');
function handleBackTop() {
  if (backTopBtn) {
    backTopBtn.classList.toggle('visible', window.scrollY > 500);
  }
}
if (backTopBtn) {
  backTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Active Nav Link ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cyan)' : '';
  });
}

// ── Terminal Demo ──────────────────────────────────────────
const terminalLines = [
  { text: 'root@kali:~$ nmap -sV -p- 192.168.1.0/24', type: 'prompt', delay: 300 },
  { text: 'Starting Nmap 7.94 ( https://nmap.org )...', type: 'output', delay: 900 },
  { text: 'Discovered open port 22/tcp on 192.168.1.5', type: 'success', delay: 1400 },
  { text: 'Discovered open port 80/tcp on 192.168.1.5', type: 'success', delay: 1700 },
  { text: 'Discovered open port 443/tcp on 192.168.1.5', type: 'success', delay: 2000 },
  { text: 'root@kali:~$ searchsploit apache 2.4.49', type: 'prompt', delay: 2700 },
  { text: '| CVE-2021-41773  | Path Traversal (Critical)', type: 'warn', delay: 3300 },
  { text: 'root@kali:~$ python3 scanner.py --target 192.168.1.5', type: 'prompt', delay: 4200 },
  { text: '[*] Scanning for vulnerabilities...', type: 'output', delay: 4800 },
  { text: '[+] SQL Injection found at /login.php?id=', type: 'error', delay: 5400 },
  { text: '[+] XSS detected at /search?q=', type: 'error', delay: 5800 },
  { text: '[*] Report saved → report_2024.html', type: 'success', delay: 6400 },
  { text: 'root@kali:~$ # Mission accomplished. Stay ethical. 🛡️', type: 'comment', delay: 7200 },
];

function buildTerminalDemo() {
  const demo = document.getElementById('terminal-demo');
  if (!demo) return;

  terminalLines.forEach(({ text, type, delay }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = type === 'prompt' ? 't-prompt' : `t-${type}`;
      line.textContent = text;
      demo.appendChild(line);
      demo.scrollTop = demo.scrollHeight;
    }, delay);
  });
}

// ── Contact Form ───────────────────────────────────────────
function handleContactForm(e) {
  e.preventDefault();
  const form    = e.target;
  const success = document.getElementById('form-success');
  const btn     = document.getElementById('send-msg-btn');

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Simulate async send
  setTimeout(() => {
    form.reset();
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    if (success) { success.style.display = 'block'; }
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      if (success) { success.style.display = 'none'; }
    }, 4000);
  }, 1200);
}
// Expose to HTML
window.handleContactForm = handleContactForm;

// ── Skill tag hover sparkle ────────────────────────────────
function addTagHover() {
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-2px) scale(1.06)';
    });
    tag.addEventListener('mouseout', function() {
      this.style.transform = '';
    });
  });
}

// ── Glitch effect on hero name ─────────────────────────────
function initGlitch() {
  const name = document.querySelector('.hero-name');
  if (!name) return;
  setInterval(() => {
    if (Math.random() > 0.93) {
      name.style.textShadow = '2px 0 var(--cyan), -2px 0 var(--green)';
      setTimeout(() => { name.style.textShadow = ''; }, 80);
    }
  }, 1500);
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Start typing effect
  setTimeout(typeEffect, 800);

  // Reveal items already in viewport
  revealOnScroll();

  // Attach scroll listeners
  window.addEventListener('scroll', () => {
    handleNavbar();
    revealOnScroll();
    handleBackTop();
    updateActiveNav();
  }, { passive: true });

  // Build terminal
  buildTerminalDemo();

  // Extras
  addTagHover();
  initGlitch();
});
