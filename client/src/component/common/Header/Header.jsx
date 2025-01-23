import style from "./Header.module.scss";
import PropTypes from 'prop-types';

export default function Header(props) {
  return (
    <div className={style.header}>
        <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string
};
