import style from "./UpdateForm.module.scss";
import SaveButton from "../../common/SaveButton/SaveButton";
import CancelButton from "../../common/CancelButton/CancelButton";
import { NavLink, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentUpdate from "../../../hooks/useDocumentUpdate";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { useEffect } from "react";

// NOTE: ON 17 JAN 25, I REMOVED (OR RATHER COMMENTED OUT) THE 'PASSWORD' AND 'CONFIRM PASSWORD' FIELDS IN THE UPDATE. 
// USER SHOULD BE THE ONE BE UPDATING THE PASSWORD. 
// I'LL PROBABLY IMPLEMENT THAT FEATURE IN "SETTINGS"

export default function UpdateForm() {
  const schema = z.object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2),
      userName: z.string().min(2),
      email: z.string().email(),
      // password: z.string().min(5).max(20),
      // confirmPassword: z.string().min(5).max(20),
      role: z.string(),
    })
    // .refine((data) => data.password === data.confirmPassword, {
    //   message: "Password do not match.",
    //   path: ["confirmPassword"],
    // });
    
  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const { id } = useParams();

  const { data } = useFetchDataId(id, `${import.meta.env.VITE_URL}/user`);

  useEffect(() => {
    if (data) {
        reset({
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            email: data.email,
            // password: data.password,
            // confirmPassword: data.confirmPassword,
            role: data.role,
        });
    }
  }, [data, reset]);

  const { documentSelected, setDocumentSelected, submitData, isUpdating } = useDocumentUpdate(id, `${import.meta.env.VITE_URL}/user`, "/users");
  
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
        <input className={style.input} type="email" {...register("email")} disabled/>

        {/* <label className={style.label}>Password</label>
        <input
          className={style.input}
          type="password"
          {...register("password")}
          disabled
        /> */}

        {/* <label className={style.label}>Confirm Password</label>
        <input
          className={style.input}
          type="password"
          {...register("confirmPassword")}
        /> */}

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
          <SaveButton status={isUpdating ? "Updating.." : "Update"} />
          <NavLink className={style.link} to="/users">
            <CancelButton />
          </NavLink>
        </div>
      </form>

      <div className={style.preview}>
        <h2>Preview</h2>

        <div className={style.card}>
          {documentSelected ? (
            <img src={URL.createObjectURL(documentSelected)} alt="" />
          ) : ( <img src={data?.file} alt="" />)}
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
