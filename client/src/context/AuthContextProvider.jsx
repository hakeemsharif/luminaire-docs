import { useEffect, useReducer, useState } from "react";
import PropTypes from 'prop-types';
import { AuthContext, authReducer } from './AuthContext.jsx';

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            dispatch({type: 'LOGIN', payload: user})
        }
        setIsLoading(false);
        
    }, [])

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading spinner or placeholder
    }

    console.log("AuthContext State:", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};