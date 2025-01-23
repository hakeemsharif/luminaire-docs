import style from "./Form.module.scss";
import SaveButton from "../../common/SaveButton/SaveButton";
import CancelButton from "../../common/CancelButton/CancelButton";
import { NavLink } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentSubmit from "../../../hooks/useDocumentSubmit";

export default function Form() {
  const schema = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2),
      userName: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
      role: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match.",
      path: ["confirmPassword"],
    });

  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(schema),
  });

  const { documentSelected, setDocumentSelected, submitData, isSaving } = useDocumentSubmit(`${import.meta.env.VITE_URL}/user`, "/users");

  return (
    <>
      <form onSubmit={handleSubmit(submitData)} className={style.form}>
        <h2>Details</h2>
        <label className={style.label}>First Name</label>
        <input className={style.input} type="text" {...register("firstName")} />

        <label className={style.label}>Last Name</label>
        <input className={style.input} type="text" {...register("lastName")} />

        <label className={style.label}>Username</label>
        <input className={style.input} type="text" {...register("userName")} />

        <label className={style.label}>Email</label>
        <input className={style.input} type="email" {...register("email")} />

        <label className={style.label}>Password</label>
        <input
          className={style.input}
          type="password"
          {...register("password")}
        />

        <label className={style.label}>Confirm Password</label>
        <input
          className={style.input}
          type="password"
          {...register("confirmPassword")}
        />

        <label className={style.label}>Role</label>
        <select {...register("role")}>
          <option value="" disabled hidden>
            Role
          </option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>

        <label className={style.label}>Photo</label>
        <input
          className={style.input}
          type="file"
          onChange={(event) => setDocumentSelected(event.target.files[0])}
        />

        <div className={style.actions}>
          <SaveButton status={isSaving ? "Saving" : "Save"} />
          <NavLink className={style.link} to="/users">
            <CancelButton />
          </NavLink>
        </div>
      </form>

      <div className={style.preview}>
        <h2>Preview</h2>

        <div className={style.card}>
          {documentSelected && (
            <img src={URL.createObjectURL(documentSelected)} alt="" />
          )}
          <div className={style.card_info}>
            <h1>{watch("firstName") || "Name"} {watch("lastName")}</h1>
            <p>@{watch("userName" ) || "username"}</p>
            <span>
              Role: <b>{watch("role")}</b>
            </span>
            <span>
              Email: <b>{watch("email") || "email address"}</b>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
