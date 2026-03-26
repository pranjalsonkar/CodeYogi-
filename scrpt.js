// --- 2. SELECTORS ---
const menuIcon = document.getElementById("menu-icon");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const navLinks = document.querySelectorAll(".nav-link");
const layoutPopup = document.getElementById("layout-popup");
const memberModal = document.getElementById("member-modal");

// --- 3. SIDEBAR CONTROLS ---
const toggleSidebar = (isOpen) => {
  sidebar.classList.toggle("active", isOpen);
  overlay.classList.toggle("active", isOpen);
};

menuIcon.onclick = () => toggleSidebar(true);
closeBtn.onclick = () => toggleSidebar(false);
overlay.onclick = () => {
  toggleSidebar(false);
  layoutPopup.classList.remove("active");
  memberModal.classList.remove("active");
};

// --- 4. LAYOUT ENGINE ---
function setSidePreference(side) {
  if (side === "right") {
    document.body.classList.add("layout-right");
  } else {
    document.body.classList.remove("layout-right");
  }
  sessionStorage.setItem("userLayout", side);
}

document.getElementById("btn-left").onclick = () => {
  setSidePreference("left");
  layoutPopup.classList.remove("active");
};
document.getElementById("btn-right").onclick = () => {
  setSidePreference("right");
  layoutPopup.classList.remove("active");
};

document.getElementById("switch-side-btn").onclick = (e) => {
  e.preventDefault();
  const isCurrentlyRight = document.body.classList.contains("layout-right");
  setSidePreference(isCurrentlyRight ? "left" : "right");
  toggleSidebar(false);
};

// --- 5. NAVIGATION ---
navLinks.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute("data-page");

    // UI Switch
    document.getElementById("team-page").classList.add("hidden");
    document.getElementById("levels-page").classList.add("hidden");
    document.querySelector(".intro-text-block").classList.add("hidden");

    document.getElementById(targetPage).classList.remove("hidden");
    if (targetPage === "team-page")
      document.querySelector(".intro-text-block").classList.remove("hidden");

    navLinks.forEach((l) => l.classList.remove("active-link"));
    link.classList.add("active-link");
    toggleSidebar(false);
  };
});

// --- 6. LEVELS GENERATOR (1 to 98) ---
const generateLevels = () => {
  const container = document.getElementById("levels-container");
  if (!container) return;
  for (let i = 1; i <= 98; i++) {
    const div = document.createElement("div");
    div.className = "level-card";
    div.innerHTML = `
      <span style="color:var(--primary); font-weight:bold;">LEVEL ${i}</span>
      <h3 style="margin-top:10px;">Coding Logic Part ${i}</h3>
      <a href="https://www.youtube.com/@CodeYogi" target="_blank" class="watch-btn"><i class="fas fa-play"></i> Watch Now</a>
    `;
    container.appendChild(div);
  }
};

// --- 7. PROFILE MODAL ---
document.querySelectorAll(".card").forEach((card) => {
  card.onclick = () => {
    const id = card.getAttribute("data-member");
    const data = teamMembersData[id];
    if (data) {
      document.getElementById("modal-img").src = data.img;
      document.getElementById("modal-name").innerText = data.name;
      document.getElementById("modal-role").innerText = data.role;
      document.getElementById("modal-whatsapp").href = data.whatsapp;
      document.getElementById("modal-telegram").href = data.telegram;
      memberModal.classList.add("active");
      overlay.classList.add("active");
    }
  };
});

document.querySelector(".close-button").onclick = () => {
  memberModal.classList.remove("active");
  overlay.classList.remove("active");
};

// --- 8. INITIALIZE ---
window.onload = () => {
  generateLevels();

  const savedLayout = sessionStorage.getItem("userLayout");
  if (window.innerWidth >= 1024) {
    if (savedLayout) setSidePreference(savedLayout);
    else layoutPopup.classList.add("active");
  }
};
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
