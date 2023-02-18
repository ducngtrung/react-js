// snippet để popuplate code của component là "rxslice"

// Thay vì phải tạo riêng folder cho actions và reducers như Redux thông thường, với Redux Toolkit chỉ cần tạo folder slices để quản lý cả reducers và actions

import { createSlice } from '@reduxjs/toolkit'

// Khởi tạo state ban đầu của counter là một object có value = 0
const initialState = {
    value : 0
}

const counterSlice = createSlice({
  name : "counter",
  initialState,
  reducers : {   // định nghĩa các action của counter reducer
    decrement : (state, action) => {
      state.value -= 1;   // Redux Toolkit sử dụng thư viện Immer.js giúp thay đổi trực tiếp giá trị state (không cần clone theo cách return { ...state, value: state.value - 1 })
    },
    increment : (state, action) => {
        state.value += 1;
    }
  }
});

// "increment", "decrement" là các action
// value của name sẽ ghép với từng action trong reducers để tạo thành action type
//    VD: action type "counter/increment"

// Export các action để về sau có thể dispatch action từ component
export const {increment, decrement} = counterSlice.actions

export default counterSlice.reducer