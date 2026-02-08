import * as React from "react"

const COPY = {
    pt: {
        title: "Estás offline",
        text_1: "Parece que não há ligação à internet.",
        text_2: "Volta a ligar-te para ver mais conteúdo."
    },
    en: {
        title: "You're offline",
        text_1: "It looks like you're not connected to the internet.",
        text_2: "Please reconnect to see more content."
    },
}

const OfflinePage = () => {
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
                <h1 className="notfound-title">{t.title}</h1>
                <p className="notfound-text">{t.text_1}</p>
                <p className="notfound-text">{t.text_2}</p>
            </div>
        </main>
    )
}

export default OfflinePage
