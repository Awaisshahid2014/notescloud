import React, { useContext, useState } from 'react'
import HostUrls from '../../utils/HostUrls'
import { useNavigate } from 'react-router-dom'
import alertContext from '../../contexts/alerts/alertContext'
import { useAuth } from '../../contexts/auth/AuthState'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { login } = useAuth()
  const { showAlert } = useContext(alertContext)
  const navigate = useNavigate()

  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch(`${HostUrls.baseUrl}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })
      const json = await response.json()
      if (json.success) {
        showAlert('Successfully logged in', 'success')
        // localStorage.setItem("auth-token", json.authToken);
        login(json.authToken)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        showAlert('Invalid credentials', 'danger')
      }
    } catch (error) {
      console.log(error, 'thehehrher')
      showAlert('Error Logging in', 'danger')
    }
  }
  return (
    <div className='container d-flex justify-items-center align-items-center flex-column my-5 p-5'>
      <h2>Login to Notes</h2>
      <form className='w-50 my-3' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            autoComplete='true'
            onChange={onChange}
            value={credentials.email}
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            autoComplete='true'
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
