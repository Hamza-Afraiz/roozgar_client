import { SET_CURRENT_USER } from "../actions/Auth.actions"
import isEmpty from "../../Components/is-empty"

export default function (state, action) {
    
    switch (action.type) {
        case SET_CURRENT_USER: 
        return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload,
            userProfile: action.userProfile,
            categoryId:action.categoryId
        };
        case SET_CURRENT_CATEGORY: 
        return {
            ...state,
            categoryId:action.payload
        };
        default:
            return state;
    }
}