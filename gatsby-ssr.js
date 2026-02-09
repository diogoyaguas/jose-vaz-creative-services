const React = require("react")

function setInitialTheme() {
    const code = `
(function() {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`
    return <script dangerouslySetInnerHTML={{ __html: code }} />
}

exports.onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents([setInitialTheme()])
}
