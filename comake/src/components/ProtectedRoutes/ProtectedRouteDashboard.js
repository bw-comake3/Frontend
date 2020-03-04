import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getIssues, upVote, downVote, addIssue } from "../../actions";

const useStyles = makeStyles({
    root: {
      maxWidth: 800,
      marginTop: 20,
    },
  });

const ProtectedRouteDashboard = ({ history, getIssues, issues, upVote, downVote, id }) => {
    const classes = useStyles();
    useEffect( () => {
        getIssues()
        console.log(id)
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
            <button onClick={ () => history.push("/addIssue") }>Add an Issue</button>
            <button onClick={ () => history.push("/myIssues") }>My Issues</button>
            <button onClick={ logout }>Log Out</button>
            {(issues) ?
            issues.map(issue => 
            <Card className={classes.root}  key={ Math.random() }>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2"><Link to={ `/issues/${ issue.id }` }>{ issue.issue }</Link></Typography>
                <Typography >{ issue.description }</Typography>
                <Typography>Votes { issue.vote }</Typography>
                </CardContent>
                <Button size="small" color="primary" onClick={ () => upVote(issue.id, issue) }>UpVote</Button><Button size="small" color="primary" onClick={ () => downVote(issue.id, issue) }>DownVote</Button>
                <p>City: {issue.city}</p>
                <p>Zip: { issue.zip }</p>
            </Card>
            ):<p>loading</p> }
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