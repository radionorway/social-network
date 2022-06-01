import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

export type MapPropsType = {
  isAuth: boolean;
  login: string | null;
};

export type DispatchPropsType = {
  logout: () => void;
};
const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
      <img src="https://seeklogo.com/images/C/company-name-logo-C74A7D6F5A-seeklogo.com.png" />

      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
