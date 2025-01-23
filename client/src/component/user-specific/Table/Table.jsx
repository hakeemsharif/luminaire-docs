import useFetchData from "../../../hooks/useFetchData"
import style from "./Table.module.scss"
import { NavLink } from "react-router-dom"
import ViewButton from "../../common/ViewButton/ViewButton"
import UpdateButton from "../../common/UpdateButton/UpdateButton"
import DeleteButton from "../../common/DeleteButton/DeleteButton"
import TableLoading from "../TableLoading/TableLoading"
import { useSearch } from "../../../hooks/useSearch"
export default function Table() {

  const { isPending, error, data } = useFetchData(`${import.meta.env.VITE_URL}/user`, "users")
  const { search } = useSearch();
  
  if (isPending) {
    return <TableLoading />
  }

  if (error) {
    return <span>Error: {error.message}</span>
    // return <TableLoading />
  }

  
  return (
    <div className={style.wrapper}>
      <table style={style.table}>
        <tbody>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            {data.data.filter((user) => {
              return search.toLowerCase() === ""
                ? user
                : user.firstName.toLowerCase().includes(search.toLowerCase())||
                  user.lastName.toLowerCase().includes(search.toLowerCase());
            }).map((user, index) => 
              <tr key={user._id}  >
                <td>{index + 1}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.userName}</td>
                <td>{user.role}</td>
                <td>
                  <NavLink className={style.link} to={`/users/${user._id}`}><ViewButton/></NavLink> 
                  <NavLink className={style.link} to={`/users/update/${user._id}`}><UpdateButton/></NavLink> 
                  <DeleteButton _id={user._id} url="http://localhost:5555/user" queryKey="user"/>
                  {/* <NavLink className={style.link} to={`/users/${user._id}`}><img src={ViewIcon} alt="View"/></NavLink>  */}
                  {/* <NavLink className={style.link} to={`/users/update/${user._id}`}><img src={EditIcon} alt="Edit"/></NavLink>  */}
                  {/* <NavLink className={style.link} onClick={() => handleDelete(user._id)}><img src={DeleteIcon} alt="Delete"/></NavLink> */}
                </td>
                
              </tr>
            )}                      
        </tbody>
      </table> 
    </div>
  )
}
