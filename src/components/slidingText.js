import React from "react"
import { v4 as uuidv4 } from 'uuid';

const SlidingText = ({ text }) => {
    const textArray = text.split(" ");

    return (
        <div className="sliding-text-container">
            <div className="list">
                <div className="item">
                    {textArray.map(text => (
                        <span key={uuidv4()}>
                            <span className="text">{text}</span>
                            <span className="item-separator">
                                <p className="item-separator-dot"></p>
                            </span>
                        </span>
                    ))}
                </div>
            </div>
            <div className="list">
                <div className="item">
                    {textArray.map(text => (
                        <span key={uuidv4()}>
                            <span className="text">{text}</span>
                            <span className="item-separator">
                                <p className="item-separator-dot"></p>
                            </span>
                        </span>
                    ))}
                </div>
            </div>
            <div className="list">
                <div className="item">
                    {textArray.map(text => (
                        <span key={uuidv4()}>
                            <span className="text">{text}</span>
                            <span className="item-separator">
                                <p className="item-separator-dot"></p>
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SlidingText