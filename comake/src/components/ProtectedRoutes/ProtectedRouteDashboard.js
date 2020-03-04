import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getIssues, upVote, downVote, addIssue } from "../../actions";
import useInput from "../../hooks/input";

const ProtectedRouteDashboard = ({ history, getIssues, issues, upVote, downVote, addIssue }) => {
    useEffect( () => {
        getIssues()
    }, [getIssues])
    const logout = () => {
        localStorage.removeItem("token")
        history.push("/")
    }
    const handleSubmit = (e) => { 
        e.preventDefault()
        return null 
    }
    return (
        <div>
            <button><Link to="/addIssue">Add an Issue</Link></button>
            {(issues) ?
            issues.map(issue => 
            <div key={ Math.random() }>
                <p><Link to={ `/issues/${ issue.id }` }>{ issue.issue }</Link></p>
                <p>{ issue.description }</p>
                <p>Votes { issue.vote }</p>
                <button onClick={ () => upVote(issue.id) }>UpVote</button><button onClick={ () => downVote(issue.id) }>DownVote</button>
                <p>City: {issue.city}</p>
                <p>Zip: { issue.zip }</p>
            </div>
            ):<p>loading</p> }
            <button onClick={ logout }>Log Out</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        ...state, issues: state.issues
    }
}

export default connect(mapStateToProps, { getIssues, upVote, downVote, addIssue })(ProtectedRouteDashboard)