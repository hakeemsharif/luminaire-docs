import Header from "../../../component/common/Header/Header";
import style from "./AddUser.module.scss";
import Form from "../../../component/user-specific/Form/Form";

export default function AddUser() {
  return (
    <main className="main-display">
      <Header title="User / New" />

      <div className={style.grid}>
        <Form />
      </div>
    </main>
  );
}