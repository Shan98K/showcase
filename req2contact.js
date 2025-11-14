document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const submitBtn = document.querySelector(".send-btn");

  let canSend = true; // 2-minute cooldown control

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!canSend) return; // stop if cooldown active

    const company = document.getElementById("company");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    let hasError = false;

    // Remove old errors
    [company, name, email, message].forEach(input => {
      input.classList.remove("error", "shake");
    });

    // Validation
    if (!name.value.trim()) {
      name.classList.add("error", "shake");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      email.classList.add("error", "shake");
      hasError = true;
    }

    if (!message.value.trim()) {
      message.classList.add("error", "shake");
      hasError = true;
    }

    // Remove shake animation
    setTimeout(() => {
      [company, name, email, message].forEach(input => {
        input.classList.remove("shake");
      });
    }, 300);

    if (hasError) return;

    // -----------------------------
    // ⭐ LOADING ANIMATION (3 sec)
    // -----------------------------
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");
    submitBtn.textContent = "Sending...";
    submitBtn.style.setProperty("color", "black", "important");
    submitBtn.style.setProperty("font-weight", "700", "important");

    // Send to Google Script
    fetch("https://script.google.com/macros/s/AKfycbyz1uHFPMlgwpb2iPDyhnoRnVxMqHe9VvSLV1kufM1XCMhBxQ-W4-ot1_XHoK_YC3xw/exec", {
      method: "POST",
      body: JSON.stringify({
        company: company.value,
        name: name.value,
        email: email.value,
        message: message.value
      })
    })
    .then(() => {
      submitBtn.textContent = "Sent ✔";

      // -----------------------------
      // ⭐ 2-MIN COOLDOWN
      // -----------------------------
      canSend = false;

      let cooldownSeconds = 120;
      const originalText = "Send Message";

      const interval = setInterval(() => {
        cooldownSeconds--;
        submitBtn.textContent = `Wait ${cooldownSeconds}s`;

        if (cooldownSeconds <= 0) {
          clearInterval(interval);
          canSend = true;

          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }, 1000);
    })
    .catch(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Failed ❌";
      setTimeout(() => submitBtn.textContent = "Send Message", 2000);
    })
    .finally(() => {
      setTimeout(() => {
        submitBtn.classList.remove("loading");
      }, 3000);
    });
  });
});
