import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Podcastr | Home</title>
      </Head>

      <h1>Index</h1>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
