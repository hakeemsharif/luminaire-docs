import style from "./TableLoading.module.scss"

export default function TableLoading() {
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
            <tr>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>      
            </tr>
            <tr>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>      
            </tr>
            <tr>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>
                <td><div className={style.line}></div></td>      
            </tr>
        </tbody>
      </table> 
    </div>
  )
}
