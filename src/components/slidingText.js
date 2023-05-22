import React from "react"

const SlidingText = ({ text }) => {
    const textArray = text.split(" ");

    return (
        <section className="sliding-text-container">
            <div className="list">
                <div className="item">
                    {textArray.map(text => (
                        <>
                            <span className="text">{text}</span>
                            <span className="item-separator">
                                <p className="item-separator-dot"></p>
                            </span>
                        </>
                    ))}
                </div>
            </div>
            <div className="list">
                <div className="item">
                    {textArray.map(text => (
                        <>
                            <span className="text">{text}</span>
                            <span className="item-separator">
                                <p className="item-separator-dot"></p>
                            </span>
                        </>
                    ))}
                </div>
            </div>
            <div className="list">
                <div className="item">
                    {textArray.map(text => (
                        <>
                            <span className="text">{text}</span>
                            <span className="item-separator">
                                <p className="item-separator-dot"></p>
                            </span>
                        </>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SlidingText