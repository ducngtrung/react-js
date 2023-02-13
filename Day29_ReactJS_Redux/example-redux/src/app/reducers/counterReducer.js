// Khởi tạo state ban đầu của counter là một object có value = 0
const initialState = {
    value : 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "counter/decrement": {
            return { ...state, value: state.value - 1 }
        }
        case "counter/increment": {
            return { ...state, value: state.value + 1 }
        }
        default: {
            return state;
        }
    }
}

export default counterReducer;