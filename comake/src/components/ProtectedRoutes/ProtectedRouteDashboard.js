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

      maxWidth: '65vw',
      width: '65vw',
      marginTop: 20,
    },
    // cActions: {
    //     display: 'flex',
    //     justifyContent: 'space-between'
    // }
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
                    <Typography className="centerText">
                        <div className="displayFlex">
                            <div>Votes </div>
                            <div className="DecorateVoteNum">{ issue.vote }</div>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions className='cActions'>
                    <div className="flex-row">
                        <div>      
                            <Button size="small" color="primary" onClick={ () => upVote(issue.id, issue) }>UpVote</Button><Button size="small" color="primary" onClick={ () => downVote(issue.id, issue) }>DownVote</Button>
                        </div>
                        <div className="flex-row2">
                            <Typography>City: {issue.city}</Typography>
                            <Typography>Zip: { issue.zip }</Typography>
                        </div>
                    </div>
                    <div>
                        <img className="imgSize" src="https://cdn.pixabay.com/photo/2017/06/16/07/27/under-construction-2408066_960_720.png" alt="test image"/>
                    </div>
                </CardActions>
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