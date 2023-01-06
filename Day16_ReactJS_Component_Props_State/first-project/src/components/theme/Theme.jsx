import React from "react";

function Theme(props) {
    const themes = [
        {
            colorHeading: "#2C3639", // light theme
            colorText: "#3F4E4F",
            bg: "#F9F5EB",
        },
        {
            colorHeading: "#EAE3D2", // dark theme
            colorText: "#F9F5EB",
            bg: "#100720",
        },
    ];

    return (
        <div>
            <h2>Component name: {props.name}</h2>

            <select>
                <option>Light Theme</option>
                <option>Dark Theme</option>
            </select>

            <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                placeat necessitatibus, vitae laboriosam in quos, nesciunt modi
                error sit porro, reprehenderit voluptatem dolore libero
                incidunt. Illo mollitia fugit quam inventore?
            </p>
        </div>
    );
}

export default Theme;