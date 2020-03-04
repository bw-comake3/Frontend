import axios from "axios";

import axiosWithAuth from "./../utils/axiosWithAuth";

export const GET_ALL_ISSUES = "GET_ALL_ISSUES";
export const GET_USER_ISSUES = "GET_USER_ISSUES";
export const GET_SPEC_ISSUE = "GET_SPEC_ISSUE";
export const DELETE_SPEC_ISSUE = "DELETE_SPEC_ISSUE";
export const ADD_ISSUE = "ADD_ISSUE";
export const EDIT_ISSUE = "EDIT_ISSUE";
export const DELETE_ISSUE = "DELETE_ISSUE";
export const VOTE = "VOTE";

export const register = (user) => dispatch => {
        axios
            .post("https://comake-3.herokuapp.com/api/auth/register", user)
            .then(res => 
                axios
                    .post("https://comake-3.herokuapp.com/api/auth/login", user)
                    .then(res => {
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("id", res.data.id)
                        console.log(res)
                    })
                    .catch(err => console.log("error logging in automatically", err.message)))
            .catch(err => console.log("error signing up",err.message))
}

export const login = (user) => dispatch => {
    axiosWithAuth()
    .post("/api/auth/login", user)
    .then(res => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("id", res.data.id)
    })
    .catch(err => console.log(err.message));
}

export const getIssues = () => dispatch => {
    axiosWithAuth()
    .get("/api/issues")
    .then(res => {
        dispatch({ type: GET_ALL_ISSUES, issues: res.data })
    })
}

export const getUserIssues = () => dispatch => {
    axiosWithAuth()
        .get(`/api/${ localStorage.getItem("id") }/issues`)
        .then(res => dispatch({ type:GET_USER_ISSUES, issues: res.data }))
}

export const getIssueById = (id) => dispatch => {
    axiosWithAuth()
        .get(`/api/issues/${ id }`)
        .then(res => { dispatch({ type: GET_SPEC_ISSUE, issue: res.data }) })
}


export const addIssue = (issue) => dispatch => {
    console.log(issue)
    axiosWithAuth()
        .post(`/api/${ localStorage.getItem("id") }/issues`, issue)
        .then(res => dispatch({ type: ADD_ISSUE, issue: res.data }))
        .catch(err => console.log("there was an error adding issue", err.message))
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

export const upVote = (id, issue) => dispatch => {
    console.log("this is issue in vote", issue)
    axiosWithAuth()
        .patch(`/api/issues/${ id }`, { vote: issue.vote + 1 })
        .then(res => dispatch({ type: VOTE, issue: res.data }))
}

export const downVote = (id, issue) => dispatch => {
    console.log("this is issue in vote", issue)
    axiosWithAuth()
        .patch(`/api/issues/${ id }`, { vote: issue.vote - 1 })
        .then(res => dispatch({ type: VOTE, issue: res.data }))
}