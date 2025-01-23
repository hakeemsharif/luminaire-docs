import style from './BackButton.module.scss'
import BackIcon from "../../../assets/back.png"

export default function BackButton() {
  return (
        <button className={style.button}>
            <img src={BackIcon} alt="Add Icon" />
            <span>Back</span>
        </button>        
  )
}


  