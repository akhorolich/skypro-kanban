import { useTheme } from "styled-components";
import { Link } from "react-router-dom";

import useAuth from "../../../context/AuthContext/useAuth";

import {
  SHeaderPopUser,
  PopUserSetMail,
  PopUserSetName,
  PopUserSetTheme,
  InputTheme,
} from "./_popUser.style";
import { addThemeDataToLocalStorage } from "../../../utils/localStorage";

export default function PopUser() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <>
      <SHeaderPopUser>
        <a href="">x</a>
        <PopUserSetName>{user ? user.name : ""}</PopUserSetName>
        <PopUserSetMail>{user ? user.login : ""}</PopUserSetMail>
        <PopUserSetTheme className="pop-user-set__theme">
          <p>Темная тема</p>
          <InputTheme
            type="checkbox"
            name="checkbox"
            checked={theme.isDark}
            onClick={theme.handleChangeTheme}
            onChange={addThemeDataToLocalStorage({mode: theme.isDark, name: theme.name})}
          />
        </PopUserSetTheme>
        <button type="button" className="_hover03">
          <Link to="/exit">Выйти</Link>
        </button>
      </SHeaderPopUser>
    </>
  );
}
