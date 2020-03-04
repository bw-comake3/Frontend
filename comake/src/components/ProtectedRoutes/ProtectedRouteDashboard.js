import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getIssues } from "../../actions";

const ProtectedRouteDashboard = ({ history, getIssues, issues }) => {
    useEffect( () => {
        getIssues()
    }, [getIssues])
    const logout = () => {
        localStorage.removeItem("token")
        history.push("/")
    }
    return (
        <div>
            {(issues) ?
            issues.map(issue => 
            <div key={ Math.random() }>
                <p><Link to={ `/issues/${ issue.id }` }>{issue.issue}</Link></p>
                <p>{issue.description}</p>
                <p>{issue.vote}</p>
                <p>{issue.city}</p>
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

export default connect(mapStateToProps, { getIssues })(ProtectedRouteDashboard)