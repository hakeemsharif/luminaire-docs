import style from "./LoadingDocument.module.scss"
export default function LoadingDocument() {
  return (
    <main className="main-display">
        <div className={style.grid}>
            <div className={style.loader}></div> 
        </div>
    </main>
  )
}
