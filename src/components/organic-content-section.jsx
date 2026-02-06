import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useState } from "react";

const OrganicContentSection = ({ tabs }) => {
    const tabArray = Array.isArray(tabs) ? tabs : [tabs]
    const [activeTab, setActiveTab] = useState(0)
    const imagesPerPage = 10

    const activeImages = tabArray[activeTab].items.slice(0, imagesPerPage)

    return (
        <div className="organic-content-section container">
            <div className="titles">
                {tabArray.map((tab, index) => (
                    <div
                        key={index}
                        className={`title-btn ${activeTab === index ? "active" : ""}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>

            <div className="main-images">
                {activeImages.map((imgObj, idx) => {
                    const image = getImage(imgObj.img)
                    return (
                        <div key={idx} className="main-image">
                            <GatsbyImage image={image} alt={`${tabArray[activeTab].title} ${idx}`} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OrganicContentSection;