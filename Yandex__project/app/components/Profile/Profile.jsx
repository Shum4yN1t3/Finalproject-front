"use client";
import Styles from "./Profile.module.css";
import { useRouter } from "next/navigation";

function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

export const Profile = (props) => {
  const router = useRouter();
  return (
    <>
      <h1 className={Styles.profile__title}>Профиль</h1>

      <div className={Styles.profile__container}>
        <section className={Styles.profile__info}>
          <h2 className={Styles.profile__sectionTitle}>Пользователь</h2>
          <div className={Styles["profile__info-list"]}>
            <p
              className={Styles.profile__name}
            >{`Имя: ${props.user.username}`}</p>
            <p className={Styles.profile__games}>{`Проголосовал: ${
              props.user.games || 0
            } ${getNoun(props.user.games || 0, "раз", "раза", "раз")}`}</p>
            <p
              className={Styles.profile__email}
            >{`Email: ${props.user.email}`}</p>
            <p className={Styles.profile__status}>{`Статус: ${
              props.user.confirmed ? "Подтверждён" : "Не подтверждён"
            }`}</p>
          </div>
        </section>
        <section className={Styles.profile__actions}>
          <h2 className={Styles.profile__sectionTitle}>Действия</h2>
          <div className={Styles["profile__info-list"]}>
            <button
              className={`button`}
              onClick={() => {
                props.logout();
                router.push("/");
              }}
            >
              Выйти
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
