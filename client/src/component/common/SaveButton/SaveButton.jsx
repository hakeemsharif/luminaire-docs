import style from './SaveButton.module.scss'
import SaveIcon from "../../../assets/addicon.png"
import PropTypes from 'prop-types'

export default function SaveButton(props) {
  return (
    <button className={style.button}>
        <img src={SaveIcon} alt="Save Icon" />
        <span>{props.status}</span>
    </button>    
  )
}

SaveButton.propTypes = {
  status: PropTypes.string
};
