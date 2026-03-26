// --- 1. GLOBAL ELEMENTS SELECTION ---
const menuIcon = document.getElementById("menu-icon");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const navLinks = document.querySelectorAll(".nav-link");
const teamPage = document.getElementById("team-page");
const levelsPage = document.getElementById("levels-page");
const introSection =
  document.querySelector(".intro-text-block") ||
  document.querySelector(".codiyogi-intro");
const cyText = document.getElementById("cy-text");
const switchBtn = document.getElementById("switch-side-btn");
const memberModal = document.getElementById("member-modal");
const layoutPopup = document.getElementById("layout-popup");


// --- 3. SIDEBAR & ICON SWITCH LOGIC ---
const toggleSidebar = (forceClose = false) => {
  const isActive = sidebar.classList.contains("active");

  if (isActive || forceClose) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuIcon.classList.replace("fa-times", "fa-bars");
  } else {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    menuIcon.classList.replace("fa-bars", "fa-times");
  }
};

if (menuIcon) menuIcon.onclick = () => toggleSidebar();
if (closeBtn) closeBtn.onclick = () => toggleSidebar(true);
overlay.onclick = () => {
  toggleSidebar(true);
  if (layoutPopup) layoutPopup.classList.remove("active");
  if (memberModal) memberModal.classList.remove("active");
};

// --- 4. DESKTOP LAYOUT ENGINE (Image Left/Right) ---
function applyLayout(choice) {
  if (choice === "right") {
    document.body.classList.add("layout-right");
  } else {
    document.body.classList.remove("layout-right");
  }
  sessionStorage.setItem("userLayout", choice);
}

// Sidebar Switcher
if (switchBtn) {
  switchBtn.onclick = (e) => {
    e.preventDefault();
    const isCurrentlyRight = document.body.classList.contains("layout-right");
    applyLayout(isCurrentlyRight ? "left" : "right");
    toggleSidebar(true);
  };
}

// Popup Buttons
document.getElementById("btn-left")?.addEventListener("click", () => {
  applyLayout("left");
  layoutPopup.classList.remove("active");
});
document.getElementById("btn-right")?.addEventListener("click", () => {
  applyLayout("right");
  layoutPopup.classList.remove("active");
});

// --- 5. PAGE ROUTING SYSTEM ---
const navigateTo = (targetId) => {
  teamPage.classList.add("hidden");
  levelsPage.classList.add("hidden");
  if (introSection) introSection.classList.add("hidden");

  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove("hidden");
    if (targetId === "team-page" && introSection)
      introSection.classList.remove("hidden");
  }
};

navLinks.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    const pageId = link.getAttribute("data-page");
    navLinks.forEach((l) => l.classList.remove("active-link"));
    link.classList.add("active-link");
    navigateTo(pageId);
    toggleSidebar(true);
  };
});

// --- 6. LEVELS GENERATOR (1 to 98) ---
const generateLevels = () => {
  const container = document.getElementById("levels-container");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 1; i <= 98; i++) {
    const div = document.createElement("div");
    div.className = "level-card";
    div.innerHTML = `
        <span class="lvl-badge">LEVEL ${i}</span>
        <h3>Coding Logic Part ${i}</h3>
        <a href="https://www.youtube.com/@CodeYogi" target="_blank" class="watch-btn"><i class="fas fa-play"></i> Watch Now</a>
    `;
    container.appendChild(div);
  }
};

// --- 7. MODAL HANDLER ---
const initializeModal = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.onclick = () => {
      const memberId = card.getAttribute("data-member");
      const details = teamMembersData[memberId];
      if (details && memberModal) {
        document.getElementById("modal-img").src = details.img;
        document.getElementById("modal-name").innerText = details.name;
        document.getElementById("modal-role").innerText = details.role;
        memberModal.classList.add("active");
      }
    };
  });
};

document.querySelector(".close-button")?.addEventListener("click", () => {
  memberModal.classList.remove("active");
});

// --- 8. INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  generateLevels();
  initializeModal();

  const savedLayout = sessionStorage.getItem("userLayout");
  if (window.innerWidth >= 1024) {
    if (savedLayout) applyLayout(savedLayout);
    else if (layoutPopup) layoutPopup.classList.add("active");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) toggleSidebar(true);
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
