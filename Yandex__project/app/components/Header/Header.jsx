"use client";

import Link from "next/link";
import Styles from "./Header.module.css";
import { Overlay } from "../Overlay/Overlay";
import { Popup } from "../Popup/Popup";
import { AuthForm } from "../AuthForm/AuthForm";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { data_category } from "@/app/data/data";
import { useStore } from "@/app/store/app-store";
import { UserPreloader } from "./UserPreloader";
import { useRouter } from "next/navigation";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  const authContext = useStore();
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handlePopUp() {
    setPopupIsOpened(!popupIsOpened);
  }

  const logout = () => {
    authContext.logout();
  };

  return (
    <header className={Styles.header}>
      <Link
        href="/"
        className={Styles.logo}
        style={pathname == "/" ? { pointerEvents: "none" } : {}}
        aria-disabled={pathname == "/"}
        tabIndex={pathname == "/" ? -1 : undefined}
      >
        <img
          className={Styles.logo__image}
          src="/images/logo.svg"
          alt="Логотип Pindie"
        />
      </Link>
      <nav className={Styles.menu}>
        <ul className={Styles.menu__list}>
          {Object.entries(data_category).map(([key, value]) => {
            return (
              <li className={Styles.menu__item} key={key}>
                <Link
                  href={`/category/${key}`}
                  className={`${Styles["menu__link"]} ${
                    pathname === `/category/${key}` &&
                    Styles["menu__link_active"]
                  }`}
                >
                  {`${value}`}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={Styles.auth}>
          {authContext.userState == "loading" ? (
            <button className={Styles.auth__button}>
              <UserPreloader />
            </button>
          ) : authContext.isAuth ? (
            <UserMenu />
          ) : (
            <button className={Styles.auth__button} onClick={handlePopUp}>
              Войти
            </button>
          )}
        </div>
      </nav>
      {popupIsOpened && (
        <>
          <Overlay handlePopUp={handlePopUp} />
          <Popup handlePopUp={handlePopUp}>
            <AuthForm handlePopUp={handlePopUp} />
          </Popup>
        </>
      )}
    </header>
  );
};
