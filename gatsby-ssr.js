const React = require("react")

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
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}

exports.onRenderBody = ({ setPreBodyComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ className: "no-theme-transition" })

  setPreBodyComponents([setInitialThemeAndEnableTransitionsLater()])
}
