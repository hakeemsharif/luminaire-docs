import style from "./UpdateButton.module.scss";
import EditIcon from "../../../assets/edit.png";
import PropTypes from "prop-types";

export default function UpdateButton() {
  return (
    
        <button className={style.button}>
            <img src={EditIcon} alt="" />
        </button>


  )
}

UpdateButton.propTypes = {
  _id: PropTypes.string,
};
