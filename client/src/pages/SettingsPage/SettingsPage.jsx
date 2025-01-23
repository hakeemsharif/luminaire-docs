import Header from "../../component/common/Header/Header";
import style from "./SettingsPage.module.scss";
export default function SettingsPage() {
  return (
    <main className="main-display">
      <Header title="Settings" />

      <div className={style.grid}>
        <div className={style.settings}>
          <h2>Change Password <small>(This feature is currently not functioning)</small></h2>
          <form>
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />
            <label>Password</label>
            <input type="password" placeholder="Enter new password" />
            <label>Re-type New Password</label>
            <input type="password" placeholder="Re-type new password" />
            <button type="submit">Change Password</button>
          </form>
        </div>
        <div className={style.settings}>
          <div className={style.future}>Coming in a future update.</div>
        </div>
        <div className={style.settings}>
          <div className={style.future}>Coming in a future update.</div>
        </div>
        <div className={style.settings}>
          <div className={style.future}>Coming in a future update.</div>
        </div>
      </div>
    </main>
  );
}
