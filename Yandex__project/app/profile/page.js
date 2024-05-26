"use client";
import { useStore } from "@/app/store/app-store";
import { Preloader } from "../components/Preloader/Preloader";
import { Profile } from "../components/Profile/Profile";
import { useRouter } from "next/navigation";

export default function Home(props) {
  const router = useRouter();
  const authContext = useStore();

  return (
    <main className="main">
      {authContext.userState == "loading" ? <Preloader /> : authContext.user ? <Profile user={authContext.user} logout={authContext.logout}/> : router.push("/")}
    </main>
  );
}
