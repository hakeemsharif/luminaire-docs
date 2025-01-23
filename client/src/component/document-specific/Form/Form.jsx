import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Iframe from "react-iframe";
import { NavLink } from "react-router-dom";
import useDocumentSubmit from "../../../hooks/useDocumentSubmit";
import SaveButton from "../../common/SaveButton/SaveButton";
import CancelButton from "../../common/CancelButton/CancelButton";
import style from "./Form.module.scss";

export default function Form() {
  const schema = z.object({
    title: z.string().min(2).max(30),
    description: z.string().min(2),
    author: z.string().min(2),
    creationDate: z.string(),
    category: z.string(),
    language: z.string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const { documentSelected, setDocumentSelected, submitData, isSaving } = useDocumentSubmit(`${import.meta.env.VITE_URL}/document`, "/documents");

  return (
    <>
      <form onSubmit={handleSubmit(submitData)} className={style.form}>
        <h2>Metadata</h2>
        <label className={style.label}>Title</label>
        <input className={style.input} type="text" {...register("title")} />

        <label className={style.label}>Description</label>
        <textarea rows="5" {...register("description")}></textarea>

        <label className={style.label}>Author</label>
        <input className={style.input} type="text" {...register("author")} />

        <label className={style.label}>Creation Date</label>
        <input
          className={style.input}
          type="date"
          {...register("creationDate")}
        />

        <label className={style.label}>Category</label>
        <select {...register("category")}>
          <option value="" disabled hidden>
            Select Category
          </option>
          <option value="Marketing">Marketing</option>
          <option value="Financial">Financial</option>
          <option value="Legal">Legal</option>
          <option value="Confidential">Confidential</option>
        </select>

        <label className={style.label}>Language</label>
        <select {...register("language")}>
          <option value="" disabled hidden>
            Select Language
          </option>
          <option value="English">English</option>
          <option value="Filipino">Filipino</option>
          <option value="Arabic">Arabic</option>
        </select>

        <label className={style.label}>File</label>
        <input
          className={style.input}
          type="file"
          onChange={(event) => setDocumentSelected(event.target.files[0])}
        />

        <div className={style.actions}>
          <SaveButton status={isSaving ? "Saving" : "Save"} />

          <NavLink className={style.link} to="/documents">
              <CancelButton />
            </NavLink>

        </div>

      </form>

      <div className={style.preview}>
        <h2>Preview</h2>
        <div className={style.pdf_preview}>
          {documentSelected && (
            <Iframe
              src={URL.createObjectURL(documentSelected)}
              accept="image/jpeg, image/png, application/pdf"
              width="100%"
              height="100%"
              frameBorder={0}
            />
          )}
        </div>
      </div>
    </>
  );
}
