"use client";
import { Banner } from "./components/Banner/Banner";
import { Promo } from "./components/Promo/Promo";
import { CardsListSection } from "./components/CardsListSection/CardsListSection";
import { endpoints } from "@/app/api/config";
import { useGetDataByCategory } from "./api/api-hooks";
import { Preloader } from "./components/Preloader/Preloader";

export default function Home() {
  const new_games = useGetDataByCategory(endpoints.games, "new");
  const popular_games = useGetDataByCategory(endpoints.games, "popular");

  return (
    <main className="main">
      <Banner />
      {popular_games ? (
        <CardsListSection
          type={"slider"}
          title={"Популярное"}
          id={"popular"}
          data={popular_games}
        ></CardsListSection>
      ) : (
        <Preloader />
      )}
      {new_games ? (
        <CardsListSection
          type={"slider"}
          title={"Новинки"}
          id={"new"}
          data={new_games}
        ></CardsListSection>
      ) : (
        <Preloader />
      )}
      <Promo />
    </main>
  );
}
