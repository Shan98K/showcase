const projectItems = document.querySelectorAll(".project-item");
const popupBox = document.getElementById("projectPopup");

const popName = document.getElementById("popupName");
const popImg = document.getElementById("popupImg");
const popDesc = document.getElementById("popupDesc");
const popTech = document.getElementById("popupTech");
const popLive = document.getElementById("popupLive");

// Open popup
projectItems.forEach(item => {
    item.addEventListener("click", () => {
        const name = item.dataset.name;
        const img = item.dataset.img;
        const desc = item.dataset.desc;
        const techList = item.dataset.tech.toLowerCase().split(",");
        const liveLink = item.dataset.live;

        popName.textContent = name;
        popImg.src = img;
        popDesc.textContent = desc;
        popLive.href = liveLink;

        // Clear previous tech icons
        popTech.innerHTML = "";

        // Add tech icons dynamically
        techList.forEach(t => {
            addTechIcon(t.trim());
        });

        popupBox.style.display = "flex";
    });
});

// Close popup
document.getElementById("windowClose-btn").onclick = () => {
    popupBox.style.display = "none";
};
