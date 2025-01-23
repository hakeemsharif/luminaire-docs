import style from "./CardLoading.module.scss";
export default function CardLoading() {
  return (
    <>
      <div className={style.card}>
        <div className={style.thumbnail_loading}></div>
        <div className={style.line}></div>
        <div className={style.line}></div>
      </div>
    </>
  );
}
