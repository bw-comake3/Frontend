import React,{useState} from 'react'
import { connect } from "react-redux";

import { addIssue } from "../../actions";
import useInput from "../../hooks/input";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
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
  }));

const ProtectedRouteAddIssue = ({ history, addIssue }) => {

    const classes = useStyles();

    const [name, handleName] = useInput("")
    const [desc, handleDesc] = useInput("")
    const [city, handleCity] = useInput("")
    const [zip, handleZip] = useInput("")
    
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const handleAddIssue = (e) => {
        e.preventDefault()
        addIssue({ issue: name, description: desc, city, zip })
        setTimeout(() => history.push("/dashboard"), 500) 
    }
return (
    <form>
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
        
        <form onSubmit={ handleAddIssue }>
            <p>Be sure to fill out all fields, if adding an issue.</p>
            <input required name="name" type="text" placeholder="Issue" onChange={ e => handleName(e.target.value) }  />
            <textarea required name="desc" type="text" placeholder="Description" onChange={ e => handleDesc(e.target.value) } />
            <input required name="city" type="text" placeholder="City" onChange={ e => handleCity(e.target.value) } />
            <input required name="zip" type="text" placeholder="Zip Code" onChange={ e => handleZip(e.target.value) } /> 
            <Button variant="contained" color="primary" type="submit">Add Issue</Button>
        </form>
    </form>
    )}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, { addIssue })(ProtectedRouteAddIssue)