// Yêu cầu:
//     Khi mới vào trang, random 1 user bất kỳ từ mảng users để hiển thị (thông tin hiển thị bao gồm: name, email, address)
//     Click nút "Random user" sẽ hiển thị 1 user mới trong mảng (không trùng với user vừa được hiển thị gần nhất)
//     Click nút "Delete user" sẽ xóa user hiện tại khỏi mảng users
//     Khi mảng users chỉ còn 1 phần tử thì ẩn nút "Random user"
//     Khi mảng users không còn phần tử nào thì ẩn tiếp nút "Delete user" và hiển thị message "Không còn user nào trong danh sách" lên giao diện trong thẻ p

import React, { useState, useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Bùi Hiên",
      email: "hien@gmail.com",
      address: "Thái Bình"
    },
    {
      id: 2,
      name: "Thu Hằng",
      email: "hang@gmail.com",
      address: "Hải Dương"
    },
    {
      id: 3,
      name: "Minh Duy",
      email: "duy@gmail.com",
      address: "Hưng Yên"
    },
    {
      id: 4,
      name: "Trung Đức",
      email: "ducnguyen@gmail.com",
      address: "Hà Nội"
    },
    {
      id: 5,
      name: "Khánh Huyền",
      email: "huyen@gmail.com",
      address: "Sơn La"
    },
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);

  const getRandomIdx = () => {
    let random = currentIdx;
    while (random === currentIdx) {
      random = Math.floor(Math.random() * (users.length));
    }
    setCurrentIdx(random);
  }

  const deleteUser = () => {
    // tạo mảng mới gồm các phần tử từ mảng users nhưng ngoại trừ user có index = currentIdx
    const newUsers = users.filter((user, index) => index !== currentIdx);
    setUsers(newUsers);
  };
  
  // khi mảng users thay đổi thì random ra index mới cho currentIdx 
  useEffect(() => {
    if (users.length > 1) {
      getRandomIdx();
    }
  }, [users]);

  return (
    <div>
      {(users.length === 0) && (
        <p>Không có user nào trong danh sách</p>
      )}

      {(users.length !== 0) && (
        <div>
          <h1 style={{color: "red"}}>{users[currentIdx].name}</h1>
          <ul>
            <li>Email: {users[currentIdx].email}</li>
            <li>Address: {users[currentIdx].address}</li>
          </ul>
          {/* nút "Random user" chỉ hiển thị nếu mảng users có >= 2 phần tử */}
          {(users.length > 1) && (
            <button onClick={getRandomIdx}>Random user</button>
          )}
          <button onClick={deleteUser}>Delete user</button>
        </div>
      )}
    </div>
  );
}

export default App;