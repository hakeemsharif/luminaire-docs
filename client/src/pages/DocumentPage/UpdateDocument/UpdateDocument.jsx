import Header from "../../../component/common/Header/Header";
import style from "./UpdateDocument.module.scss";
import UpdateForm from "../../../component/document-specific/UpdateForm/UpdateForm";

export default function UpdateDocument() {

  return (
    <main className="main-display">
      <Header title="Document / Update" />
      <div className={style.update_document_grid}>
       <UpdateForm />
      </div>
    </main>
  );
}
