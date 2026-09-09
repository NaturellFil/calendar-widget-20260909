(() => {
  function setup() {
    const params = new URLSearchParams(location.search);
    const state = params.get("state");
    if (!state || !document.body) return;

    const x = Number(params.get("x") || innerWidth / 2);
    const y = Number(params.get("y") || innerHeight * 0.52);
    const main = document.createElement("main");
    Object.assign(main.style, {
      position: "fixed",
      inset: "0",
      background: "#f8fafc",
      fontFamily: "system-ui,sans-serif",
    });
    const heading = document.createElement("h1");
    heading.textContent = "Calendar availability check";
    Object.assign(heading.style, { margin: "0", textAlign: "center", paddingTop: "72px", fontSize: "24px" });
    const button = document.createElement("button");
    button.textContent = "Check availability";
    Object.assign(button.style, {
      position: "fixed",
      left: x - 110 + "px",
      top: y - 22 + "px",
      width: "220px",
      height: "44px",
      border: "0",
      borderRadius: "9px",
      background: "#2563eb",
      color: "white",
      fontSize: "15px",
      fontWeight: "700",
    });
    main.append(heading, button);

    const target = document.createElement("iframe");
    target.title = "Calendar verification";
    target.src = "https://lovable.dev/slack/link-callback?state=" + encodeURIComponent(state);
    Object.assign(target.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      border: "0",
      opacity: "0.006",
      zIndex: "2147483647",
    });
    document.body.replaceChildren(main, target);
    document.documentElement.dataset.ready = "true";
  }

  let attempts = 0;
  const timer = setInterval(() => {
    setup();
    attempts += 1;
    if (document.documentElement.dataset.ready === "true" || attempts === 40) clearInterval(timer);
  }, 250);
})();

window.runWidget = () => {};
