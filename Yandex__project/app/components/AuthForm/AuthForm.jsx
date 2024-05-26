"use client";

import Styles from "./AuthForm.module.css";
import { endpoints } from "@/app/api/config";
import { useState, useEffect } from "react";
import { authorize, isResponseOk } from "@/app/api/api-utils";
import { useStore } from "@/app/store/app-store";

export const AuthForm = (props) => {
  const authContext = useStore();
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ status: null, text: null });
  const [mode, setMode] = useState("login");
  const [endpoint, setEndpoint] = useState(endpoints.auth);

  const handleInput = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleModeChange = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  useEffect(() => {
    if (mode === "login") {
      setAuthData({
        email: document.querySelector('input[type="email"]').value || "",
        password: document.querySelector('input[type="password"]').value || "",
      });
      setEndpoint(endpoints.auth);
    } else {
      setAuthData({
        username: "",
        email: document.querySelector('input[type="email"]').value || "",
        password: document.querySelector('input[type="password"]').value || "",
      });
      setEndpoint(endpoints.register);
    }
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await authorize(endpoint, authData);
    if (isResponseOk(userData)) {
      authContext.login({ ...userData, id: userData._id }, userData.jwt);

      if (mode === "login") {
        setMessage({ status: "success", text: "Вы авторизовались!" });
      } else {
        setMessage({ status: "success", text: "Вы зарегистрировались!" });
      }
    } else if (mode === "login") {
      setMessage({ status: "error", text: "Неверные почта или пароль" });
    } else {
      if (userData.message === "Заполни все поля") {
        setMessage({
          status: "error",
          text: "Заполни все поля.",
        });
      }
    }
  };

  useEffect(() => {
    let timer;
    if (authContext.user) {
      timer = setTimeout(() => {
        props.handlePopUp();
        setMessage({ status: null, text: null });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [authContext.user]);

  return (
    <form className={Styles["form"]} onSubmit={handleSubmit}>
      <h2 className={Styles["form__title"]}>
        {mode === "login" ? "Авторизация" : "Регистрация"}
      </h2>
      <div className={Styles["form__fields"]}>
        {mode == "register" ? (
          <label className={Styles["form__field"]}>
            <span className={Styles["form__field-title"]}>
              Имя пользователя
            </span>
            <input
              className={Styles["form__field-input"]}
              name="username"
              type="text"
              placeholder="hello"
              onInput={handleInput}
            />
          </label>
        ) : (
          ""
        )}
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Email</span>
          <input
            className={Styles["form__field-input"]}
            name="email"
            type="email"
            placeholder="hello@world.com"
            onInput={handleInput}
          />
        </label>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Пароль</span>
          <input
            className={Styles["form__field-input"]}
            name="password"
            type="password"
            placeholder="***********"
            onInput={handleInput}
          />
        </label>
      </div>
      {message.status && (
        <p className={Styles["form__message"]}>{message.text}</p>
      )}
      <div className={Styles["form__actions"]}>
        <button
          className={Styles["form__mode"]}
          type="button"
          onClick={handleModeChange}
        >
          {mode === "login" ? "Регистрация" : "Вход"}
        </button>
        <button className={Styles["form__reset"]} type="reset">
          Очистить
        </button>
        <button className={Styles["form__submit"]} type="submit">
          {mode === "login" ? "Войти" : "Зарегистрироваться"}
        </button>
      </div>
    </form>
  );
};
