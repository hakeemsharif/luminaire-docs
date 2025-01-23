import { useState } from 'react'
import { useAuthContext } from './useAuthContext';

export default function useLogin() {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${import.meta.env.VITE_URL}/user/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }

        if (response.ok) {
            // Save the User to Local Storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth
            dispatch({type: 'LOGIN', payload: json})
            // window.location.reload();
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}