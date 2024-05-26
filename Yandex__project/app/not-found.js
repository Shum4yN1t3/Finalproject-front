import { Error } from "./components/Error/Error";


export default function Home() {
    return (
      <main className="main">
        <Error error="404 | Страница не найдена"/>
      </main>
    );
  }