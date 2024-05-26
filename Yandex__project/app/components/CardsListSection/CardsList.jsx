"use client";
import Link from "next/link";
import Styles from "./CardsListSection.module.css";
import { Card } from "../Card/Card";
import { Preloader } from "../Preloader/Preloader";

export const CardsList = (props) => {
  return (
    <>
      {props.data ? (
        <ul className={Styles["cards-list"]}>
          {props.data.map((item) => {
            return (
              <li className={Styles["cards-list__item"]} key={item.id}>
                <Link
                  href={`/games/${item.title.replace(/\W/gm, "-")}-${item.id}`}
                  className={Styles["card-list__link"]}
                >
                  <Card {...item} />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <Preloader />
      )}
    </>
  );
};
