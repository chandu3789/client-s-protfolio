/* ===================================================================
   PERURI REVANTH - PORTFOLIO INTERACTIVITY SCRIPT
   Clean, User-Friendly Functionality Inspired by tarunkomati.in
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // 1. THEME SWITCHER (Dark / Light Mode)
  // -------------------------------------------------------------
  const switchThemeBtn = document.getElementById('switchTheme');
  const themeIcon = document.getElementById('themeIcon');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      themeIcon.className = 'bi bi-brightness-high-fill';
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill';
    }
  }

  // Initialize theme
  setTheme(currentTheme);

  if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
      const activeTheme = document.body.getAttribute('data-bs-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode ✨`);
    });
  }

  // -------------------------------------------------------------
  // 2. MOBILE DRAWER NAVIGATION
  // -------------------------------------------------------------
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('show');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('show');
  }

  if (mobileNavToggle) mobileNavToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // -------------------------------------------------------------
  // 3. NAVBAR SCROLLSPY (Highlight active link on scroll)
  // -------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // -------------------------------------------------------------
  // 4. RESUME MODAL
  // -------------------------------------------------------------
  const resumeModal = document.getElementById('resumeModal');
  const resumeTriggers = document.querySelectorAll('.resume-modal-trigger');
  const closeResumeModal = document.getElementById('closeResumeModal');

  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      if (resumeModal) {
        resumeModal.classList.add('open');
      }
    });
  });

  if (closeResumeModal && resumeModal) {
    closeResumeModal.addEventListener('click', () => {
      resumeModal.classList.remove('open');
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('open');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
        resumeModal.classList.remove('open');
      }
    });
  }

  // -------------------------------------------------------------
  // 5. CONTACT FORM
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('name').value;
      showToast(`Thank you, ${senderName}! Your message has been received.`);
      contactForm.reset();
    });
  }

});

// -------------------------------------------------------------
// 6. GLOBAL UTILITY: COPY TO CLIPBOARD & TOAST
// -------------------------------------------------------------
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied to clipboard: ${text} 📋`);
  }).catch(() => {
    showToast(`Failed to copy`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// -------------------------------------------------------------
// 7. INTERACTIVE PROJECT PREVIEWS (Groq AI & Hashtag AI)
// -------------------------------------------------------------
function simulateTriage() {
  const container = document.getElementById('demoContainer');
  const title = document.getElementById('demoTitle');
  const content = document.getElementById('demoContent');

  if (!container || !content) return;

  container.style.display = 'block';
  title.innerHTML = '<i class="bi bi-shield-check"></i> Bug Bounty Platform &mdash; Groq AI Triage Simulator';

  content.innerHTML = `
    <div style="font-size: 0.92rem; color: var(--muted-text); margin-bottom: 14px;">
      Select a vulnerability sample to see real-time automated report triage powered by <strong>Groq AI API</strong>:
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
      <button class="btn btn-sm secondary-bg-btn" onclick="runAiSample('sqli')">SQL Injection in /api/auth</button>
      <button class="btn btn-sm secondary-bg-btn" onclick="runAiSample('idor')">IDOR in User Profile API</button>
      <button class="btn btn-sm secondary-bg-btn" onclick="runAiSample('xss')">Stored XSS in Bio Field</button>
    </div>
    <div id="aiSampleOutput" style="background: var(--bg-secondary); border: 1px solid var(--card-border); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 0.85rem;">
      <div style="color: var(--secondary-color); font-weight: bold; margin-bottom: 6px;">[AI Triage Output &bull; Groq LPU: 0.12s latency]</div>
      <div style="color: var(--text-color);">Payload: POST /api/v1/auth/login with unsanitized parameters</div>
      <div style="margin-top: 6px; color: #10b981;">&bull; Severity: <strong>CRITICAL (CVSS: 9.8)</strong></div>
      <div style="color: var(--muted-text); margin-top: 4px;">&bull; Recommendation: Parameterized queries, ORM sanitization, and immediate privilege revocation.</div>
    </div>
  `;

  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function runAiSample(type) {
  const output = document.getElementById('aiSampleOutput');
  if (!output) return;

  if (type === 'sqli') {
    output.innerHTML = `
      <div style="color: var(--secondary-color); font-weight: bold; margin-bottom: 6px;">[AI Triage Output &bull; Groq LPU: 0.12s latency]</div>
      <div style="color: var(--text-color);">Payload: POST /api/v1/auth/login with unsanitized SQL injection</div>
      <div style="margin-top: 6px; color: #f43f5e;">&bull; Severity: <strong>CRITICAL (CVSS: 9.8)</strong></div>
      <div style="color: var(--muted-text); margin-top: 4px;">&bull; Recommendation: Parameterize all database calls. Authentication bypass vulnerability flagged for immediate patch.</div>
    `;
  } else if (type === 'idor') {
    output.innerHTML = `
      <div style="color: var(--secondary-color); font-weight: bold; margin-bottom: 6px;">[AI Triage Output &bull; Groq LPU: 0.14s latency]</div>
      <div style="color: var(--text-color);">Payload: GET /api/v1/users/8921/billing with mismatched JWT identity claim</div>
      <div style="margin-top: 6px; color: #f59e0b;">&bull; Severity: <strong>HIGH (CVSS: 8.5)</strong></div>
      <div style="color: var(--muted-text); margin-top: 4px;">&bull; Recommendation: Implement RBAC authorization middleware to ensure user ID matches token context.</div>
    `;
  } else if (type === 'xss') {
    output.innerHTML = `
      <div style="color: var(--secondary-color); font-weight: bold; margin-bottom: 6px;">[AI Triage Output &bull; Groq LPU: 0.11s latency]</div>
      <div style="color: var(--text-color);">Payload: POST /api/researcher/profile with unescaped HTML script tags</div>
      <div style="margin-top: 6px; color: #f59e0b;">&bull; Severity: <strong>HIGH (CVSS: 7.6)</strong></div>
      <div style="color: var(--muted-text); margin-top: 4px;">&bull; Recommendation: Sanitize user input with DOMPurify and enable strict Content-Security-Policy (CSP).</div>
    `;
  }
}

function simulateHashtag() {
  const container = document.getElementById('demoContainer');
  const title = document.getElementById('demoTitle');
  const content = document.getElementById('demoContent');

  if (!container || !content) return;

  container.style.display = 'block';
  title.innerHTML = '<i class="bi bi-hash"></i> Hashtag Generator &mdash; Live AI &amp; NLP Tool';

  content.innerHTML = `
    <div style="font-size: 0.92rem; color: var(--muted-text); margin-bottom: 14px;">
      Type your content theme or select a preset to generate context-aware hashtags and captions:
    </div>
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <input type="text" id="customTopicInput" class="form-control" value="Parul University Tech Hackathon 2026 AI solutions" style="font-size: 0.88rem;">
      <button class="btn primary-bg-btn btn-sm" onclick="generateCustomTags()">Generate</button>
    </div>
    <div id="hashtagOutputBox" style="background: var(--bg-secondary); border: 1px solid var(--card-border); border-radius: 8px; padding: 16px;">
      <div style="font-style: italic; color: var(--text-color); margin-bottom: 10px;">
        "Innovating the future with code and AI! Building next-generation solutions at Parul University 🚀⚡"
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
        <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#ParulUniversity')">#ParulUniversity</span>
        <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#Hackathon2026')">#Hackathon2026</span>
        <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#FullStackDev')">#FullStackDev</span>
        <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#PythonAI')">#PythonAI</span>
        <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#CodeInnovation')">#CodeInnovation</span>
      </div>
      <button class="btn btn-sm secondary-bg-btn" onclick="copyText('#ParulUniversity #Hackathon2026 #FullStackDev #PythonAI #CodeInnovation')">
        <i class="bi bi-copy"></i> Copy All Hashtags
      </button>
    </div>
  `;

  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateCustomTags() {
  const input = document.getElementById('customTopicInput');
  const box = document.getElementById('hashtagOutputBox');
  if (!input || !box) return;

  const val = input.value || 'Technology and software development';
  box.innerHTML = `
    <div style="font-style: italic; color: var(--text-color); margin-bottom: 10px;">
      "Dedicated to continuous growth, clean architecture, and building software that makes an impact ✨💻"
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
      <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#SoftwareEngineer')">#SoftwareEngineer</span>
      <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#DeveloperJourney')">#DeveloperJourney</span>
      <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#PythonJava')">#PythonJava</span>
      <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#CleanCode')">#CleanCode</span>
      <span class="badge-grade" style="cursor: pointer;" onclick="copyText('#Tech2026')">#Tech2026</span>
    </div>
    <button class="btn btn-sm secondary-bg-btn" onclick="copyText('#SoftwareEngineer #DeveloperJourney #PythonJava #CleanCode #Tech2026')">
      <i class="bi bi-copy"></i> Copy All Hashtags
    </button>
  `;
  showToast('Generated fresh context-aware hashtags! 🚀');
}

function closeDemo() {
  const container = document.getElementById('demoContainer');
  if (container) {
    container.style.display = 'none';
  }
}
