import style from './CancelButton.module.scss'
import CancelIcon from "../../../assets/cancel.png"


export default function CancelButton() {
  return (
    <button className={style.button}>
        <img src={CancelIcon} alt="Save Icon" />
        <span>Cancel</span>
    </button>   
  )
}
