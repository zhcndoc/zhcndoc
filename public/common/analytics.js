function loadUmami() {
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://analytics.ikxin.com/script.js";
  script.setAttribute(
    "data-website-id",
    "f0e90b0d-e086-4fdc-b173-de4857b71900"
  );
  document.head.appendChild(script);
}

function loadGoogleAnalytics() {
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-HYH4TH7PWM";
  document.head.appendChild(gtagScript);
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-HYH4TH7PWM");
}

loadUmami();
loadGoogleAnalytics();
