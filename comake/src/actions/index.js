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

export const getUsers = () => dispatch => {
    axios
        .get("https://comake-3.herokuapp.com/api/auth/users")
        .then(res => { dispatch({ type: GET_USERS, users: res.data }) })
}

export const register = (user) => dispatch => {
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
    axiosWithAuth()
    .post("/api/auth/login", user)
    .then(res => localStorage.setItem("token", res.data.token))
    .catch(err => console.log(err.message));
}

export const getIssues = () => dispatch => {
    axiosWithAuth()
    .get("/api/issues")
    .then(res => {
        dispatch({ type: GET_ALL_ISSUES, issues: res.data })
    })
}

export const getIssueById = (id) => dispatch => {
    axiosWithAuth()
        .get(`/api/issues/${ id }`)
        .then(res => { dispatch({ type: GET_SPEC_ISSUE, issue: res.data }) })
}

export const getMyIssues = (id) => dispatch => {
    
}

export const addIssue = (issue) => dispatch => {
    console.log(issue)
    axiosWithAuth()
        .post(`/api/${ Math.floor(Math.random() * 1000) + 1 }/issues/`, issue)
        .then(res => console.log(res))
}

export const editIssue = (id, issue) => dispatch => {
    axiosWithAuth()
        .put(`/api/issues/${ id }`, issue)
        .then(res => console.log("response from put", res))
}

export const deleteIssue = (id) => dispatch => {
    axiosWithAuth()
        .delete(`/api/issues/${ id }`)
        .then(res => dispatch({ type: DELETE_SPEC_ISSUE, id }))
}

export const upVote = (id) => dispatch => {
    axiosWithAuth()
}

export const downVote = (id) => dispatch => {
    axiosWithAuth()
}
export const loading = () => dispatch => {
    
}