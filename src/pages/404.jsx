import * as React from "react"

import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <main className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Página não encontrada</h1>
        <p className="notfound-text">
          A página que procuras não existe ou foi movida.
        </p>

        <Link to="/projetos" className="notfound-button">
          Voltar aos Projetos
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
