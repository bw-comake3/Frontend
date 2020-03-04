import React, { useEffect, useState } from "react"
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";


import useInput from "../../hooks/input";
import { getIssueById, upVote, downVote } from "../../actions";

const ProtectedRouteIssue = ({ history, issues, getIssueById, upVote, downVote }) => {
    const match = useRouteMatch()
    useEffect(() => {
        getIssueById(match.params.id)
    },[])
    
return (
    <div>
        <div>
            <button onClick={ () => history.push("/dashboard") }>Go Back</button>
            {(issues)? issues.map(issue => (
                <div key={ Math.random() }>
                    <p>{issue.issue}</p>
                    <p>{issue.description}</p>
                    <p>Votes {issue.vote}</p>
                    <button onClick={ () => upVote(issue.id, issue) }>UpVote</button>
                    <button onClick={ () => downVote(issue.id, issue) }>DownVote</button>
                    <p>{issue.city}</p>
                    <p>{issue.zip}</p>
                </div>
            )): <p>Loading</p>}
        </div>
    </div>
) }

const mapStateToProps = (state) => {
    return { ...state, issues: state.issues }
}

export default connect(mapStateToProps, { getIssueById, upVote, downVote })(ProtectedRouteIssue)