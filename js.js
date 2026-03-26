
// --- 2. SELECTORS ---
const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const layoutPopup = document.getElementById("layout-popup");
const memberModal = document.getElementById("member-modal");
const closeBtn = document.getElementById("close-btn");

// --- 3. FUNCTIONS ---

const toggleSidebar = (show) => {
  if (!sidebar || !overlay) return;
  sidebar.classList.toggle("active", show);
  overlay.classList.toggle("active", show);
  if (menuIcon) menuIcon.className = show ? "fas fa-times" : "fas fa-bars";
};

const openMemberModal = (id) => {
  const data = teamMembersData[id];
  if (!data || !memberModal) return;

  document.getElementById("modal-img").src = data.img;
  document.getElementById("modal-name").innerText = data.name;
  document.getElementById("modal-role").innerText = data.role;

  memberModal.classList.add("active");
  overlay?.classList.add("active");
};

const generateLevels = () => {
  const container = document.getElementById("levels-container");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 1; i <= 98; i++) {
    const div = document.createElement("div");
    div.className = "level-card";
    div.innerHTML = `
            <span style="color:var(--primary-light); font-weight:800; font-size:0.8rem;">LEVEL ${i}</span>
            <h3 style="margin: 8px 0; color:white;">Logic Building Part ${i}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Step-by-step coding mastery.</p>
            <a href="#" class="watch-btn"><i class="fas fa-play-circle"></i> Watch Video</a>
        `;
    container.appendChild(div);
  }
};

// --- 4. EVENT INITIALIZATION ---

document.addEventListener("DOMContentLoaded", () => {
  generateLevels();

  // Sidebar Toggle
  menuIcon?.addEventListener("click", () =>
    toggleSidebar(!sidebar.classList.contains("active")),
  );
  closeBtn?.addEventListener("click", () => toggleSidebar(false));
  overlay?.addEventListener("click", () => {
    toggleSidebar(false);
    memberModal?.classList.remove("active");
    layoutPopup?.classList.remove("active");
  });

  // Navigation Logic
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-page");

      document
        .getElementById("team-page")
        ?.classList.toggle("hidden", targetId !== "team-page");
      document
        .getElementById("levels-page")
        ?.classList.toggle("hidden", targetId !== "levels-page");
      document
        .querySelector(".intro-text-block")
        ?.classList.toggle("hidden", targetId !== "team-page");

      toggleSidebar(false);
    });
  });

  // Member Card Clicks
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const memberId = card.getAttribute("data-member");
      if (memberId) openMemberModal(memberId);
    });
  });

  // Layout Buttons
  document.getElementById("btn-left")?.addEventListener("click", () => {
    document.body.classList.remove("layout-right");
    sessionStorage.setItem("userLayout", "left");
    layoutPopup?.classList.remove("active");
    overlay?.classList.remove("active");
  });

  document.getElementById("btn-right")?.addEventListener("click", () => {
    document.body.classList.add("layout-right");
    sessionStorage.setItem("userLayout", "right");
    layoutPopup?.classList.remove("active");
    overlay?.classList.remove("active");
  });

  document.getElementById("switch-side-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("layout-right");
    const mode = document.body.classList.contains("layout-right")
      ? "right"
      : "left";
    sessionStorage.setItem("userLayout", mode);
    toggleSidebar(false);
  });

  // Initial Layout Check
  const savedLayout = sessionStorage.getItem("userLayout");
  if (window.innerWidth >= 1024) {
    if (savedLayout) {
      document.body.classList.toggle("layout-right", savedLayout === "right");
    } else {
      layoutPopup?.classList.add("active");
      overlay?.classList.add("active");
    }
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
