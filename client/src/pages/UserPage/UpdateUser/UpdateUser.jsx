import Header from "../../../component/common/Header/Header"
import style from "./UpdateUser.module.scss"
import UpdateForm from "../../../component/user-specific/UpdateForm/UpdateForm"
export default function UpdateUser() {
  return (
    <main className="main-display">
        <Header title="User / Update"/>
        <div className={style.grid}>
            <UpdateForm />
        </div>
    </main>
  )
}
