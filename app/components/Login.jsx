import React from 'react'

export const Login = ({ login }) => (
  <form className= 'navbar-form' onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input name="username" className='form-control' placeholder='Username'/>
    <input name="password" className='form-control' placeholder='Password' type="password" />
    <input type="submit" value="Login" className='btn btn-default' />
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
