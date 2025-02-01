import { useParams } from "react-router-dom";
import Header from "../../../component/common/Header/Header";
import style from "./ViewDocument.module.scss";
import { NavLink } from "react-router-dom";
import ErrorDocument from "../ErrorDocument/ErrorDocument";
import LoadingDocument from "../LoadingDocument/LoadingDocument";
import BackButton from "../../../component/common/BackButton/BackButton";
import useDocumentQueryId from "../../../hooks/useDocumentQueryId";

export default function ViewDocument() {
  const { id } = useParams();

  const { isPending, isError, data } = useDocumentQueryId(id);

  if (isPending) return <LoadingDocument />;

  if (isError) return <ErrorDocument />;

  return (
    <main className="main-display">
      <Header title={"Document / " + data.title} />

      <div className={style.grid}>

        <div className={style.preview}>
          {data.file.includes(".pdf") ? (
            <iframe src={data.file} width="100%" height="100%"></iframe>
          ) : (
            <img src={data.file} className={style.image_preview} />
          )}
        </div>

        <div className={style.details}>
          <h2>{data.title}</h2>
          <span>by: {data.author}</span>
          <div className={style.description}>{data.description}</div>

          <NavLink className={style.link} to="/documents">
            <BackButton />
          </NavLink>
          
        </div>

      </div>
    </main>
  );
}
