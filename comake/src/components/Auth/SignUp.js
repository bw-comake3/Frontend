import React from 'react'
import * as yup from 'yup';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import useInput from "../../hooks/input"
import { register, getUsers } from "../../actions";
import { connect } from "react-redux";

const SignUp = ({ history, values, errors, touched, register, getUsers}) => {
    const [username, handleUsername] = useInput('');
    const [password, handlePassword] = useInput('');
    const validationSchema = () => yup.object().shape({
        username: yup.string().required('enter username'),
        password: yup.string().required('enter password')  
  })
    const handleSubmit = async (e) => { 
        e.preventDefault()
        await register({ username, password })
        setTimeout(history.push("/dashboard"), 1000)
    }
  return (
      <div>
          <form onSubmit={ handleSubmit }>
             <input 
             required
             type='text'
             name="username"
             placeholder="username"
             onChange={e => handleUsername(e.target.value)} 
             />
              {/* {touched.username && errors.username && <p className ="errors">* {errors.username}</p>} */}
             
             <input 
             required
             type='password'
             name="password"
             placeholder="password"
             onChange={e => handlePassword(e.target.value)} 
             />
             {/* {touched.password && errors.password && <p className = 'errors'>* {errors.password}</p>} */}
             <button type ='submit'>Sign Up</button>
          </form>
          <Typography>Already have an account? <Link to="/">Log In</Link></Typography>
            <button onClick={ () => getUsers() }>Get Users</button>
      </div>
  )
}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, { register, getUsers })(SignUp)