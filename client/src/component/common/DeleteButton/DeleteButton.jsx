import style from "./DeleteButton.module.scss";
import DeleteIcon from "../../../assets/delete.png";
import PropTypes from "prop-types";
import useDocumentDelete from "../../../hooks/useDocumentDelete";

export default function DeleteButton({ _id, url, queryKey}) {
  // const queryClient = useQueryClient();
  // const [isLoading, setLoading] = useState(null);

  const { deleteDocument } = useDocumentDelete(_id, url, queryKey)
  // async function deleteDocument(documentId) {
  //   try {
  //     // setIsLoading(true);
  //     // setLoading(documentId);
  //     await new Promise((resolve) => setTimeout(resolve, 5000));

  //     const response = await fetch(
  //       `http://localhost:5555/document/${documentId}`,
  //       { method: "DELETE",}
  //     );

  //     if (response.ok) {
  //       queryClient.invalidateQueries(["documents"]);
  //     } else {
  //       alert("Error deleting.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting:", error);
  //   }
  // }
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
