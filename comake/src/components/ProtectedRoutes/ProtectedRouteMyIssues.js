import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUserIssues, upVote, downVote, editIssue, deleteIssue } from "../../actions";

const ProtectedRouteMyIssues = ({ history, getUserIssues, issues, upVote, downVote }) => {
    useEffect(() => {
        getUserIssues()
    } ,[getUserIssues])
    const logout = () => {
        localStorage.removeItem("token")
        history.push("/")
    }
return (
    <div>
        <button onClick={ logout }>Log Out</button>
        <button onClick={ () => history.push("/addIssue") }>Add an Issue</button>
        <button onClick={ () => history.push("/dashboard") }>Go Back</button>
        {(issues) ?
        issues.map(issue => 
        <div key={ Math.random() }>
            <p><Link to={ `/myIssues/${ issue.id }` }>{ issue.issue }</Link></p>
            <p>{ issue.description }</p>
            <p>Votes { issue.vote }</p>
            <button onClick={ () => upVote(issue.id, issue) }>UpVote</button>
            <button onClick={ () => downVote(issue.id, issue) }>DownVote</button>
            <p>City: {issue.city}</p>
            <p>Zip: { issue.zip }</p>
        </div>
        ):<p>loading</p> }
    </div>
) }

const mapStateToProps = (state) => {
    return {
        ...state, issues: state.issues
    }
}

export default connect(mapStateToProps, { getUserIssues, upVote, downVote, editIssue, deleteIssue })(ProtectedRouteMyIssues)