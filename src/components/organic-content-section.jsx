import React, { useMemo, useRef, useState } from "react"

import Mute from "../assets/icons/common/mute.svg"
import Unmute from "../assets/icons/common/unmute.svg"

const OrganicContentSection = ({ tabs }) => {
    const tabArray = useMemo(() => {
        if (!tabs) return []
        return Array.isArray(tabs) ? tabs : [tabs]
    }, [tabs])

    const [activeTab, setActiveTab] = useState(0)
    const [unmutedIndex, setUnmutedIndex] = useState(null)
    const itemsPerPage = 10

    const activeItems = useMemo(() => {
        const tab = tabArray[activeTab]
        return tab?.items ? tab.items.slice(0, itemsPerPage) : []
    }, [tabArray, activeTab])

    if (tabArray.length === 0) return null

    const toggleSound = (index) => {
        setUnmutedIndex((prev) => (prev === index ? null : index))
    }

    return (
        <div className="organic-content-section container">
            <div className="titles">
                {tabArray.map((tab, index) => (
                    <div
                        key={tab.title || index}
                        className={`title-btn ${activeTab === index ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab(index)
                            setUnmutedIndex(null)
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>

            <div className="main-images">
                {activeItems.map((item, index) => (
                    <div key={index} className="main-image">
                        {item?.img && (
                            <img
                                src={item.img}
                                alt=""
                                loading="lazy"
                                decoding="async"
                            />
                        )}

                        {item?.video && (
                            <>
                                <video
                                    src={item.video}
                                    autoPlay
                                    loop
                                    muted={unmutedIndex !== index}
                                    playsInline
                                />

                                <button
                                    className="sound-toggle"
                                    onClick={() => toggleSound(index)}
                                    aria-label={unmutedIndex === index ? "Mute video" : "Unmute video"}
                                >
                                    {unmutedIndex === index ? (
                                        <Mute />
                                    ) : (
                                        <Unmute />
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrganicContentSection
