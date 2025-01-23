import Placeholder from "../../../assets/placeholder.png"
import style from "./DocumentCard.module.scss"
import PropTypes from 'prop-types'
import DeleteButton from "../DeleteButton/DeleteButton"
import UpdateButton from "../UpdateButton/UpdateButton"
import ViewButton from "../ViewButton/ViewButton"
import { NavLink } from "react-router-dom"
export default function DocumentCard({ _id, title, author, category, file }) {
  // AI Assist
  // Insert the Cloudinary transformation into the URL
  const addTransformation = (url) => {
    if (!url) return null;
    const splitUrl = url.split('/upload/');
    if (splitUrl.length === 2) {
      // Insert the transformation string after '/upload/'
      return `${splitUrl[0]}/upload/c_thumb,g_north,h_300,w_200,f_jpg/${splitUrl[1]}`;
    }
    return url;
  };

  const thumbnailUrl = addTransformation(file);

  return (
    
    <div className={style.card}>
      <div className={`${style.tag} ${
          category === "Legal" ? style.it :
          category === "Marketing" ? style.marketing :
          category === "Financial" ? style.financial :
          category === "Confidential" ? style.confidential :
          style.default}`}>
        <span>{category}</span>
      </div>

      <div className={style.actions}>
        <NavLink to={`/documents/${_id}`}>        
          <ViewButton />
        </NavLink>

        <NavLink to={`/documents/update/${_id}`}>
          <UpdateButton />
        </NavLink>

        <DeleteButton _id={_id} url="http://localhost:5555/document" queryKey="documents"/>
        {/* <button className={style.button}><img src={DeleteIcon} alt="" /></button> */}
      </div>

      <img src={thumbnailUrl || Placeholder} alt="PDF Thumbnail" />
      <h4>{title}</h4>
      <small>{author}</small>
    </div>
  );
}

DocumentCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  file: PropTypes.string,
};
