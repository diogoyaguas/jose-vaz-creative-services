import * as React from "react"
import { Link } from "gatsby"

const COPY = {
  pt: {
    title: "Página não encontrada",
    text: "A página que procuras não existe ou foi movida.",
    button: "Voltar aos projetos",
    projectsPath: "/projetos",
  },
  en: {
    title: "Page not found",
    text: "The page you are looking for does not exist or was moved.",
    button: "Back to projects",
    projectsPath: "/en/projects",
  },
}

const NotFoundPage = () => {
  const [lang, setLang] = React.useState("pt")

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = window.localStorage.getItem("lang")
      if (storedLang === "en") {
        setLang("en")
      }
    }
  }, [])

  const t = COPY[lang]

  return (
    <main className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-code">404</div>

        <h1 className="notfound-title">{t.title}</h1>

        <p className="notfound-text">{t.text}</p>

        <Link to={t.projectsPath} className="notfound-button">
          {t.button}
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
