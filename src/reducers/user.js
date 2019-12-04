
const userSignUpReducer = (state = {}, action) => {
    switch(action.type){
        case 'SIGN_UP': {
            return {
                ...state,
                fullName: action.fullName,
                email: action.email
            }
        }
        default: return state;
    }
}

export default userSignUpReducer;