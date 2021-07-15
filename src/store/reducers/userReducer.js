import { LOGIN, LOGOUT } from "../actions/userActions"
import { currentUser } from "../initialValues/currentUser"

const initialState = {
        currentUser: currentUser,
}

export default function userReducer(state = initialState, { type, payload }) {
        switch (type) {
                case LOGIN:
                        return {
                                
                                currentUser: { user: payload }
                        }
                
                case LOGOUT: 
                        return {
                                // ...state,
                                // currentUser: state.currentUser.filter(u => u.id !== payload.id) 
                        }
                default:
                        return state;
        }
}