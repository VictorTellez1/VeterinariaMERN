import React from 'react'
import {Outlet} from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>
        <h1>Desde auth Layout</h1>
        <Outlet/>
    </>
  )
}

export default AuthLayout