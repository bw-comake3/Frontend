import React from "react";
import * as Yup from "yup";
import axiosWithAuth from "../../utils/axiosWithAuth";
// import { Button, Card, Row, Col} from 'react-materialize';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
 
 
import useInput from "../../hooks/input";
 
 
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
 
export default function Login({ history, values, errors, touched }) {
  //history.push('/signIn')
  const [username, setUsername, handleUsername] = useInput("");
  const [password, setPassword, handlePassword] = useInput("");
  const handleSubmit = e => {
    console.log({ username, password });
    e.preventDefault();
    axiosWithAuth()
      .post("/api/auth/login", { username, password })
      .then(res => localStorage.setItem("token", res.data.token))
      .catch(err => console.log(err.message));
      setUsername("")
      setPassword("")
      history.push("/dashboard")
  };
  // const validationSchema = () => Yup.object().shape({
  //     username: Yup.string().required('enter username'),
  //     password: Yup.string().required('enter password')
 
  // })
  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
 
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
       
      </Box>
    </Container>
    </div>
  );
}


{/* <div>
<form onSubmit={handleSubmit}>
  <div className='input-field'>
  <label htmlFor='username'>username</label>
  <input
    type="text"
    required
    name="username"
    onChange={e => handleUsername(e.target.value)}
  />
  </div>
 
  {/* {touched.username && errors.username && <p className ="errors">* {errors.username}</p>} */}
  // <div className='input-field'>
  // <label htmlFor='password' >password</label>
  // <input
  //   type="password"
  //   required
  //   id="password"
  //   onChange={e => handlePassword(e.target.value)}
  // />
  // </div>
  
  
  {/* {touched.password && errors.password && <p className = 'errors'>* {errors.password}</p>} */}
  // <Button node="button" type="submit" waves="light">
  //  Log In
    {/* <Icon right>send</Icon> */}
  {/* </Button> */}
  
 
{/* </form> */} 