import React from "react";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
 
import useInput from "../../hooks/input";
import { connect } from "react-redux";
import { login } from "../../actions";
 
 
const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
 
const Login = ({ history, values, errors, touched, login, getUsers }) => {
    const [username, setUsername, handleUsername] = useInput("");
    const [password, setPassword, handlePassword] = useInput("");
    const handleSubmit = e => {
        e.preventDefault();
        login({ username, password })
        setUsername("")
        setPassword("")
        setTimeout(() => history.push("/dashboard"), 1000)
    };
  // const validationSchema = () => Yup.object().shape({
  //     username: Yup.string().required("enter username"),
  //     password: Yup.string().required("enter password")
  // })
    const classes = useStyles();
return (
    <div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} />
                <Typography component="h1" variant="h5">Log In</Typography>
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
                        className={classes.submit}
                    >Log In</Button>
                </form>
                <Typography>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
            </div>
        </Container>
    </div>
)}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, { login })(Login)