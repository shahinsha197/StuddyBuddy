/* Updated app.js */
document.addEventListener("DOMContentLoaded", async () => {
  // Use relative paths that match your folder structure
  await loadComponent("navbar", "components/navbar.html");
  await loadComponent("footer", "components/footer.html");

  setupMenu();
  loadFeatures();
  revealOnScroll();
});

async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Could not fetch ${file}`);
    element.innerHTML = await res.text();
  } catch (err) {
    console.error("Component Load Error:", err);
    // Fallback: Manually inject basic HTML if fetch fails
    if (id === "navbar") {
      element.innerHTML = `<nav class="nav"><div class="container">StudyBuddy AI</div></nav>`;
    }
  }
}