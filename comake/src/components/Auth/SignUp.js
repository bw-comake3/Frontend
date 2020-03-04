import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import useInput from "../../hooks/input"
import { register } from "../../actions";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const SignUp = ({ history, values, errors, touched, register, getUsers}) => {
    const classes = useStyles(); 
    const [username, handleUsername] = useInput('');
    const [password, handlePassword] = useInput('');
    const validationSchema = () => yup.object().shape({
        username: yup.string().required('enter username'),
        password: yup.string().required('enter password')  
  })
    const handleSubmit = (e) => { 
        e.preventDefault()
        register({ username, password })
        setTimeout(() => history.push("/dashboard"), 2000)
    }
return (
    <div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} />
                <Typography component="h1" variant="h5">Sign Up</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={e => handleUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => handlePassword(e.target.value)}
                    />
                  
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                    Sign Up!</Button>
                </form>
                <Typography>Already have an account? <Link to="/">Log In</Link></Typography>
            </div>
        </Container>
    </div>
)
}


const mapStateToProps = (state) => {
  return { state }
}

export default connect(mapStateToProps, { register })(SignUp)