import React, { useEffect } from 'react'
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { getIssueById } from "../../actions";

const ProtectedRouteIssue = ({ issues, getIssueById }) => {
    const match = useRouteMatch()
    console.log("loaded successfully")
    useEffect(() => {
        getIssueById(match.params.id)
    } ,[getIssueById]) 
    return (
        <div>
            <div>
                {(issues)? issues.map(issue => (
                    <div>
                        <p>{issue.issue}</p>
                        <p>{issue.description}</p>
                        <p>{issue.vote}</p>
                        <p>{issue.city}</p>
                        <button onClick={ () =>  }></button>
                    </div>
                )): <p>Loading</p>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { ...state, issues: state.issues }
}

export default connect(mapStateToProps, { getIssueById })(ProtectedRouteIssue)