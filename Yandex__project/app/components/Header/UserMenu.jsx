"use client";

import Link from "next/link";
import Styles from "./Header.module.css";
import { useState } from "react";
import { useStore } from "@/app/store/app-store";

export const UserMenu = (props) => {
  const authContext = useStore();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  function handleUserMenu() {
    setMenuIsOpen(!menuIsOpen);
  }
  return (
    <div className={`${Styles.userMenu}`}>
      <button className={Styles.auth__button} onClick={handleUserMenu}>
        меню
      </button>
      {menuIsOpen && (
        <div className={Styles.userMenu__content}>
          <p className={Styles.userMenu__username}> {authContext.user.username} </p>

          <Link
            href="/profile"
            onClick={handleUserMenu}
            className={Styles.userMenu__action}
          >
            Профиль
          </Link>

          <button className={Styles.userMenu__action} onClick={() => authContext.logout()} Style={"--color: red"}>Выйти</button>
        </div>
      )}
    </div>
  );
};
