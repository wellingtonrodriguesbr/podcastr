import Head from "next/head";
import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationTime } from "../utils/convertDurationTime";

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  //...
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Podcastr | Home</title>
      </Head>

      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      thumbnail: episode.thumbnail,
      description: episode.description,
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationTime(Number(episode.file.duration)),
    };
  });

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
