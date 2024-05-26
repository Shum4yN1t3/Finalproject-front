"use client";

import Styles from "./Error.module.css";
import { NotFoundImage } from "./not-found.jsx";
import { useRouter } from "next/navigation";

export const Error = (props) => {
  const router = useRouter();
  return (
    <div className={Styles["not-found"]}>
      <NotFoundImage />
      <div className={Styles["not-found__block"]}>
        <h2 className={Styles["not-found__text"]}>{props.error}</h2>
        <button
          className={`button ${Styles["not-found__text"]}`}
          onClick={() => router.back()}
        >
          Вернутся назад
        </button>
      </div>
    </div>
  );
};
