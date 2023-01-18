// Yêu cầu:
//     Vừa load trang thì light theme được hiển thị
//     Nếu chọn các giá trị theme khác nhau từ select thì theme sẽ thay đổi tương ứng
//     Áp dụng màu cho từng phần tử:
//         Thẻ div: giá trị bg ứng với thuộc tính backgroundColor
//         Thẻ h2: giá trị colorHeading ứng với thuộc tính color
//         Thẻ p: giá trị colorText ứng với thuộc tính color

import React, { useState } from 'react';

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

    const [theme, setTheme] = useState("lightTheme");

    const handleChangeTheme = (value) => {
        setTheme(value);
    }

    return (
        <>
            <h2>Component name: {props.name}</h2>
            <div 
                style = {
                    {backgroundColor: 
                        (theme === "lightTheme") ? themes[0].bg : themes[1].bg
                    }
                }
            >
                <select 
                    value={theme} 
                    onChange={(event) => handleChangeTheme(event.target.value)}
                >
                    <option value="lightTheme">Light Theme</option>
                    <option value="darkTheme">Dark Theme</option>
                </select>

                <h2 
                    style = {
                        {color: 
                            (theme === "lightTheme") ? themes[0].colorHeading : themes[1].colorHeading
                        }
                    }
                >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
                <p
                    style = {
                        {color: 
                            (theme === "lightTheme") ? themes[0].colorText : themes[1].colorText
                        }
                    }
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                    placeat necessitatibus, vitae laboriosam in quos, nesciunt modi
                    error sit porro, reprehenderit voluptatem dolore libero
                    incidunt. Illo mollitia fugit quam inventore?
                </p>
            </div>
        </>
    );
}

export default Theme;