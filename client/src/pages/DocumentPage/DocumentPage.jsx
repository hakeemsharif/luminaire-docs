import Header from "../../component/common/Header/Header";
import Button from "../../component/common/AddButton/Button";
import DocumentCard from "../../component/common/DocumentCard/DocumentCard";
import style from "./DocumentPage.module.scss";
import { NavLink } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import CardLoading from "../../component/common/CardLoading/CardLoading";
import CardError from "../../component/common/CardError/CardError";
import { useSearch } from "../../hooks/useSearch";

export default function DocumentPage() {
  const { isPending, error, data } = useFetchData(
    `${import.meta.env.VITE_URL}/document`,
    "documents"
  );
  const { search } = useSearch();

  return (
    <main className="main-display">
      <Header title="Documents" />

      <NavLink className={style.link} to="/documents/add">
        <Button name="Document" />
      </NavLink>

      <div className={style.new_documents}>
        <h1>Recently Added</h1>
        <div className={style.document_cards}>
          {isPending ? (
            <CardLoading />
          ) : error ? (
            <CardError />
          ) : (
            data.data
              .filter((document) => {
                // return search.toLowerCase() === '' ? document : document.title.toLowerCase().includes(search)
                return search.toLowerCase() === ""
                  ? document
                  : document.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((documents) => (
                <div
                  key={documents._id}
                  className={style.document_card_wrapper}
                >
                  <DocumentCard {...documents} />
                  {/* <NavLink
                className={style.link}
                to={`/documents/${documents._id}`}
              > */}
                </div>
              ))
          )}
        </div>
      </div>
    </main>
  );
}

// Reference https://www.youtube.com/watch?v=xAqCEBFGdYk
// Used a AI to assist in using the search component across different pages