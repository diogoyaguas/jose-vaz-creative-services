import React, { useState } from "react";

const OrganicContentSection = ({ tabs }) => {
    const tabArray = Array.isArray(tabs) ? tabs : [tabs]
    const [activeTab, setActiveTab] = useState(0)
    const imagesPerPage = 10

    const activeImages = tabArray[activeTab].items.slice(0, imagesPerPage)

    console.log(activeImages)

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
                {activeImages.map((item, index) => {
                    return (
                        <div key={index} className="main-image">
                            <img
                                key={index}
                                src={item.img}
                                alt=""
                                className="gallery-item"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OrganicContentSection;