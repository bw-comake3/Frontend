import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { getUserIssues, upVote, downVote, editIssue, deleteIssue } from "../../actions";


const useStyles = makeStyles (theme => ({

    root: {

      maxWidth: "65vw",
      width: "65vw",
      marginTop: 20,
    },
    nava: {
        height: "150px",

    },
    navBar: {
        backgroundColor: "#17202A",
        color: "#E5E7E9",
        marginBottom: "100px",
        height: "100%"
    },
    card: {
        maxWidth: "65vw",
        
        width: "65vw",
        margin: "10px",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
      },
      divider: {
        margin: `px 0`,
        padding:"0px 20 0 20"
      },
  }));


const ProtectedRouteMyIssues = ({ history, getUserIssues, issues, upVote, downVote }) => {
    
    const classes = useStyles();
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        getUserIssues()
    } ,[getUserIssues])
    const logout = () => {
        localStorage.removeItem("token")
        history.push("/")
    }
return (
    <div>
        <div className={classes.nava}>
            <Navbar className={classes.navBar} dark>
                <NavbarBrand href="/" fontWeight="bold" className="mr-auto">Comake</NavbarBrand>
                <NavbarToggler backgroundcolor="white" onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed}>
                    <Nav  className={classes.navbar} >
                        <NavItem>
                            <NavLink onClick={ () => history.push("/addIssue") }>Add an Issue</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={ () => history.push("/dashboard") }>Go Back</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={ logout }>Log Out</NavLink>
                        </NavItem>   
                    </Nav>
                </Collapse>
            </Navbar>
        </div>    

       
        
        
        
        {(issues) ?
        issues.map(issue => 
            <Card className={classes.card}  key={ Math.random() }>
                <CardContent>
                    <Typography size="large" gutterBottom variant="h5" component="h2"><Link to={ `/myIssues/${ issue.id }` }>{ issue.issue }</Link></Typography>
                    <Typography >{ issue.description }</Typography>
                    <div className="centerText">
                        <div className="displayFlex">
                            <div>Votes </div>
                            <div className="DecorateVoteNum">{ issue.vote }</div>
                        </div>
                    </div>
                </CardContent>
                <Divider className={classes.divider} light />
                <CardActions className="cActions">
                    <div className="flex-row">
                        <div>      
                            <Button size="small" color="primary" onClick={ () => upVote(issue.id, issue) }>UpVote</Button>
                            <Button size="small" color="primary" onClick={ () => downVote(issue.id, issue) }>DownVote</Button>
                        </div>
                        <div className="flex-row2">
                            <Typography>City: {issue.city}</Typography>
                            <Typography>Zip: { issue.zip }</Typography>
                        </div>
                    </div>
                </CardActions>
            </Card>
        ):<p>loading</p> }
    </div>
) }

const mapStateToProps = (state) => {
    return {
        ...state, issues: state.issues
    }
}

export default connect(mapStateToProps, { getUserIssues, upVote, downVote, editIssue, deleteIssue })(ProtectedRouteMyIssues)