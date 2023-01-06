import React, { useEffect, useState } from "react";
import axios from "axios";

function Post() {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("posts"); // set state mặc định của type là "posts"

    useEffect(() => {
        // Khai báo hàm để gọi API
        const getContent = async () => {
            try {
                // Trước khi gọi API, set state loading = true để hiển thị dòng "Loading..."
                setLoading(true);

                // Gọi API
                let res = await axios.get(`https://jsonplaceholder.typicode.com/${type}`);
                console.log(res);

                // Đưa dữ liệu trả về từ API vào state "posts"
                setContent(res.data);

                // Delay 1 giây trước khi set state loading về false
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        };
        getContent();
    }, [type]); // mỗi khi state type thay đổi thì hàm useEffect() được thực thi lại để gọi API lấy data mới tương ứng với type mới

    // Hiển thị dòng "Loading..." nếu state loading = true
    if (loading) {
        return <h2>Loading ...</h2>;
    }

    return (
        <>
            {console.log("render")}

            <h2>Content type: {type}</h2>

            {/* Dùng vòng lặp và mảng để tạo 3 button ứng với 3 content type: "posts", "comments", "albums" */}
            {["posts", "comments", "albums"].map((element, index) => (
                <button
                    key={index}
                    // set state type ứng với button được click
                    onClick={() => setType(element)}
                    // Nếu state type trùng với button nào thì set backgroundColor của button đó thành màu đỏ
                    style={type === element ? { backgroundColor: "red" } : {}}
                >
                    {element}
                </button>
            ))}

            {/* Hiển thị content lên giao diện */}
            <ul>
                {content.map((item) => (
                    <li key={item.id}>
                        {item.title || item.body}
                        {/* Nếu có title thì hiển thị title, nếu không có title thì hiển thị body */}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Post;