import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { DOMAIN } from '../config'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const navigate = useNavigate();

  const navigateDashboard = () => {
    navigate(`/dashboard`);
  };

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const headers = {'Content-Type':'application/json'}

    const response = await fetch(DOMAIN + '/users/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    } else {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)

      navigateDashboard()
    }
  }

  return { login, isLoading, error }
}