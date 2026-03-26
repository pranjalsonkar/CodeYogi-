
// --- 2. GLOBAL SELECTORS ---
const elements = {
  menuIcon: document.getElementById("menu-icon"),
  sidebar: document.getElementById("sidebar"),
  overlay: document.getElementById("overlay"),
  layoutPopup: document.getElementById("layout-popup"),
  memberModal: document.getElementById("member-modal"),
  closeBtn: document.getElementById("close-btn"),
  navLinks: document.querySelectorAll(".nav-link"),
  teamPage: document.getElementById("team-page"),
  levelsPage: document.getElementById("levels-page"),
  introSection:
    document.querySelector(".intro-text-block") ||
    document.querySelector(".codiyogi-intro"),
  cyText: document.getElementById("cy-text"),
  levelsContainer: document.getElementById("levels-container"),
  closeModalBtn: document.querySelector(".close-button"),
  switchBtn: document.getElementById("switch-side-btn"),
};

// --- 3. CORE UI CONTROLS ---
const toggleSidebar = (show) => {
  if (!elements.sidebar || !elements.overlay) return;
  elements.sidebar.classList.toggle("active", show);
  elements.overlay.classList.toggle("active", show);

  if (elements.menuIcon) {
    elements.menuIcon.className = show ? "fas fa-times" : "fas fa-bars";
  }
};

const navigateTo = (targetId) => {
  console.log(`Navigating to: ${targetId}`);

  // Hide all main sections
  [elements.teamPage, elements.levelsPage, elements.introSection].forEach(
    (el) => {
      el?.classList.add("hidden");
    },
  );

  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove("hidden");
    // Special Rule: Intro section only shows on Team Page
    if (targetId === "team-page" && elements.introSection) {
      elements.introSection.classList.remove("hidden");
    }
  }
};

// --- 4. LAYOUT ENGINE ---
const applyLayout = (choice) => {
  if (!elements.teamPage) return;

  if (choice === "right") {
    document.body.classList.add("layout-right");
    elements.teamPage.classList.add("reverse-layout");
  } else {
    document.body.classList.remove("layout-right");
    elements.teamPage.classList.remove("reverse-layout");
  }

  elements.teamPage.classList.add("layout-active");
  sessionStorage.setItem("userLayout", choice);
};

// --- 5. COMPONENT GENERATORS ---
const generateLevels = () => {
  if (!elements.levelsContainer) return;
  elements.levelsContainer.innerHTML = "";

  for (let i = 1; i <= 98; i++) {
    const div = document.createElement("div");
    div.className = "level-card";
    div.innerHTML = `
      <span class="lvl-badge" style="background:rgba(124, 58, 237, 0.1); color:#a78bfa; padding:5px 15px; border-radius:20px; font-weight:bold; font-size:0.8rem;">LEVEL ${i}</span>
      <h3 style="margin: 15px 0;">Coding Logic Part ${i}</h3>
      <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:15px;">Master logic building and problem solving.</p>
      <a href="https://www.youtube.com/@CodeYogi" target="_blank" class="watch-btn" style="text-decoration:none; color:#a78bfa; font-weight:bold;">
          <i class="fas fa-play-circle"></i> Watch Now
      </a>
    `;
    elements.levelsContainer.appendChild(div);
  }
};

// --- 6. MODAL & INTERACTION HANDLERS ---
const openMemberModal = (id) => {
  const data = teamMembersData[id];
  if (!data || !elements.memberModal) return;

  document.getElementById("modal-img").src = data.img;
  document.getElementById("modal-name").innerText = data.name;
  document.getElementById("modal-role").innerText = data.role;
  document.getElementById("modal-whatsapp").href = data.whatsapp || "#";
  document.getElementById("modal-telegram").href = data.telegram || "#";

  elements.memberModal.classList.add("active");
  elements.overlay?.classList.add("active");
};

