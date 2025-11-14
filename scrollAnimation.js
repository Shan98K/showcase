// Always reset scroll to top on refresh
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

document.querySelectorAll("section, footer, .project-item, .service-item, .skill").forEach(el => {
    el.classList.add("hidden-scroll");
});

// Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-scroll");
            observer.unobserve(entry.target); // animate once
        }
    });
}, {
    threshold: 0.2
});

// Apply observer to elements
document.querySelectorAll("section, footer, .project-item, .service-item, .skill").forEach(el => {
    observer.observe(el);
});