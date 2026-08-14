/* ========================================
   ARUN SINGH — PORTFOLIO INTERACTIONS & CONTROLS
   ======================================== */

// ─── 1. TOP FLOATING PILL NAVIGATION SCROLLSPY & SMOOTH SCROLL ─────────────────
const pillNavLinks = document.querySelectorAll('.pill-nav-link');
const sections = document.querySelectorAll('main section[id], #about');

function updateActiveNavOnScroll() {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      pillNavLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${sectionId}` || link.dataset.section === sectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });

  if (window.scrollY < 200) {
    pillNavLinks.forEach((link) => {
      if (link.getAttribute('href') === '#hero' || link.dataset.section === 'hero') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });

pillNavLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      pillNavLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');

      const headerOffset = 70;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ─── 3. FEATURED PROJECTS — MANUAL LEFT / RIGHT ARROW CONTROLS ─────────────────
const projPrevBtn = document.getElementById('proj-prev-btn');
const projNextBtn = document.getElementById('proj-next-btn');
const projTrack = document.getElementById('projects-marquee-track');
const projContainer = document.getElementById('projects-scroll-container');

let currentManualOffset = 0;
let isManualOverride = false;
let resumeTimer = null;

function scrollProjects(direction) {
  const cardWidth = 440; // Card width + gap

  if (!isManualOverride) {
    isManualOverride = true;
    projTrack.style.animationPlayState = 'paused';
  }

  currentManualOffset += direction * cardWidth;
  projTrack.style.transform = `translateX(${currentManualOffset}px)`;

  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    projTrack.style.transform = '';
    projTrack.style.animationPlayState = 'running';
    currentManualOffset = 0;
    isManualOverride = false;
  }, 7000);
}

if (projPrevBtn) {
  projPrevBtn.addEventListener('click', () => scrollProjects(1));
}
if (projNextBtn) {
  projNextBtn.addEventListener('click', () => scrollProjects(-1));
}


// ─── 5. FEATURED PROJECTS — REFERENCE PILL FILTER MENU ────────────────────────
const projFilterBtns = document.querySelectorAll('.proj-pill-btn');
const projectCards = document.querySelectorAll('.project-card-anim');

projFilterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    projFilterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.display = 'flex';
      } else {
        card.style.opacity = '0.35';
        card.style.transform = 'scale(0.96)';
      }
    });
  });
});


// ─── Scroll Reveal Observer ──────────────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));


// ─── Use Case & Interactive Tabs ─────────────────────────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.usecase-panel');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tabIndex = btn.dataset.tab;

    tabBtns.forEach((b) => b.classList.remove('tab-btn--active'));
    btn.classList.add('tab-btn--active');

    panels.forEach((panel) => {
      panel.classList.remove('usecase-panel--active', 'anim-in');
    });

    const target = document.querySelector(`[data-panel="${tabIndex}"]`);
    if (target) {
      target.classList.add('usecase-panel--active');
      void target.offsetWidth;
      target.classList.add('anim-in');
    }
  });
});


// ─── Mobile Navigation Toggle ────────────────────────────────────────────────
const burgerBtn = document.getElementById('burger-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileOverlay = document.getElementById('mobile-nav-overlay');
const mobileClose = document.getElementById('mobile-nav-close');

function openMobileNav() {
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (burgerBtn) burgerBtn.addEventListener('click', openMobileNav);
if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

document.querySelectorAll('.mobile-nav-list a').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});


// ─── Sticky Header Shadow on Scroll ──────────────────────────────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 12) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
    header.style.background = 'rgba(255, 255, 255, 0.94)';
  } else {
    header.style.boxShadow = '';
    header.style.background = 'rgba(255, 255, 255, 0.88)';
  }
}, { passive: true });


// ─── Hover Pause for Marquees ────────────────────────────────────────────────
const projectTrack = document.querySelector('.projects-marquee-track');
if (projectTrack) {
  projectTrack.addEventListener('mouseenter', () => {
    projectTrack.style.animationPlayState = 'paused';
  });
  projectTrack.addEventListener('mouseleave', () => {
    if (!isManualOverride) {
      projectTrack.style.animationPlayState = 'running';
    }
  });
}

const techTrack = document.querySelector('.tech-marquee-track');
if (techTrack) {
  techTrack.addEventListener('mouseenter', () => {
    techTrack.style.animationPlayState = 'paused';
  });
  techTrack.addEventListener('mouseleave', () => {
    techTrack.style.animationPlayState = 'running';
  });
}


// ─── Mouse Parallax on Hero Color Blobs ──────────────────────────────────────
const heroSection = document.querySelector('.hero');
const blobs = document.querySelectorAll('.hero-blob');

if (heroSection && window.matchMedia('(pointer: fine)').matches) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;

    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 9;
      blob.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    blobs.forEach((blob) => { blob.style.transform = ''; });
  });
}


// ─── Initial Page Load Animations ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-up').forEach((el) => {
      el.classList.add('visible');
    });
  }, 100);
});