// --- 7. INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  generateLevels();

  // Sidebar Logic
  elements.menuIcon?.addEventListener("click", () => toggleSidebar(true));
  elements.closeBtn?.addEventListener("click", () => toggleSidebar(false));

  // Overlay Click (Closes all Popups)
  elements.overlay?.addEventListener("click", () => {
    toggleSidebar(false);
    elements.memberModal?.classList.remove("active");
    elements.layoutPopup?.classList.remove("active");
  });

  // Navigation Routing
  elements.navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-page");

      elements.navLinks.forEach((l) => l.classList.remove("active-link"));
      link.classList.add("active-link");

      navigateTo(targetId);
      toggleSidebar(false);
    });
  });

  // Team Member Clicks
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const memberId = card.getAttribute("data-member");
      if (memberId) openMemberModal(memberId);
    });
  });

  // Modal Close
  elements.closeModalBtn?.addEventListener("click", () => {
    elements.memberModal?.classList.remove("active");
    elements.overlay?.classList.remove("active");
  });

  // Layout Buttons (Popup)
  ["btn-left", "btn-right"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => {
        const side = id === "btn-left" ? "left" : "right";
        applyLayout(side);
        elements.layoutPopup?.classList.remove("active");
        elements.overlay?.classList.remove("active");
      };
    }
  });

  // Sidebar Switcher Button
  elements.switchBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const isCurrentlyRight = document.body.classList.contains("layout-right");
    applyLayout(isCurrentlyRight ? "left" : "right");
    toggleSidebar(false);
  });

  // Logo Animation
  elements.cyText?.addEventListener("click", () => {
    elements.cyText.classList.add("clicked");
    elements.cyText.style.transform = "scale(0.9)";
    setTimeout(() => {
      elements.cyText.classList.remove("clicked");
      elements.cyText.style.transform = "scale(1)";
    }, 200);
  });

  // Startup Preferences
  const savedLayout = sessionStorage.getItem("userLayout");
  if (window.innerWidth >= 1024) {
    if (savedLayout) {
      applyLayout(savedLayout);
    } else {
      elements.layoutPopup?.classList.add("active");
      elements.overlay?.classList.add("active");
    }
  }

  // Default Active State
  if (elements.navLinks.length > 0)
    elements.navLinks[0].classList.add("active-link");
});

// Resizing Cleanup
window.addEventListener("resize", () => {
  if (
    window.innerWidth > 768 &&
    elements.sidebar?.classList.contains("active")
  ) {
    toggleSidebar(false);
  }
});
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Aapka bataya hua order
const dayOrder = [
  "sp.css",
  "srl.css",
  "style.css",
  "styl.css",
  "styls.css",
  "src.css",
  "styles.css",
];
const nightOrder = [
  "sp.css",
  "style.css",
  "styles.css",
  "styls.css",
  "src.css",
  "srl.css",
  "styl.css",
];

let isNight = false;

themeToggle.addEventListener("click", () => {
  isNight = !isNight;

  // Purani CSS files ko dhoond kar hatana
  const currentLinks = document.querySelectorAll('link[rel="stylesheet"]');
  currentLinks.forEach((link) => {
    // Font-awesome ko chhod kar baaki hatayein
    if (!link.href.includes("cdnjs.cloudflare.com")) {
      link.remove();
    }
  });

  // Nayi files ko sahi order mein add karna
  const activeOrder = isNight ? nightOrder : dayOrder;

  activeOrder.forEach((fileName) => {
    const newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = fileName;
    document.head.appendChild(newLink);
  });

  // Icon aur color change karna
  if (isNight) {
    themeIcon.className = "fas fa-sun";
    themeIcon.style.color = "#fbbf24"; // Yellow for sun
    themeToggle.style.transform = "rotate(360deg)";
  } else {
    themeIcon.className = "fas fa-moon";
    themeIcon.style.color = "#7c3aed"; // Purple for moon
    themeToggle.style.transform = "rotate(0deg)";
  }
});
