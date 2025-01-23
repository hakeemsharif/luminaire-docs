import { useParams } from "react-router-dom";
import style from "./Details.module.scss";
import useFetchDataId from "../../../hooks/useFetchDataId";
import Placeholder from "../../../assets/Placeholder-user.png"

export default function Details() {
  const { id } = useParams();

  const { isPending, isError, error, data } = useFetchDataId(
    id,
    `${import.meta.env.VITE_URL}/user`,
    "user"
  );

  if (!id)
    return (
      <div className={style.view}>
        <p>Select A User</p>
      </div>
    );
  if (isPending)
    return (
      <div className={style.view}>
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div className={style.view}>
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className={style.view}>
      {data ? (
        <>
          <img
            src={data.file ? data.file : Placeholder }
            alt={`${data.firstName} ${data.lastName} Profile`}
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              objectFit: "cover",
              backgroundColor: "#fff",
            }}
          />
          <div className={style.primary_info}>
            <h2>
              {data.firstName} {data.lastName}
            </h2>
            <span>@{data.userName}</span>
          </div>
          <div className={style.secondary_info}>
            <span>
              Role: <b>{data.role}</b>
            </span>
            <span>
              Email: <b>{data.email}</b>
            </span>
          </div>
        </>
      ) : (
        "Select A User"
      )}
    </div>
  );
}
