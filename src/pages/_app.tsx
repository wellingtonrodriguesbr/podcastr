import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerProvider } from "../contexts/PlayerContext";

import "../styles/global.scss";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <PlayerProvider>
        <main className={styles.wrapper}>
          <Header />
          <Component {...pageProps} />;
        </main>
        <article className={styles.player}>
          <Player />
        </article>
      </PlayerProvider>
    </div>
  );
}

export default MyApp;
