const initialState = {
    data: [],
    editData: {},
}

const userDetails = (state = initialState, action) => {
    console.log('SET_EDIT',state.data)
    switch (action.type) {
        case "USER_DETAILS":
            return {
                ...state, data: action.payload
            }
        case "USER_DELETE":
            return {
                ...state, data: state.data.filter((item, i) => i !== action.payload)
            }
        case "USER_EDIT":
            const findData = state.data.find((item, i) => i === action.payload)
            return {
                ...state, editData: { ...findData, index: action.payload }
            }

        default:
            return state;
    }
}

export default userDetails