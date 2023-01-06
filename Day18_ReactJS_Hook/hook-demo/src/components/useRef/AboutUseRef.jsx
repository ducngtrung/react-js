import React, { useEffect, useRef, useState } from "react";
import videoTikTok from "./video.mp4";

// Hook useRef() dùng để:
// - Lưu trữ một giá trị có thể thay đổi mà không bị ảnh hưởng bởi các lần re-render
// - Tham chiếu trực tiếp vào một phần tử DOM

const colors = ["red", "green", "blue", "yellow", "pink"];

function AboutUseRef() {
    // Ví dụ 1 (Tham chiếu trực tiếp thẻ input)
    const inputRef = useRef();
    console.log(inputRef); // Bước 1: Dòng log này sẽ hiện lên ngay khi script chạy

    useEffect(() => {
        // Bước 3: useEffect() được thực thi (sau lần render đầu tiên, tức là sau khi khối return đã được thực thi, dòng log mới được in ra sau khi inputRef đã được gắn vào ô input)
        console.log(inputRef);
        // focus vào ô input để hiển thị viền xanh sau khi tải trang
        inputRef.current.focus();
    }, []);


    // Ví dụ 2 (Tham chiếu trực tiếp thẻ video)
    const videoRef = useRef();
    const play = () => videoRef.current.play();
    const pause = () => videoRef.current.pause();


    // Ví dụ 3 (Lưu trữ giá trị)
    const [color, setColor] = useState("red");
    
    const currentColor = useRef(); // lưu trữ giá trị màu hiện tại
    useEffect(() => {
        currentColor.current = color;
    }); // sau mỗi lần render thì useEffect() sẽ được thực thi lại để lưu giá trị màu mới nhất

    const isFound = useRef(); // lưu trữ giá trị boolean để kiểm tra việc đã tìm thấy màu random mới hay chưa

    // Random 1 color từ mảng "colors", màu random không được trùng với màu đang có trong state
    const randomColor = () => {
        console.log("random color");
        isFound.current = false;
        do {
            // Lấy random index từ mảng "colors"
            const randomIndex = Math.floor(Math.random() * colors.length);
            // Nếu màu random khác với màu hiện tại thì set màu random đó làm state mới cho "color"
            if (colors[randomIndex] !== currentColor.current) {
                setColor(colors[randomIndex]);
                isFound.current = true;
            }
        } while (!isFound.current);
    }

    return (
        <>
            <h2>Ví dụ 1</h2>
            {/* Bước 2: Thực thi khối return để trả về giao diện (render), trong bước này thì inputRef sẽ được gắn vào ô input */}
            <input type="text" placeholder="Enter name ..." ref={inputRef} />
            <hr />

            <h2>Ví dụ 2</h2>
            <video
                src={videoTikTok}
                style={{ height: 300 }}
                ref={videoRef}
            ></video>
            <br />
            <button onClick={play}>Play</button>
            <button onClick={pause}>Pause</button>
            <hr />

            <h2>Ví dụ 3</h2>
            <div
                style={{
                    height: 200,
                    width: 200,
                    border: "1px solid black",
                    backgroundColor: color,
                }}
            ></div>
            <button onClick={randomColor}>Random background color</button>
        </>
    );
}

export default AboutUseRef;