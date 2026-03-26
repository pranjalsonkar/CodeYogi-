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

// --- 3. SIDEBAR NAVIGATION CONTROLS ---
const openSidebar = () => {
  console.log("Opening Explorer Sidebar...");
  sidebar.classList.add("active");
  overlay.classList.add("active");
};

const closeSidebar = () => {
  console.log("Closing Sidebar...");
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
};

if (menuIcon) menuIcon.onclick = openSidebar;
if (closeBtn) closeBtn.onclick = closeSidebar;

// Overlay click to dismiss UI elements
overlay.onclick = () => {
  closeSidebar();
  if (layoutPopup) layoutPopup.classList.remove("active");
  if (memberModal) memberModal.classList.remove("active");
};

// --- 4. ANIMATION & UI EFFECTS ---
if (cyText) {
  cyText.onclick = () => {
    console.log("Logo animation triggered.");
    cyText.classList.add("clicked");
    setTimeout(() => cyText.classList.remove("clicked"), 1000);
  };
}

// --- 5. DESKTOP LAYOUT ENGINE ---
function applyLayout(choice) {
  if (!teamPage) return;
  console.log(`Applying Layout Choice: ${choice}`);

  teamPage.classList.add("layout-active");
  if (choice === "right") {
    teamPage.classList.add("reverse-layout");
  } else {
    teamPage.classList.remove("reverse-layout");
  }
}

// Sidebar Manual Switcher
if (switchBtn) {
  switchBtn.onclick = (e) => {
    e.preventDefault();
    const isCurrentlyReverse = teamPage.classList.contains("reverse-layout");
    const nextMode = isCurrentlyReverse ? "left" : "right";
    applyLayout(nextMode);
    sessionStorage.setItem("userLayout", nextMode);
    closeSidebar();
  };
}

// Handle Popup Choice
const setupPopupButton = (id, choice) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.onclick = () => {
      applyLayout(choice);
      sessionStorage.setItem("userLayout", choice);
      if (layoutPopup) layoutPopup.classList.remove("active");
    };
  }
};

setupPopupButton("btn-left", "left");
setupPopupButton("btn-right", "right");

// --- 6. PAGE ROUTING SYSTEM ---
const navigateTo = (targetId) => {
  console.log(`Navigating to: ${targetId}`);

  // UI Cleanup
  teamPage.classList.add("hidden");
  levelsPage.classList.add("hidden");
  if (introSection) introSection.classList.add("hidden");

  // Route Logic
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove("hidden");
    // Specific logic for team page dependencies
    if (targetId === "team-page" && introSection) {
      introSection.classList.remove("hidden");
    }
  }
};

navLinks.forEach((link) => {
  link.onclick = (e) => {
    const pageId = link.getAttribute("data-page");
    if (!pageId) return;

    e.preventDefault();

    // Active Class Handling (For Shadow/Pop effect)
    navLinks.forEach((l) => l.classList.remove("active-link"));
    link.classList.add("active-link");

    navigateTo(pageId);
    closeSidebar();
  };
});

// --- 7. MEMBER MODAL HANDLER ---
const initializeModal = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.onclick = () => {
      const memberId = card.getAttribute("data-member");
      const details = teamMembersData[memberId];

      if (details && memberModal) {
        console.log(`Displaying profile for: ${details.name}`);
        document.getElementById("modal-img").src = details.img;
        document.getElementById("modal-name").innerText = details.name;
        document.getElementById("modal-role").innerText = details.role;
        document.getElementById("modal-whatsapp").href = details.whatsapp;
        document.getElementById("modal-telegram").href = details.telegram;
        memberModal.classList.add("active");
      }
    };
  });
};

const closeModalBtn = document.querySelector(".close-button");
if (closeModalBtn && memberModal) {
  closeModalBtn.onclick = () => {
    memberModal.classList.remove("active");
  };
}

// --- 8. INITIALIZATION ENGINE ---
const runInitialization = () => {
  console.log("System Initializing...");

  const savedLayout = sessionStorage.getItem("userLayout");
  const viewportWidth = window.innerWidth;

  // Restore Layout Preferences
  if (viewportWidth >= 1024) {
    if (savedLayout) {
      applyLayout(savedLayout);
    } else if (layoutPopup) {
      layoutPopup.classList.add("active");
    }
  }

  // Set Default Active Link
  if (navLinks.length > 0) {
    navLinks[0].classList.add("active-link");
  }

  initializeModal();
  console.log("System Ready.");
};

// Event Trigger
document.addEventListener("DOMContentLoaded", runInitialization);
// --- Elements Selection & Data ---
// ... (Aapka purana teamMembersData yahan rahega) ...

const generateLevels = () => {
  const container = document.getElementById("levels-container");
  if (!container) return;
  for (let i = 1; i <= 98; i++) {
    const div = document.createElement("div");
    div.className = "level-card";
    div.innerHTML = `
            <span style="background:#1e1b4b; color:#a78bfa; padding:4px 12px; border-radius:20px; font-size:0.8rem;">LEVEL ${i}</span>
            <h3 style="margin:15px 0;">Coding Logic Part ${i}</h3>
            <a href="https://www.youtube.com/@CodeYogi" target="_blank" class="watch-btn"><i class="fas fa-play"></i> Watch Now</a>
        `;
    container.appendChild(div);
  }
};

// --- Page Routing ---
navLinks.forEach((link) => {
  link.onclick = (e) => {
    const targetId = link.getAttribute("data-page");
    if (!targetId) return;
    e.preventDefault();

    // Active Link Effect
    navLinks.forEach((l) => l.classList.remove("active-link"));
    link.classList.add("active-link");

    // Switch Pages
    document.getElementById("team-page").classList.add("hidden");
    document.getElementById("levels-page").classList.add("hidden");
    if (introSection) introSection.classList.add("hidden");

    const target = document.getElementById(targetId);
    if (target) {
      target.classList.remove("hidden");
      if (targetId === "team-page") introSection.classList.remove("hidden");
    }
    closeSidebar();
  };
});

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  generateLevels();
  runInitialization(); // Aapka purana layout restore logic
});

function hide() {
  let heading = document.getElementById("xyz");

  heading.style.visibility = "remove";
}
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
