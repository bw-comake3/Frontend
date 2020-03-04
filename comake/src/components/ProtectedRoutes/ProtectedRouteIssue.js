import React, { useEffect, useState } from 'react'
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { getIssueById, editIssue, deleteIssue } from "../../actions";

import useInput from "../../hooks/input";

const ProtectedRouteIssue = ({ history, issues, getIssueById, editIssue, deleteIssue }) => {
    const [isEditing, setIsEditing] = useState(false)
    const match = useRouteMatch()
    useEffect(() => {
        getIssueById(match.params.id)
    } ,[]) 
    
    const [name, handleName] = useInput("")
    const [desc, handleDesc] = useInput("")
    const [city, handleCity] = useInput("")
    const [zip, handleZip] = useInput("")
    const handleSubmit = (e) => {
    e.preventDefault()
        editIssue(match.params.id, { issue: name, description: desc, city, zip })
        setIsEditing(!isEditing)
        history.push("/dashboard")
    }
    return (
        <div>
            <div>
                {(issues)? issues.map(issue => (
                    <div key={ Math.random() }>
                        <p>{issue.issue}</p>
                        <p>{issue.description}</p>
                        <p>Votes {issue.vote}</p>
                        <p>{issue.city}</p>
                        <p>{issue.zip}</p>
                        <button onClick={ () => setIsEditing(!isEditing) }>Edit Issue</button>
                        <button onClick={ () => {
                            deleteIssue(match.params.id)
                            history.push("/dashboard")
                         } 
                         }>Delete Issue</button>
                    </div>
                )): <p>Loading</p>}
                {(isEditing) ?
                    <form onSubmit={ handleSubmit }>
                        <input required name="name" type="text" placeholder="Issue" onChange={ e => handleName(e.target.value) }  />
                        <input required name="desc" type="text" placeholder="Description" onChange={ e => handleDesc(e.target.value) } />
                        <input required name="city" type="text" placeholder="City" onChange={ e => handleCity(e.target.value) } />
                        <input required name="zip" type="text" placeholder="Zip Code" onChange={ e => handleZip(e.target.value) } /> 
                        <button type="submit">Save</button>
                    </form> : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { ...state, issues: state.issues }
}

export default connect(mapStateToProps, { getIssueById, editIssue, deleteIssue })(ProtectedRouteIssue)