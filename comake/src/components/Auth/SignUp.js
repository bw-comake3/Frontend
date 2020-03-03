import React from 'react'
import axios from "axios";
import * as Yup from 'yup';
import useInput from "../../hooks/input"

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
          <form onSubmit={ handleSubmit }>
             <input 
             type='text'
             name="username"
             placeholder="username"
             onChange={e => handleUsername(e.target.value)} 
             />
              {/* {touched.username && errors.username && <p className ="errors">* {errors.username}</p>} */}
             
             <input 
             type='password'
             name="password"
             placeholder="password"
             onChange={e => handlePassword(e.target.value)} 
             />
             {/* {touched.password && errors.password && <p className = 'errors'>* {errors.password}</p>} */}
             <button type ='submit'>Sign Up</button>
          </form>
      </div>
  )
}

