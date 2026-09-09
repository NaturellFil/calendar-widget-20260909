window.runWidget = function runWidget() {
  const output = document.querySelector("[data-widget-status]");
  if (output) output.textContent = new Date().toLocaleDateString();
};
