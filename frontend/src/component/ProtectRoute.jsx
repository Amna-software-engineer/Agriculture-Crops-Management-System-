import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Loader } from 'lucide-react'

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
    verify()
  }, [accessToken])

  if (isValid === null) {return <div>Checking Authorization...</div>}  

  return isValid ? children : <Navigate to='/login' />
}
export const ProtectFormerRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null)
  const accessToken = localStorage.getItem('accessToken')

  const verify = () => {
    if (!accessToken) {
      setIsValid(false) // token doesnot exist
      return
    }

      const decoded = jwtDecode(accessToken)
    
      // token valid
      if (decoded.role=="former") {
        setIsValid(true)
      }else{
        setIsValid(null)
      }
   
  }

  useEffect(() => {
    verify()
  }, [accessToken])

  if (isValid === null) {return <Loader/>}  

  return isValid ? children : <Navigate to='/login' />
}

