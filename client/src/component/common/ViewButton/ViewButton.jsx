import style from "./ViewButton.module.scss";
import ViewIcon from "../../../assets/view-user.png";
import PropTypes from "prop-types";

export default function ViewButton() {
  return (
        <button className={style.button}>
            <img src={ViewIcon} alt="" />
        </button>
  )
}


ViewButton.propTypes = {
  _id: PropTypes.string,
};
