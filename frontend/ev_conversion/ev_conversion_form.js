document.addEventListener("DOMContentLoaded", function () {
  // Range slider value display
  const rangeSlider = document.getElementById("batteryRange");
  const rangeValue = document.getElementById("rangeValue");

  if (rangeSlider && rangeValue) {
    // Set initial value
    rangeValue.textContent = `${rangeSlider.value} km`;

    // Update value on slider change
    rangeSlider.addEventListener("input", function () {
      rangeValue.textContent = `${this.value} km`;
    });
  }

  // Add file name display for file inputs
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input) => {
    input.addEventListener("change", function () {
      let fileNameDisplay = this.nextElementSibling;
      if (
        !fileNameDisplay ||
        !fileNameDisplay.classList.contains("file-name")
      ) {
        fileNameDisplay = document.createElement("p");
        fileNameDisplay.className = "file-name";
        fileNameDisplay.style.fontSize = "0.9rem";
        fileNameDisplay.style.margin = "5px 0 15px";
        fileNameDisplay.style.color = "#666";
        this.parentNode.insertBefore(fileNameDisplay, this.nextSibling);
      }

      if (this.files.length > 0) {
        const fileNames = Array.from(this.files).map((file) => file.name);
        fileNameDisplay.textContent = `Selected: ${fileNames.join(", ")}`;
      } else {
        fileNameDisplay.textContent = "";
      }
    });
  });

  // Add animation on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".form-section, .user-details, .video-section"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial states for animation
  const setupAnimations = function () {
    const elements = document.querySelectorAll(
      ".form-section, .user-details, .video-section"
    );

    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    // Trigger first animation
    setTimeout(animateOnScroll, 100);
  };

  // Setup and run animations
  setupAnimations();
  window.addEventListener("scroll", animateOnScroll);
});
