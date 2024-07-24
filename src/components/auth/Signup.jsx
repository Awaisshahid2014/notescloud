import React, { useContext, useState } from 'react'
import HostUrls from '../../utils/HostUrls'
import { useNavigate } from 'react-router-dom'
import alertContext from '../../contexts/alerts/alertContext'

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  })
  const { showAlert } = useContext(alertContext)
  const navigate = useNavigate()

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const { name, email, password, cpassword } = data
    if (password === cpassword) {
      try {
        const response = await fetch(`${HostUrls.baseUrl}auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        })
        const json = await response.json()

        if (json.success) {
          showAlert('Success, New user created', 'success')
          localStorage.setItem('auth-token', json.authToken)
          navigate('/')
        } else {
          showAlert('Invalid credentials', 'danger')
        }
      } catch (error) {
        throw error
      }
    } else {
      showAlert('Match your passwords', 'danger')
    }
  }
  return (
    <div className='container d-flex justify-items-center align-items-center flex-column my-5 p-5'>
      <h2>Signup</h2>
      <form className='w-50 my-3' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            value={data.name}
            onChange={onChange}
            type='text'
            className='form-control'
            id='name'
            name='name'
            autoComplete='true'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            value={data.email}
            onChange={onChange}
            type='email'
            className='form-control'
            id='email'
            name='email'
            autoComplete='true'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            value={data.password}
            onChange={onChange}
            type='password'
            className='form-control'
            name='password'
            id='password'
            autoComplete='true'
            required
            minLength={5}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='cpassword' className='form-label'>
            Confirm Password
          </label>
          <input
            value={data.cpassword}
            onChange={onChange}
            type='password'
            className='form-control'
            name='cpassword'
            id='cpassword'
            autoComplete='true'
            required
            minLength={5}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
