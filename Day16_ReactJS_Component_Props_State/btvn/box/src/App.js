// Yêu cầu:
//     Cập nhật số lượng total box trong thẻ <span> có class "points"
//     Render các box màu ra ngoài màn hình bằng javascrip, mỗi box được tạo bởi thẻ div có class="box", background tương ứng với từng mã màu
//     Khi click vào box bất kỳ thì box đó biến mất, đồng thời số lượng total box giảm đi 1
//     Khi click vào nút "More boxes" thì số lượng box tăng thêm 5 (tương ứng với 5 màu trong mảng colors), đồng thời số lượng total box cũng tăng thêm 5

import React, { useState } from 'react';

function App() {

  const originalColors = [
    '#3498db',
    '#9b59b6',
    '#e74c3c',
    '#2c3e50',
    '#d35400',
  ];

  const [colors, setColors] = useState(originalColors);

  const removeBox = (index) => {
    // tạo mảng mới gồm các phần tử từ mảng ban đầu nhưng ngoại trừ màu có index trùng với tham số truyền vào
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const moreBoxes = () => {
    // clone mảng màu hiện tại thành một mảng mới
    const newColors = [...colors];
    // thêm từng màu trong mảng originalColors vào cuối mảng vừa tạo
    originalColors.map(color => newColors.push(color));
    setColors(newColors);
  };

  return (
    <div className="wrap">
      <h1>JS DOM</h1>
      <button 
        id="btn" 
        onClick={moreBoxes}
      >
        More boxes
      </button>
      <h4 id="total">Total box: <span className="count">{colors.length}</span></h4>

      <div className="boxes">
        {colors.map((color, index) => (
          <div
            key={index}
            className="box"
            onClick={() => removeBox(index)}
            style={{
              backgroundColor: color
            }}>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;