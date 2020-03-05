import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { upVote, downVote, editIssue, deleteIssue, getIssueById } from "../../actions";
import useInput from "../../hooks/input";

const useStyles = makeStyles (theme => ({

    root: {

      maxWidth: '65vw',
      width: '65vw',
      marginTop: 20,
    },
    card: {
        maxWidth: '65vw',
        
        width: '65vw',
        margin: "10px",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
      },
      divider: {
        margin: `px 0`,
        padding:'0px 20 0 20'
      },
  }));


const ProtectedRouteMyIssue = ({ history, issues, upVote, downVote, editIssue, deleteIssue, getIssueById }) => {
    const classes = useStyles();

    const match = useRouteMatch()
    useEffect(() => {
        getIssueById(match.params.id)        
    }, [])
    const logout = () => {
        localStorage.removeItem("token")
        history.push("/")
    }
    
    const [isEditing, setIsEditing] = useState(false)
    const [name, handleName] = useInput("")
    const [desc, handleDesc] = useInput("")
    const [city, handleCity] = useInput("")
    const [zip, handleZip] = useInput("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        editIssue(match.params.id, { issue: name, description: desc, city, zip })
        setIsEditing(!isEditing)
        setTimeout(() => history.push("/myIssues"), 500)    
    }
    
return (
    <div>
        <button onClick={ logout }>Log Out</button>
        <button onClick={ () => history.push("/addIssue") }>Add an Issue</button>
        <button onClick={ () => history.push("/dashboard") }>Go Back</button>

        {(issues) ?
        issues.map(issue => 
        <Card className={classes.card}  key={ Math.random() }>
             <CardContent>
                <Typography size='large' gutterBottom variant="h5" component="h2">{ issue.issue }</Typography>
                <Typography>{ issue.description }</Typography>
                <Typography className="centerText">
                    <div className="displayFlex">
                        <div>Votes </div>
                        <div className="DecorateVoteNum">{ issue.vote }</div>
                    </div>
                </Typography>
             </CardContent>
             <Divider className={classes.divider} light />
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
                </CardActions>
        <button onClick={ () => setIsEditing(!isEditing) }>Edit Issue</button>
        <button onClick={ () => {
            deleteIssue(match.params.id)
            history.push("/dashboard")
            } }>Delete Issue</button>
        </Card>
        ):<p>loading</p> }
         {(isEditing) ?
                <form onSubmit={ handleSubmit }>
                    <input required name="name" type="text" placeholder="Issue" onChange={ e => handleName(e.target.value) }  />
                    <input required name="desc" type="text" placeholder="Description" onChange={ e => handleDesc(e.target.value) } />
                    <input required name="city" type="text" placeholder="City" onChange={ e => handleCity(e.target.value) } />
                    <input required name="zip" type="text" placeholder="Zip Code" onChange={ e => handleZip(e.target.value) } /> 
                    <button type="submit">Save</button>
                </form> : null}
    </div>
    )
}

const mapStateToProps = (state) => {
    return { ...state, issues: state.issues }
}

export default connect(mapStateToProps, { upVote, downVote, editIssue, deleteIssue, getIssueById })(ProtectedRouteMyIssue)