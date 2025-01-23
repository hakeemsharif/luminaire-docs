import Header from "../../component/common/Header/Header"
import Button from "../../component/common/AddButton/Button"
import style from "./UserPage.module.scss"
import Table from "../../component/user-specific/Table/Table"
import Details from "../../component/user-specific/Details/Details"
import PlaceHolder from "../../component/user-specific/PlaceHolder/PlaceHolder"
import { NavLink, useParams } from "react-router-dom"

export default function UserPage() {
  const { id } = useParams();

  return (
    <main className="main-display">
        <Header title="Users"/>

        <NavLink className={style.link} to="/users/add">
            <Button name="User" />
        </NavLink>

        <div className={style.grid}>
            <Table />
            {id ? (<Details />) : ( <PlaceHolder />)}
        </div>
    </main>
  )
}
