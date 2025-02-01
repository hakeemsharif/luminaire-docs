import style from './Button.module.scss'
import PropTypes from 'prop-types'
import AddIcon from "../../../assets/addicon.png"
export default function Button(props) {
  return (
        <button className={style.button}>
            <img src={AddIcon} alt="Add Icon" />
            <span>Add {props.name}</span>
        </button>        
  )
}

Button.propTypes = {
    name: PropTypes.string
};
  