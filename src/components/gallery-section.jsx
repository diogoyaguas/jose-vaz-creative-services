import React, { useEffect, useRef, useState } from "react"

const GallerySection = ({ title, items = [] }) => {
    const gridRef = useRef(null)
    const [isScrollable, setIsScrollable] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const itemsPerPage = 5
    const totalPages = Math.ceil(items.length / itemsPerPage)

    useEffect(() => {
        const el = gridRef.current
        if (!el) return

        const updateScrollable = () => {
            setIsScrollable(el.scrollWidth > el.clientWidth + 1)
        }

        updateScrollable()

        // Recalcular em resize (responsivo)
        window.addEventListener("resize", updateScrollable)
        return () => window.removeEventListener("resize", updateScrollable)
    }, [items.length])

    const handleScroll = () => {
        const el = gridRef.current
        if (!el) return

        const maxScrollLeft = el.scrollWidth - el.clientWidth
        if (maxScrollLeft <= 0) {
            setActiveIndex(0)
            return
        }

        const newIndex = Math.round((el.scrollLeft / maxScrollLeft) * (totalPages - 1))
        setActiveIndex(newIndex)
    }

    const scrollToPage = (index) => {
        const el = gridRef.current
        if (!el) return

        const pageWidth = el.clientWidth
        el.scrollTo({ left: index * pageWidth, behavior: "smooth" })
    }

    return (
        <section className="gallery-section container">
            <h2 className="gallery-title">{title}</h2>

            <div className={`gallery-grid-wrapper ${isScrollable ? "scrollable" : ""}`}>
                <div className="gallery-grid" ref={gridRef} onScroll={handleScroll}>
                    {items.map((item, index) => {
                        if (item?.img) {
                            return (
                                <img
                                    key={index}
                                    src={item.img}
                                    alt=""
                                    className="gallery-item"
                                    loading="lazy"
                                    decoding="async"
                                />
                            )
                        }

                        if (item?.video) {
                            return (
                                <video
                                    key={index}
                                    src={item.video}
                                    controls
                                    className="gallery-item"
                                    preload="metadata"
                                />
                            )
                        }

                        return null
                    })}
                </div>

                {isScrollable && totalPages > 1 && (
                    <div className="carousel-dots">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <span
                                key={i}
                                className={`dot ${activeIndex === i ? "active" : ""}`}
                                onClick={() => scrollToPage(i)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") scrollToPage(i)
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default GallerySection
