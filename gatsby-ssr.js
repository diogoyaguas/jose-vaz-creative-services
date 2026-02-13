const React = require("react")

const STORAGE_KEY = "creative_vaz_auth"
const NETLIFY_CONTEXT =
  typeof process !== "undefined" ? process.env.GATSBY_NETLIFY_CONTEXT : undefined
const isProdNetlify = NETLIFY_CONTEXT === "production"

function setInitialThemeAndEnableTransitionsLater() {
  const code = `
(function() {
  try {
    var stored = localStorage.getItem("theme");
    var theme = (stored === "light" || stored === "dark")
      ? stored
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", theme);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.remove("no-theme-transition");
      });
    });
  } catch (e) {}
})();
`
  return <script key="initial-theme-script" dangerouslySetInnerHTML={{ __html: code }} />
}

function setEarlyAuthGuard() {
  const code = `
(function() {
  try {
    var path = window.location && window.location.pathname ? window.location.pathname : "/";
    var isPublic = path === "/" || path === "/404/" || path === "/404.html";
    if (isPublic) return;

    document.documentElement.classList.add("auth-pending");

    var isProd = ${JSON.stringify(isProdNetlify)};
    if (isProd) return;

    var authorized = localStorage.getItem("${STORAGE_KEY}");
    if (authorized !== "true") {
      window.location.replace("/");
    }
  } catch (e) {}
})();
`

  return <script key="early-auth-guard" dangerouslySetInnerHTML={{ __html: code }} />
}

exports.onRenderBody = ({ setPreBodyComponents, setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ className: "no-theme-transition" })

  setHeadComponents([
    <style key="auth-pending-style">{`html.auth-pending body { visibility: hidden; }`}</style>,
  ])

  setPreBodyComponents([setEarlyAuthGuard(), setInitialThemeAndEnableTransitionsLater()])
}
