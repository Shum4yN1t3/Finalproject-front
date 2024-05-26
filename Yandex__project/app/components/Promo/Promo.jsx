"use client";

import Styles from "./Promo.module.css";
import { useState, useEffect } from "react";

export const Promo = () => {
  const [codeIsVisible, setCodeVisibility] = useState(false);
  function handleButtonClick() {
    setCodeVisibility(true);
  }
  useEffect(() => {
    let timeout;
    if (codeIsVisible) {
      timeout = setTimeout(() => {
        setCodeVisibility(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [codeIsVisible]);
  return (
    <section className={Styles.promo}>
      <div className={Styles["promo__description-block"]}>
        <h2 className={Styles.promo__title}>Твой промо-код</h2>
        <p className={Styles.promo__description}>
          Скидка на все курсы Яндекс Практикума для пользователей нашего сайта!
        </p>
        <button
          onClick={handleButtonClick}
          className={`button ${Styles.promo__button}`}
        >
          {codeIsVisible ? (
            <span className={Styles["promo-code"]}>WEBTEENS10</span>
          ) : (
            "Получить код"
          )}
        </button>
      </div>
      <img
        src="/images/promo-illustration.svg"
        alt="Собака"
        className={Styles.promo__image}
      />
    </section>
  );
};
