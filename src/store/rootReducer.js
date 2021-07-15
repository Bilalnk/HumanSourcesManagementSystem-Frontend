import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer"
import userRoleReducer from "./reducers/userRoleReducer"

const rootReducer = combineReducers({
        user: userReducer,
        role: userRoleReducer

})

export default rootReducer;