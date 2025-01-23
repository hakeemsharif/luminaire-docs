import style from "./CardError.module.scss"

export default function CardError() {

    function refreshPage() {
        window.location.reload()
    }
  return (
    <>
          <div className={style.card}>
            <div className={style.thumbnail_error}>
                Unable to load data
            </div>
            <button onClick={refreshPage}className={style.retry}>
                Retry
            </button>
          </div>
    </>
  )
}
