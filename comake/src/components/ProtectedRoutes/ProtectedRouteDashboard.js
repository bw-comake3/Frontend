import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getIssues, upVote, downVote, addIssue } from "../../actions";

const useStyles = makeStyles({
    root: {
      maxWidth: 800,
    },
  });

const ProtectedRouteDashboard = ({ history, getIssues, issues, upVote, downVote, id }) => {
    const classes = useStyles();
    useEffect( () => {
        getIssues()
    }, [getIssues, id, upVote, downVote])
    const logout = () => {
        localStorage.removeItem("token")
        history.push("/")
    }

    return (
        <div>
            
            
            <Button size="small" color="primary" onClick={ () => history.push("/addIssue") }>Add an Issue</Button><Button size="small" color="primary" onClick={ () => history.push("/myIssues") }>My Issues</Button>
            <Card className={classes.root}>
            {(issues) ?
            issues.map(issue => 
            <div key={ Math.random() }>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2"><Link to={ `/issues/${ issue.id }` }>{ issue.issue }</Link></Typography>
                <Typography variant="body2" color="textSecondary" component="p">{ issue.description }</Typography>
                <p>Votes { issue.vote }</p>
                </CardContent>
                <Button size="small" color="primary" onClick={ () => { 
                    upVote(issue.id, issue)
                    setTimeout(() => window.location.reload(), 500)
                    return false;
                } }>UpVote</Button>
                <Button size="small" color="primary" onClick={ () => { 
                    downVote(issue.id, issue)
                    setTimeout(() => window.location.reload(), 500)
                    return false;
                } }>DownVote</Button>
                
                <p>City: {issue.city}</p>
                <p>Zip: { issue.zip }</p>
            </div>
            ):<p>loading</p> }
            <button onClick={ logout }>Log Out</button>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log("this is state after render", state)
    return { 
        ...state, issues: state.issues
    }
}

export default connect(mapStateToProps, { getIssues, upVote, downVote, addIssue })(ProtectedRouteDashboard)