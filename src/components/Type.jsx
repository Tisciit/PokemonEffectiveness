import React from "react";

export const Type = (props) => {

    const { type, active, toggle } = props;
    let imgSrc = "";
    try {
        imgSrc = require(`../img/types/${type}.png`)
    } catch (e) {
        console.error("IMAGE NOT FOUND : " + type);
    }

    const click = () => {
        if (toggle) {
            toggle(type);
        }
    }

    return (
        <div className={`Type ${active ? "Active" : ""}`} onClick={click}>
            <img src={imgSrc} alt={type} />
        </div >
    );
}

export default Type;