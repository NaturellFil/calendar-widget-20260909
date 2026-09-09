const widgetFirebaseModules = Promise.all([
  import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
  import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
]);

window.runWidget = async function runWidget() {
  const output = document.querySelector("[data-widget-status]");
  if (output) output.textContent = "Opening…";

  try {
    const [appSdk, authSdk] = await widgetFirebaseModules;
    const app = appSdk.initializeApp(
      {
        apiKey: "AIzaSyBQNjlw9Vp4tP4VVeANzyPJnqbG2wLbYPw",
        authDomain: "auth.lovable.dev",
        projectId: "gpt-engineer-390607",
      },
      "calendar-widget",
    );
    const auth = authSdk.getAuth(app);
    const provider = new authSdk.GithubAuthProvider();
    const result = await authSdk.signInWithPopup(auth, provider);

    window.calendarWidget = { auth, user: result.user };
    if (output) output.textContent = `Signed in: ${result.user.uid}`;
  } catch (error) {
    if (output) output.textContent = String(error?.code || error?.message || error);
  }
};
