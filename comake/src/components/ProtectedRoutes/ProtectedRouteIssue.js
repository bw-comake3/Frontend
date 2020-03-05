import React, { useEffect, useState } from "react"
import { useRouteMatch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useInput from "../../hooks/input";

import { getIssueById, upVote, downVote } from "../../actions";

const useStyles = makeStyles (theme => ({

    root: {

      maxWidth: '65vw',
      width: '65vw',
      marginTop: 20,
    },
    nava: {
        height: '150px',

    },
    navBar: {
        backgroundColor: '#17202A',
        color: '#E5E7E9',
        marginBottom: '100px',
        height: '100%'
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



const ProtectedRouteIssue = ({ history, issue, getIssueById, upVote, downVote }) => {
    const classes = useStyles();
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const match = useRouteMatch()
    useEffect(() => {
        getIssueById(match.params.id)
    },[getIssueById])
    
return (
  <div>
        <div className={classes.nava}>
            <Navbar className={classes.navBar} dark>
                <NavbarBrand href="/" fontWeight='bold' className="mr-auto">Comake</NavbarBrand>
       <NavbarToggler backgroundColor="white" onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed}>
                <Nav  className={classes.navbar} >
                    <NavLink onClick={ () => history.push("/dashboard") }>Go Back</NavLink>
                </Nav>
            </Collapse>
         </Navbar>
         </div>
    <div>
      {issue ? 
          <Card className={classes.card} key={Math.random()}>
            <CardContent>
              <Typography size="large" gutterBottom variant="h5" component="h2">
                {issue.issue}
              </Typography>
              <Typography>{issue.description}</Typography>
              <Typography className="centerText">
                <div className="displayFlex">
                  <div>Votes </div>
                  <div className="DecorateVoteNum">{issue.vote}</div>
                </div>
              </Typography>
            </CardContent>
            <Divider className={classes.divider} light />
            <CardActions className="cActions">
              <div className="flex-row">
                <div>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => upVote(issue.id, issue)}
                  >
                    UpVote
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => downVote(issue.id, issue)}
                  >
                    DownVote
                  </Button>
                </div>
                <div className="flex-row2">
                  <Typography>City: {issue.city}</Typography>
                  <Typography>Zip: {issue.zip}</Typography>
                </div>
              </div>
            </CardActions>
          </Card> : <p>Loading</p>
      }
    </div>
  </div>
); }

const mapStateToProps = (state) => {
    return { ...state, issue: state.singleIssue }
}

export default connect(mapStateToProps, { getIssueById, upVote, downVote })(ProtectedRouteIssue)