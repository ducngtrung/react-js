import React, { useState } from "react";
import AboutUseRef from "./components/useRef/AboutUseRef";
import AboutUseState from "./components/useState/AboutUseState";
import Content from "./components/useState/Content";
import Heading from "./components/cleanUp/Heading";
import AboutUseEffect from "./components/useEffect/AboutUseEffect";
import Post from "./components/useEffect/Post";

function App() {
    const [isShow, setIsShow] = useState(true);

    const handleToggle = () => {
        setIsShow(!isShow);
    };

    return (
        <>
            <h1 style={{color: "red"}}>BÀI THỰC HÀNH 1</h1>
            <AboutUseState />

            <h1 style={{color: "red"}}>BÀI THỰC HÀNH 2</h1>
            <Content />

            <h1 style={{color: "red"}}>BÀI THỰC HÀNH 3</h1>
            <AboutUseEffect />

            <h1 style={{color: "red"}}>BÀI THỰC HÀNH 4</h1>
            <Post />

            <h1 style={{color: "red"}}>BÀI THỰC HÀNH 5</h1>
            {isShow && <Heading />}
            <button onClick={handleToggle}>{isShow ? "Hide heading" : "Show heading"}</button>

            <h1 style={{color: "red"}}>BÀI THỰC HÀNH 6</h1>
            <AboutUseRef />
        </>
    );
}

export default App;