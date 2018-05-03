const INITIAL_STATE = {
    datas:[],
    isLoading: false, 
    isError: false,
};


export default registerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "DATA_REGISTER_PENDING":
            return {...state, isLoading: true, isError: false};
        case "DATA_REGSITER_FULFILLED":
            state.datas.push(action.payload.data);
            return {...state, isLoading: false, datas: action.payload.data}
        case "DATA_REGISTER_REJECTED":
            return {...state, isLoading:false , isError:true }
        default: return state;
    }
};