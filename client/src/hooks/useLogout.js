
import { useAuthContext } from "./useAuthContext"

export default function useLogout() {

    const { dispatch } = useAuthContext()

    function logout() {
        // Remove User from Storage
        localStorage.removeItem('user')

        // Dispatch Logout Action
        dispatch({type: 'LOGOUT'})
    }

  return { logout }
}
