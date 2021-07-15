import { USER_ROLE } from "../actions/userRoleActions"
import {userRole } from "../initialValues/userRole"

const initialState = {
        userRole: userRole
}

export default function userRoleReducer(state = initialState, { type, payload }) {
        switch (type) {
           
                case USER_ROLE: 
                        return {
                                userRole: {role: payload}
                        }

                default:
                        return state;
        }
}