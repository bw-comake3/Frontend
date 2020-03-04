import {
GET_ALL_ISSUES,
GET_USER_ISSUES,
GET_SPEC_ISSUE,
DELETE_SPEC_ISSUE,
ADD_ISSUE,
EDIT_ISSUE,
VOTE,
} from "../actions";

const initState = {
    issues: []
}

export const rootReducer = (state  = initState, action) => {
    switch (action.type){
        case GET_ALL_ISSUES:
            return { ...state, issues: action.issues } 
        case GET_USER_ISSUES:
            return { ...state, issues: action.issues }         
        case GET_SPEC_ISSUE:
            return { ...state, issues: [action.issue] }
        case ADD_ISSUE:
            return { ...state, issues: [...state.issues, action.issue] }        
        case EDIT_ISSUE:
            return { ...state, issues: state.issues.map(issue => (issue.id === action.issue.id) ? action.issue[0] : issue) }     
        case DELETE_SPEC_ISSUE:
            return { ...state, issues: state.issues.filter(issue => issue.id === action.id) }   
        case VOTE:
            return { ...state, issues: state.issues.map(v => (v.id === action.issue.id) ? action.issue : v) }        
        default:
            return { ...state }
        }
        
    }
     