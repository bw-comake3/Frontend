import React, { useEffect, useState } from 'react'
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { getIssueById, editIssue, deleteIssue } from "../../actions";

import useInput from "../../hooks/input";

const ProtectedRouteIssue = ({ issues, getIssueById, editIssue }) => {
    const [editing, setEditing] = useState(false)
    const [name, handleName] = useInput("")
    const [desc, handleDesc] = useInput("")
    const [city, handleCity] = useInput("")
    const handleSubmit = (e) => {
        e.preventDefault()
        editIssue(match.params.id, { name, desc, city })
        setEditing(false)
    }
    const match = useRouteMatch()
    useEffect(() => {
        getIssueById(match.params.id)
    } ,[getIssueById]) 
    return (
        <div>
            <div>
                {(issues)? issues.map(issue => (
                    <div key={ Math.random() }>
                        <p>{issue.issue}</p>
                        <p>{issue.description}</p>
                        <p>{issue.vote}</p>
                        <p>{issue.city}</p>
                        <button onClick={ () => {
                            setEditing(!editing)
                             }
                            }>Edit Issue</button>
                        {(editing) ? 
                            <form onSubmit={ handleSubmit }>
                                <input required
                                 type="text" placeholder="Issue" handleChange={ handleName }  />
                                <input required
                                 type="text" placeholder="Desc"  handleChange={ handleDesc } />
                                <input required
                                 type="text" placeholder="City"  handleChange={ handleCity } />
                                <button type="submit">Save</button>
                            </form> : null
                        }
                    </div>
                )): <p>Loading</p>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { ...state, issues: state.issues }
}

export default connect(mapStateToProps, { getIssueById, editIssue, deleteIssue })(ProtectedRouteIssue)