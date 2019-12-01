import React from "react";

export const Header = (props) => {
    const { language } = props;

    return (
        <div className="Header">
            <h1>Hello Pokeman!</h1>
            <h2>The current language is: {language}</h2>
        </div>
    )
}