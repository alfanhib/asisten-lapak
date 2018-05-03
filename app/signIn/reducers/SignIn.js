const INITIAL_STATE = {
    datas:[],
    isLoading:false,
    isError:false
};

export default loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_USER_PENDING":
            return {...state, isLoading:true}
        case "LOGIN_USER_FULFILLED":
            return {...state, isLoading:false, datas:action.payload.data}
        case "LOGIN_USER_REJECTED":
            return {...state, isLoading:false, isError:true}
        default: return state;
    }
};