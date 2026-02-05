import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useEffect, useRef, useState } from "react"

const GallerySection = ({ title, items }) => {
    const gridRef = useRef()
    const [isScrollable, setIsScrollable] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const itemsPerPage = 5
    const totalPages = Math.ceil(items.length / itemsPerPage)

    useEffect(() => {
        if (gridRef.current && gridRef.current.scrollWidth > gridRef.current.clientWidth) {
            setIsScrollable(true)
        }
    }, [items])

    const handleScroll = () => {
        if (!gridRef.current) return
        const scrollLeft = gridRef.current.scrollLeft
        const maxScrollLeft = gridRef.current.scrollWidth - gridRef.current.clientWidth
        const newIndex = Math.round((scrollLeft / maxScrollLeft) * (totalPages - 1))
        setActiveIndex(newIndex)
    }

    const scrollToPage = (index) => {
        if (!gridRef.current) return
        const pageWidth = gridRef.current.clientWidth
        gridRef.current.scrollTo({ left: index * pageWidth, behavior: "smooth" })
    }

    return (
        <section className="gallery-section container">
            <h2 className="gallery-title">{title}</h2>
            <div className={`gallery-grid-wrapper ${isScrollable ? "scrollable" : ""}`}>
                <div
                    className="gallery-grid"
                    ref={gridRef}
                    onScroll={handleScroll}
                >
                    {items.map((item, index) => {
                        if (item.img) {
                            return (
                                <GatsbyImage
                                    key={index}
                                    image={getImage(item.img)}
                                    alt=""
                                    className="gallery-item"
                                />
                            )
                        } else if (item.video) {
                            return (
                                <video
                                    key={index}
                                    src={item.video.publicURL}
                                    controls
                                    className="gallery-item"
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
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default GallerySection
