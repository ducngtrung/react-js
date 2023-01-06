import React, { useEffect, useState } from "react";

function Heading() {

    // Event
    useEffect(() => {
        const handleScroll = () => {
            console.log("scroll event");
        };

        // Đăng ký sự kiện: khi scroll trên cửa sổ trình duyệt thì thực hiện function xử lý sự kiện (handleScroll)
        window.addEventListener("scroll", handleScroll);

        // Clean up
        // Nếu không thực hiện clean up (xóa sự kiện) thì function handleScroll vẫn chạy kể cả khi Heading bị gỡ ra khỏi DOM (click button "Hide heading" trên giao diện) 
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Đưa hàm tính toán vào trong useState để chỉ phải thực hiện tính toán 1 lần khi tải trang
    const [time, setTime] = useState(() => {
        let now = new Date();
        return now.toLocaleString(); // Trả về date time hiện tại dưới dạng chuỗi
    });

    // Timer - setInterval (hàm này dùng để thực thi công việc sau mỗi khoảng thời gian timeout)
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("inside time interval");

            let now = new Date();
            setTime(now.toLocaleString());
        }, 1000); // timeout 1000ms nghĩa là sau mỗi giây sẽ setTime lại để update lên giao diện

        // Clean up
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h2>Heading component</h2>
            <h2>Time: {time}</h2>
        </>
    );
}

export default Heading;