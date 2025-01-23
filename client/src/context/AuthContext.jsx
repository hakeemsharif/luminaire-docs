// import { createContext, useReducer } from "react";
// import PropTypes from 'prop-types'

// export const AuthContext = createContext()

// export const authReducer = (state, action) => {
//     switch (action.type) {
//         case "LOGIN":
//             return { user: action.payload }
//         case "LOGOUT":
//             return { user: null }
//         default:
//             return state
//     }
// }

// export const AuthContextProvider = ({children}) => {
//     const [state, dispatch] = useReducer(authReducer, {
//         user: null
//     })

//     console.log("AuthContext State:", state)

//     return (
//         <AuthContext.Provider value={{...state, dispatch}}>
//             { children }
//         </AuthContext.Provider>
//     )
// }

// AuthContextProvider.propTypes = {
//     children: PropTypes.node.isRequired
// };

// AuthContext.js
import { createContext } from "react";

export const AuthContext = createContext();
  
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}