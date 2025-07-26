document.addEventListener("DOMContentLoaded", function () {
  const counters = [
    { id: "conversions", end: 1200, suffix: "+" },
    { id: "co2-reduced", end: 4500, suffix: "" },
    { id: "savings", end: 3.2, prefix: "₹", suffix: "Cr+" },
  ];

  counters.forEach((counter) => {
    new CountUp(counter.id, 0, counter.end, 1, 2.5, {
      prefix: counter.prefix || "",
      suffix: counter.suffix || "",
    }).start();
  });
});
