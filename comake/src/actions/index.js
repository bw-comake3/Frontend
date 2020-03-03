import axios from "axios";

import axiosWithAuth from "./../utils/axiosWithAuth";

export const GET_USERS = "GET_USERS";
export const GET_ALL_ISSUES = "GET_ALL_ISSUES";
export const GET_SPEC_ISSUE = "GET_SPEC_ISSUE";
export const DELETE_SPEC_ISSUE = "DELETE_SPEC_ISSUE";
export const ADD_ISSUE = "ADD_ISSUE";
export const EDIT_ISSUE = "EDIT_ISSUE";
export const DELETE_ISSUE = "DELETE_ISSUE";
export const ADD_USER = "ADD_USER";
export const ADD_VOTE = "ADD_VOTE";
export const SUBTRACT_VOTE = "SUBTRACT_VOTE";
export const IS_LOADING = "IS_LOADING";

export const getUsers = () => dispatch => {
    axios
        .get("https://comake-3.herokuapp.com/api/auth/users")
        .then(res => console.log("these are users", res.data))
}

export const register = (user) => dispatch => {
    dispatch({ type: IS_LOADING })
        console.log(user)
        axios
            .post("https://comake-3.herokuapp.com/api/auth/register", user)
            .then(res => 
                axios
                    .post("https://comake-3.herokuapp.com/api/auth/login", user)
                    .then(res => localStorage.setItem("token", res.data.token))
                    .catch(err => console.log("error logging in automatically", err.message)))
            .catch(err => console.log("error signing up",err.message))
}

export const login = (user) => dispatch => {
    dispatch({ type: IS_LOADING })
    axiosWithAuth()
    .post("/api/auth/login", user)
    .then(res => localStorage.setItem("token", res.data.token))
    .catch(err => console.log(err.message));
}

export const getIssues = () => dispatch => {
    
}

export const getMyIssues = (id) => dispatch => {
    
}

export const addIssue = (issue) => dispatch => {
    
}

export const editIssue = (issue) => dispatch => {
    
}

export const deleteIssue = (id) => dispatch => {
    
}

export const upVote = () => dispatch => {
    
}

export const downVote = () => dispatch => {
    
}
export const loading = () => dispatch => {
    
}