// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
});

// Header scroll animation
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Filter tags interaction
const filterTags = document.querySelectorAll(".filter-tag");
filterTags.forEach((tag) => {
  tag.addEventListener("click", function () {
    filterTags.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

// Conversion diagram interaction
const diagramSteps = document.querySelectorAll(".diagram-step");
diagramSteps.forEach((step) => {
  step.addEventListener("click", function () {
    const stepNumber = this.getAttribute("data-step");

    // Reset all steps
    diagramSteps.forEach((s) => s.classList.remove("active"));
    document
      .querySelectorAll(".diagram-connector")
      .forEach((c) => c.classList.remove("active"));
    document
      .querySelectorAll(".diagram-info")
      .forEach((i) => i.classList.remove("active"));

    // Activate current step
    this.classList.add("active");

    // Activate connectors leading to this step
    if (stepNumber > 1) {
      for (let i = 1; i < stepNumber; i++) {
        document
          .querySelector(`.diagram-connector[data-connector="${i}-${i + 1}"]`)
          .classList.add("active");
      }
    }

    // Show info for this step
    document
      .querySelector(`.diagram-info[data-info="${stepNumber}"]`)
      .classList.add("active");
  });
});

// Activate first step by default
document.querySelector('.diagram-step[data-step="1"]').click();

// Vehicle selector tabs
const selectorTabs = document.querySelectorAll(".selector-tab");
selectorTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab");

    // Deactivate all tabs and contents
    selectorTabs.forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".selector-content")
      .forEach((c) => c.classList.remove("active"));

    // Activate current tab and content
    this.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});

// Vehicle option selection
const vehicleOptions = document.querySelectorAll(".vehicle-option");
vehicleOptions.forEach((option) => {
  option.addEventListener("click", function () {
    vehicleOptions.forEach((o) => o.classList.remove("selected"));
    this.classList.add("selected");
  });
});

// Animated counters
document.addEventListener("DOMContentLoaded", function () {
  const countUpElements = [
    { id: "conversionCount", endVal: 1200 },
    { id: "emissionCount", endVal: 4500 },
    { id: "rangeCount", endVal: 300 },
    { id: "satisfactionCount", endVal: 98 },
  ];

  const options = {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
    suffix: countUpElements[3].id === "satisfactionCount" ? "%" : "+",
  };

  const statsSection = document.querySelector(".stats-section");
  const triggerCountUp = () => {
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight * 0.8;

    if (sectionPos < screenPos) {
      countUpElements.forEach((element) => {
        const countUp = new CountUp(
          element.id,
          0,
          element.endVal,
          0,
          2.5,
          options
        );
        if (!countUp.error) {
          countUp.start();
        }
      });
      window.removeEventListener("scroll", triggerCountUp);
    }
  };

  window.addEventListener("scroll", triggerCountUp);
  triggerCountUp(); // Check on load
});

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function () {
  const query = this.value.toLowerCase();
  const packageCards = document.querySelectorAll(".package-card");

  packageCards.forEach((card) => {
    const packageName = card.querySelector("h5").textContent.toLowerCase();
    const packageDesc = card.querySelector("p").textContent.toLowerCase();

    if (packageName.includes(query) || packageDesc.includes(query)) {
      card.closest(".col-lg-4").style.display = "block";
    } else {
      card.closest(".col-lg-4").style.display = "none";
    }
  });
});

// --- ADD THIS CODE TO THE END OF ev_conversion_ui.js ---

// Vehicle selection and redirect to checkout
const allVehicleOptions = document.querySelectorAll(".vehicle-option");

allVehicleOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Find the vehicle name within the clicked option
    const vehicleName = this.querySelector("div").textContent.trim();

    // Encode the name to be safely used in a URL
    const encodedVehicleName = encodeURIComponent(vehicleName);

    // Redirect to the checkout page with the vehicle name as a parameter
    window.location.href = `checkout.html?vehicle=${encodedVehicleName}`;
  });
});