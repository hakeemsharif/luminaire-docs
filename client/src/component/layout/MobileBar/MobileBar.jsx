import style from "./MobileBar.module.scss";
import Search from "../../common/Search/Search";
import HomeIcon from "../../../assets/home.png";
import DocumentIcon from "../../../assets/document.png";
import UserIcon from "../../../assets/users.png";
import SettingIcon from "../../../assets/settings.png";
import LogoutIcon from "../../../assets/logout.png";
import useLogout from "../../../hooks/useLogout";
import { useSearch } from "../../../hooks/useSearch";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function MobileBar() {
  const { search, setSearch } = useSearch();
  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }
  const location = useLocation();
  // Reset the search bar when the pathname changes
  useEffect(() => {
    setSearch("");
  }, [location.pathname, setSearch]);

  const isOnAddPage = location.pathname === "/users/add";

  return (
    <nav className="mobile-navigation">
      <Search value={search} setSearch={setSearch} />

      <div className={style.nav_links}>
        <ul>
          <li>
            <NavLink
              to="/home"
              onClick={isOnAddPage ? (e) => e.preventDefault() : null}
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              <img src={HomeIcon} alt="Home" />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              <img src={DocumentIcon} alt="" />
              <span>Documents</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              <img src={UserIcon} alt="" />
              <span>Users</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              <img src={SettingIcon} alt="" />
              <span>Settings</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              onClick={handleLogout}
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              <img src={LogoutIcon} alt="" />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}