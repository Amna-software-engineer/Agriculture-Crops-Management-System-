import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const ProtectAdminRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null)
  const accessToken = localStorage.getItem('accessToken')

  const verify = () => {
    if (!accessToken) {
      setIsValid(false) // token doesnot exist
      return
    }

      const decoded = jwtDecode(accessToken)
    
      // token valid
      if (decoded.role=="admin") {
        setIsValid(true)
      }else{
        setIsValid(null)
      }
   
  }

  useEffect(() => {
    console.log('ProtectAdminRoute Called')
    verify()
  }, [accessToken])

  if (isValid === null) {return <div>Checking Authorization...</div>}  

  return isValid ? children : <Navigate to='/login' />
}

