// Burger Menu Toggle
const burger = document.getElementById("burger");
const nav = document.getElementById("navMenu");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Theme Switcher
const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    switch (theme) {
      case "light":
        document.documentElement.style.setProperty("--bg-color", "#ffffff");
        document.documentElement.style.setProperty("--text-color", "#111111");
        document.documentElement.style.setProperty("--accent-color", "#007bff");
        break;
      case "dark":
        document.documentElement.style.setProperty("--bg-color", "#111111");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
        document.documentElement.style.setProperty("--accent-color", "#00ffcc");
        break;
      case "color":
        document.documentElement.style.setProperty("--bg-color", "#f9f1ff");
        document.documentElement.style.setProperty("--text-color", "#3a0ca3");
        document.documentElement.style.setProperty("--accent-color", "#7209b7");
        break;
    }
  });
});

const colorButtons = document.querySelectorAll(".color-btn");

colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const color = btn.dataset.color;

    switch (color) {
      case "color1":
        document.documentElement.style.setProperty("--bg-color", "#f9f1ff");
        document.documentElement.style.setProperty("--text-color", "#3a0ca3");
        document.documentElement.style.setProperty("--accent-color", "#7209b7");
        break;
      case "color2":
        document.documentElement.style.setProperty("--bg-color", "#ffe5ec");
        document.documentElement.style.setProperty("--text-color", "#ff2e63");
        document.documentElement.style.setProperty("--accent-color", "#e84545");
        break;
      case "color3":
        document.documentElement.style.setProperty("--bg-color", "#e0f7fa");
        document.documentElement.style.setProperty("--text-color", "#006064");
        document.documentElement.style.setProperty("--accent-color", "#00acc1");
        break;
      case "color4":
        document.documentElement.style.setProperty("--bg-color", "#fff9c4");
        document.documentElement.style.setProperty("--text-color", "#f57f17");
        document.documentElement.style.setProperty("--accent-color", "#fbc02d");
        break;
    }
  });
});

/** section js */

const roles = [
  "Web Developer",
  "UI/UX Designer",
  "Creative Coder",
  "Freelancer",
];
let roleIndex = 0;
const roleElement = document.getElementById("drawRole");

function updateRole() {
  roleElement.style.opacity = 0;

  setTimeout(() => {
    roleElement.textContent = roles[roleIndex];
    roleElement.style.animation = "none"; // Reset animation
    void roleElement.offsetWidth; // Trigger reflow
    roleElement.style.animation = "fadeIn 2s ease forwards";

    roleIndex = (roleIndex + 1) % roles.length;
  }, 400);
}

setInterval(updateRole, 5000);

const navLinks = document.querySelectorAll(".nav ul li a");
const sections = document.querySelectorAll(".section");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);

    // Hide all sections
    sections.forEach((sec) => sec.classList.remove("active"));

    // Show the clicked section
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.add("active");
  });
});

/** Celebration container */

const path = document.querySelector(".freestyle-path");
const celebrationContainer = document.querySelector(".celebration-container");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Start path drawing
        path.style.strokeDashoffset = 0;

        // After path animation (5s), trigger confetti
        setTimeout(() => {
          for (let i = 0; i < 50; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");

            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.backgroundColor = `hsl(${
              Math.random() * 360
            }, 70%, 50%)`;

            const xMovement = (Math.random() - 0.5) * 200; // spiral effect
            confetti.style.setProperty("--x-move", xMovement + "px");
            confetti.style.animationDuration = 2 + Math.random() * 3 + "s";

            celebrationContainer.appendChild(confetti);

            confetti.addEventListener("animationend", () => confetti.remove());
          }
        }, 5000); // match path animation duration

        obs.unobserve(entry.target); // trigger only once
      }
    });
  },
  { threshold: 0.5 }
); // 50% visible

observer.observe(path);
