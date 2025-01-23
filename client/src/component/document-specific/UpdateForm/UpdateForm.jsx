import { z } from "zod";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Iframe from "react-iframe";
import useDocumentQueryId from "../../../hooks/useDocumentQueryId";
import SaveButton from "../../../component/common/SaveButton/SaveButton";
import CancelButton from "../../../component/common/CancelButton/CancelButton";
import useDocumentUpdate from "../../../hooks/useDocumentUpdate";
import style from "./UpdateForm.module.scss";

export default function UpdateForm() {
  const schema = z.object({
    title: z.string().min(2).max(30),
    description: z.string().min(2),
    author: z.string().min(2),
    creationDate: z.string(),
    category: z.string(),
    language: z.string(),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { id } = useParams();

  const { data } = useDocumentQueryId(id);

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
        author: data.author,
        creationDate: new Date(data.creationDate).toISOString().split("T")[0],
        category: data.category,
        language: data.language,
        file: data.file,
      });
    }
  }, [data, reset]);

  const { documentSelected, setDocumentSelected, submitData, isUpdating } = useDocumentUpdate(id, `${import.meta.env.VITE_URL}/document`, "/documents");

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
          <SaveButton status={isUpdating ? "Updating" : "Update"} />

          <NavLink className={style.link} to="/documents">
            <CancelButton />
          </NavLink>
        </div>
      </form>

      <div className={style.preview}>
        <h2>Preview</h2>
        <div className={style.pdf_preview}>
          {documentSelected ? (
            <Iframe
              src={URL.createObjectURL(documentSelected)}
              accept="image/jpeg, image/png, application/pdf"
              width="100%"
              height="100%"
              frameBorder={0}
            />
          ) : (
            <Iframe
              src={data?.file}
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
