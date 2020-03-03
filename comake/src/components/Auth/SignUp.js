import React from 'react'
import axios from "axios";
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
 
import useInput from "../../hooks/input"

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

export default function SignUp({ history, values, errors, touched}) {
  //history.push('/signIn')
  const [username, setUsername, handleUsername] = useInput('');
  const [password, setPassword, handlePassword] = useInput('');
  const handleSubmit = (e) => {
      console.log({ username: username, password: password })
      e.preventDefault()
      axios
          .post("http://localhost:5000/api/auth/register", { username: username, password: password })
          .then(res => console.log("this is response from login", res))
          .catch(err => console.log(err.message))
  }
  const validationSchema = () => Yup.object().shape({
      username: Yup.string().required('enter username'),
      password: Yup.string().required('enter password')
      
  })
  return (
    <div>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>

      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
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
              
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up!
        </Button>
      </form>
    </div>
    <Box mt={8}>
     
    </Box>
  </Container>
  </div>
  )
}

