import style from './Search.module.scss'

// eslint-disable-next-line react/prop-types
export default function Search({value, setSearch}) {

  return (
    <div className={style.search}>
        <input 
        type="text" 
        className={style.icon} 
        placeholder="Search..."
        value={value}
        onChange={(event) => setSearch(event.target.value)}/>
    </div>
  )
}
