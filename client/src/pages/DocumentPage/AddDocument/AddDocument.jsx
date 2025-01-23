import Header from "../../../component/common/Header/Header";
import style from "./AddDocument.module.scss";
import Form from "../../../component/document-specific/Form/Form";

export default function AddDocument() {

  return (
    <main className="main-display">
      <Header title="Document / New" />
      <div className={style.add_document_grid}>
        <Form />
      </div>
    </main>
  );
}