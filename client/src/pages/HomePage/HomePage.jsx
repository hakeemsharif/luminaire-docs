import style from "./HomePage.module.scss"
import Header from "../../component/common/Header/Header"
// import Placeholder from "../../assets/placeholder.png"
import DocumentCard from "../../component/common/DocumentCard/DocumentCard"
import CardLoading from "../../component/common/CardLoading/CardLoading";
import CardError from "../../component/common/CardError/CardError";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../../hooks/useSearch";

export default function HomePage() {

  const { isPending, error, data } = useQuery({
    queryKey: ["documents"],
    queryFn: async () =>
      fetch(`${import.meta.env.VITE_URL}/document`).then((response) =>
        response.json()
      ),
  });

  const { search } = useSearch();

  return (
    <main className="main-display">
        <Header title="Home"/>
        
        <div className={style.info_cards}>
            <div className={style.card}>
              <span>Total Documents</span>
              <h1>100</h1>
              <small>+20.1% from last month</small>
            </div>

            <div className={style.card}>
              <span>Active Now</span>
              <h1>10</h1>
              <small>+5 since last hour</small>
            </div>

            <div className={style.card}>
              <span>Total Users</span>
              <h1>50</h1>
              <small>+10% from last month</small>
            </div>

            <div className={style.card}>
              <span>Total Documents</span>
              <h1>100</h1>
              <small>+20.1% from last month</small>
            </div>
        </div>

        <div className={style.new_documents}>
          <h1>Recently Added</h1>
          
        <div className={style.document_cards}>
          {isPending ? (
            <CardLoading />
          ) : error ? (
            <CardError />
          ) : (
            data.data
            .slice(0,6)
            .filter((document) => {
              return search.toLowerCase() === ""
                ? document
                : document.title.toLowerCase().includes(search.toLowerCase());
            })
            .map((documents) => (
              <DocumentCard key={documents._id} {...documents} />      
            ))
          )}
        </div>

        </div>
    </main>
  )
}
