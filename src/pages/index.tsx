import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationTime } from "../utils/convertDurationTime";

import styles from "./home.module.scss";

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  url: string;
  duration: number;
  durationAsString: string;
};

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <>
      <Head>
        <title>Podcastr | Home</title>
      </Head>

      <div className={styles.homepage}>
        <section className={styles.latestEpisodes}>
          <h2>Últimos lançamentos</h2>
          <ul>
            {latestEpisodes.map((episode) => {
              return (
                <li key={episode.id}>
                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />

                  <div className={styles.episodesDetails}>
                    <a href="/">{episode.title}</a>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                  <button type="button">
                    <img src="/play-green.svg" alt="play episode" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.allEpisodes}>
          <h2>Todos os episódios</h2>
          <table cellSpacing={0}>
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </thead>

            <tbody>
              {allEpisodes.map((episode) => {
                return (
                  <tr key={episode.id}>
                    <td>
                      <Image
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <a href="">{episode.title}</a>
                    </td>
                    <td>{episode.members}</td>
                    <td>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type="button">
                        <img src="/play-green.svg" alt="play episode" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
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

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
