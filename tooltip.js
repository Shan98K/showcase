const techIcons = {
    "html": "./img/html.png",
    "css": "./img/css.png",
    "javascript": "./img/javaScript.png",
    "js": "./img/javaScript.png",
    "react": "./img/react.png",
    "react native": "./img/reactNative.png",
    "expo": "./img/expo.png",
    "tailwind": "./img/tailwind.png",
    "bootstrap": "./img/bootstrap.png",
    "node": "./img/node.png",
    "mongodb": "./img/mongodb.png"
};

// Format tech name
function formatTechName(key) {
    const mapCustom = {
        "js": "Java Script",
        "javascript": "Java Script",
        "node": "Node.js"
    };
    if (mapCustom[key]) return mapCustom[key];
    return key.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// Add tech icon to popup with tooltip
function addTechIcon(key) {
    const formatted = formatTechName(key);

    if (techIcons[key]) {
        const wrapper = document.createElement("span");
        wrapper.className = "tech-wrapper";
        wrapper.dataset.title = formatted;

        const icon = document.createElement("img");
        icon.src = techIcons[key];
        icon.alt = formatted;

        wrapper.appendChild(icon);
        popTech.appendChild(wrapper);
    } else {
        const span = document.createElement("span");
        span.textContent = formatted;
        popTech.appendChild(span);
    }
}
