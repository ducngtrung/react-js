// Phương thức này dùng để format chuỗi date về định dạng DD-MM-YYYY
export const formatDate = (dateString) => {
    // Khởi tạo đối tượng dạng Date từ chuỗi dateString
    const date = new Date(dateString);

    // thêm số 0 vào đầu giá trị của tháng và ngày rồi cắt lấy 2 ký tự tính từ cuối
    // VD: 1 => 01
    //     12 => 012 => 12
    //     10 => 010 => 10
    const day = `0${date.getDate()}`.slice(-2);

    // hàm getMonth() trả về giá trị tháng từ 0 đến 11, nên cần cộng thêm 1 để được tháng chính xác
    const month = `0${date.getMonth() + 1}`.slice(-2);

    const year = date.getFullYear();

    // Trả về chuỗi dạng DD-MM-YYYY
    return `${day}-${month}-${year}`
}