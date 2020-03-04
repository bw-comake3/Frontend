import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import { upVote, downVote, editIssue, deleteIssue, getIssueById } from "../../actions";
import useInput from "../../hooks/input";

const ProtectedRouteMyIssue = ({ history, issues, upVote, downVote, editIssue, deleteIssue, getIssueById }) => {
    const match = useRouteMatch()
    useEffect(() => {
        getIssueById(match.params.id)        
    }, [])
    const logout = () => {
        localStorage.removeItem("token")
        history.push("/")
    }
    
    const [isEditing, setIsEditing] = useState(false)
    const [name, handleName] = useInput("")
    const [desc, handleDesc] = useInput("")
    const [city, handleCity] = useInput("")
    const [zip, handleZip] = useInput("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        editIssue(match.params.id, { issue: name, description: desc, city, zip })
        setIsEditing(!isEditing)
        setTimeout(() => history.push("/myIssues"), 500)    
    }
    
return (
    <div>
        <button onClick={ logout }>Log Out</button>
        <button onClick={ () => history.push("/addIssue") }>Add an Issue</button>
        <button onClick={ () => history.push("/dashboard") }>Go Back</button>
        {(issues) ?
        issues.map(issue => 
        <div key={ Math.random() }>
            <p>{ issue.issue }</p>
            <p>{ issue.description }</p>
            <p>Votes { issue.vote }</p>
            <button onClick={ () => upVote(issue.id, issue) }>UpVote</button>
            <button onClick={ () => downVote(issue.id, issue) }>DownVote</button>
            <p>City: {issue.city}</p>
            <p>Zip: { issue.zip }</p>
        <button onClick={ () => setIsEditing(!isEditing) }>Edit Issue</button>
        <button onClick={ () => {
            deleteIssue(match.params.id)
            history.push("/dashboard")
            } }>Delete Issue</button>
        </div>
        ):<p>loading</p> }
         {(isEditing) ?
                <form onSubmit={ handleSubmit }>
                    <input required name="name" type="text" placeholder="Issue" onChange={ e => handleName(e.target.value) }  />
                    <input required name="desc" type="text" placeholder="Description" onChange={ e => handleDesc(e.target.value) } />
                    <input required name="city" type="text" placeholder="City" onChange={ e => handleCity(e.target.value) } />
                    <input required name="zip" type="text" placeholder="Zip Code" onChange={ e => handleZip(e.target.value) } /> 
                    <button type="submit">Save</button>
                </form> : null}
    </div>
    )
}

const mapStateToProps = (state) => {
    return { ...state, issues: state.issues }
}

export default connect(mapStateToProps, { upVote, downVote, editIssue, deleteIssue, getIssueById })(ProtectedRouteMyIssue)