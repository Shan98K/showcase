// typer.js
const textElement = document.getElementById("typer");
const words = ["Shan98K", "Harsh"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typingSpeed = 120;  // milliseconds per character
const deletingSpeed = 70;
const pauseBetween = 1000; // pause between switching words

function type() {
  const currentWord = words[wordIndex];
  const displayed = currentWord.substring(0, charIndex);
  textElement.textContent = displayed;

  if (!deleting && charIndex < currentWord.length) {
    // typing forward
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (deleting && charIndex > 0) {
    // deleting backward
    charIndex--;
    setTimeout(type, deletingSpeed);
  } else {
    // pause or switch phase
    if (!deleting) {
      deleting = true;
      setTimeout(type, pauseBetween);
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    }
  }
}

type();
