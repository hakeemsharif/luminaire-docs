import style from "./DeleteButton.module.scss";
import DeleteIcon from "../../../assets/delete.png";
import PropTypes from "prop-types";
import useDocumentDelete from "../../../hooks/useDocumentDelete";
export default function DeleteButton({ _id, url, queryKey}) {

  const { deleteDocument } = useDocumentDelete(_id, url, queryKey)

  return (
    <button
      className={style.button}
      onClick={(e) => {
        e.stopPropagation(); // Prevent NavLink from triggering
        e.preventDefault(); // Additional prevention
        deleteDocument(_id);
      }}
    >
      <img src={DeleteIcon} alt="" />
    </button>
  );
}

DeleteButton.propTypes = {
  _id: PropTypes.string,
  url: PropTypes.string,
  queryKey: PropTypes.string
};