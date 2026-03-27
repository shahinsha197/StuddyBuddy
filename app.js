document.addEventListener("DOMContentLoaded", async () => {

  await loadComponent("navbar", "./components/navbar.html");
  await loadComponent("footer", "./components/footer.html");

  setupMenu();
  loadFeatures();
  revealOnScroll();

});

async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    const res = await fetch(file);
    element.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

function setupMenu() {
  const btn = document.getElementById("menuBtn");
  const nav = document.querySelector(".nav-links");

  if (btn && nav) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
}

function loadFeatures() {
  const grid = document.getElementById("featuresGrid");
  if (!grid) return;

  grid.innerHTML = `
    <div class="card">
      <img src="images/book.png" class="icon">
      <p>Simple explanations</p>
    </div>

    <div class="card">
      <img src="images/game.png" class="icon">
      <p>Fun learning</p>
    </div>

    <div class="card">
      <img src="images/brain.png" class="icon">
      <p>Personalized AI</p>
    </div>

    <div class="card">
      <img src="images/chart.png" class="icon">
      <p>Progress tracking</p>
    </div>
  `;
}

function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  elements.forEach(el => observer.observe(el));
}