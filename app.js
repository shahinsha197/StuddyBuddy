document.addEventListener("DOMContentLoaded", async () => {
    // Detect JS for animations
    document.documentElement.classList.add('js-enabled');

    // Load Components (Navbar and Footer)
    await Promise.all([
        loadComponent("navbar", "components/navbar.html"),
        loadComponent("footer", "components/footer.html")
    ]);

    // Initialize Page Content
    renderFeatures();
    initReveal();
});

async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
        const res = await fetch(file);
        if (res.ok) {
            el.innerHTML = await res.text();
        } else {
            console.error(`Failed to load ${file}: ${res.status}`);
        }
    } catch (e) { 
        console.warn("Error fetching component: " + file, e); 
    }
}

function renderFeatures() {
    const grid = document.getElementById("featuresGrid");
    if (!grid) return;

    // Data updated to use .png icons
    const data = [
        { t: "Simple Explanations", i: "images/book.png" },
        { t: "Fun Learning", i: "images/game.png" },
        { t: "Personalized AI", i: "images/brain.png" },
        { t: "Progress Tracking", i: "images/chart.png" }
    ];

    grid.innerHTML = data.map(f => `
        <div class="card reveal">
            <img src="${f.i}" class="icon-img" alt="${f.t}">
            <h3 style="color: var(--accent); margin-bottom: 10px;">${f.t}</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Adaptive learning modules tailored to you.</p>
        </div>
    `).join('');
}

function initReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}