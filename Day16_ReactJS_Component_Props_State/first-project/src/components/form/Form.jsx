import React, { useState } from 'react';

// Two-way data binding: Đồng bộ dữ liệu theo 2 chiều
// - state -> input: sử dụng thuộc tính value để đưa giá trị từ state vào input
// - input -> state: sử dụng hàm lắng nghe sự kiện onChange() để đưa giá trị từ input vào state
function Form(props) {
    // Khởi tạo state
    const [name, setName] = useState("abc");
    const [gender, setGender] = useState("male");
    const [languages, setLanguages] = useState(["vn", "en"]);

    const handleChosenLanguage = (language) => {
        // Nếu language đã tồn tại trong mảng languages thì xóa nó đi, nếu chưa tồn tại trong mảng thì thêm nó vào mảng
        if (languages.includes(language)) {
            // tạo mảng mới gồm các phần tử từ mảng ban đầu nhưng ngoại trừ language
            const newLanguages = languages.filter(l => l !== language);
            setLanguages(newLanguages);
        } else {
            // clone mảng ban đầu thành một mảng mới và thêm language vào cuối mảng
            const newLanguages = [...languages, language];
            setLanguages(newLanguages);
        }
    }

    return (
        <>
            <h2>Component name: {props.name}</h2>

            <label>Tên: </label>
            <input
                type="text"
                placeholder="Enter name ..."
                // state -> input: sử dụng thuộc tính value để đưa giá trị từ state vào input
                value={name}
                // input -> state: sử dụng hàm lắng nghe sự kiện onChange() để đưa giá trị từ input vào state
                onChange={(event) => setName(event.target.value)}
            />

            <br />

            <label>Giới tính: </label>

            <label htmlFor="male">Nam</label>
            <input
                type="radio"
                value={"male"}
                id="male"
                checked={gender === "male"}
                onChange={(event) => setGender(event.target.value)}
            />

            <label htmlFor="female">Nữ</label>
            <input
                type="radio"
                value={"female"}
                id="female"
                checked={gender === "female"}
                onChange={(event) => setGender(event.target.value)}
            />

            <br />

            <label>Ngôn ngữ: </label>

            <label htmlFor="vn">VN</label>
            <input
                type="checkbox"
                value={"vn"}
                id="vn"
                checked={languages.includes("vn")}
                onChange={event => handleChosenLanguage(event.target.value)}
            />

            <label htmlFor="en">EN</label>
            <input
                type="checkbox"
                value={"en"}
                id="en"
                checked={languages.includes("en")}
                onChange={event => handleChosenLanguage(event.target.value)}
            />

            <label htmlFor="jp">JP</label>
            <input
                type="checkbox"
                value={"jp"}
                id="jp"
                checked={languages.includes("jp")}
                onChange={event => handleChosenLanguage(event.target.value)}
            />
        </>
    );
}

export default Form;