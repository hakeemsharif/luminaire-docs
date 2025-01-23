import style from "./ErrorDocument.module.scss"
import Header from "../../../component/common/Header/Header"

export default function ErrorDocument() {
  return (
    <main className="main-display">
        <Header title={"Document / Not Found"}/>

        <div className={style.grid}>

        </div>
    </main>
  )
}
