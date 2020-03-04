import { combineReducers } from "redux";
import {
GET_USERS,
GET_ALL_ISSUES,
GET_SPEC_ISSUE,
DELETE_SPEC_ISSUE,
ADD_ISSUE,
EDIT_ISSUE,
DELETE_ISSUE,
ADD_USER,
ADD_VOTE,
SUBTRACT_VOTE
} from "../actions";

const initState = {
    users: [],
    issues: []
}

export const rootReducer = (state  = initState, action) => {
    switch (action.type){
        case GET_USERS:
            return { ...state, users: action.users }
        case GET_ALL_ISSUES:
            return { ...state, issues: action.issues }  
        case GET_SPEC_ISSUE:
            return { ...state, issues: [action.issue] }
        case EDIT_ISSUE:
            return { ...state, issues: state.issues.map(issue => (issue.id === action.issue.id) ? action.issue[0] : issue) }     
        case DELETE_SPEC_ISSUE:
            return { ...state, issues: state.issues.filter(issue => issue.id === action.id) }         
        default:
            return state
        }
        
    }
     