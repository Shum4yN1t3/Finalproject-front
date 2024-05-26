"use client";

import Styles from "./Game.module.css";
import { endpoints } from "@/app/api/config";
import { useState, useEffect } from "react";
import { checkIfUserVoted, isResponseOk, vote } from "@/app/api/api-utils";
import { useStore } from "@/app/store/app-store";

export const GamePage = (props) => {
  const authContext = useStore();
  const [game, setGame] = useState(props);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    if (authContext.user && game) {
      setIsVoted(checkIfUserVoted(game, authContext.user.id));
    } else {
      setIsVoted(false);
    }
  }, [authContext.user, game]);

  const handleVote = async () => {
    const jwt = authContext.token;
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(authContext.user.id);
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
    if (isResponseOk(response)) {
      setIsVoted(true);
      setGame({
        ...game,
        users: [...game.users, authContext.user],
      });
    }
  };

  return (
    <>
      <section className={Styles["game"]}>
        <iframe className={Styles["game__iframe"]} src={game.link}></iframe>
      </section>
      <section className={Styles["about"]}>
        <h2 className={Styles["about__title"]}>{game.title}</h2>
        <div className={Styles["about__content"]}>
          <p className={Styles["about__description"]}>{game.description}</p>
          <div className={Styles["about__author"]}>
            <p>
              Автор:{" "}
              <span className={Styles["about__accent"]}>{game.developer}</span>
            </p>
          </div>
        </div>
        <div className={Styles["about__vote"]}>
          <p className={Styles["about__vote-amount"]}>
            За игру уже проголосовали:{" "}
            <span className={Styles["about__accent"]}>{game.users.length}</span>
          </p>
          <button
            onClick={handleVote}
            className={`button ${Styles["about__vote-button"]}`}
            disabled={!authContext.isAuth || isVoted}
          >
            {isVoted ? "Голос учтён" : "Голосовать"}
          </button>
        </div>
      </section>
    </>
  );
};
