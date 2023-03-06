import Head from "next/head";
import Game from "../components/game";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Conway</title>
        <meta name="description" content="MadeOfBees" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Game />
      </main>
    </>
  );
}
