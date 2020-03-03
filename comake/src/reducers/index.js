import { combineReducers } from "redux";

const initState = {
    isLoading: false
}

export const testReducer = (state  = initState, action) => {
    switch (action.type){
        default:
            return state
        }
        
    }
    
export const rootReducer = combineReducers({test: testReducer}) 