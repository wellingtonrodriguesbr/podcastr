import styles from "./styles.module.scss";

export function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="image headphones" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.emptySlider} />
          <span>00:00</span>
        </div>
        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="icon shuffle" />
          </button>

          <button type="button">
            <img src="/play-previous.svg" alt="icon return" />
          </button>

          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="icon play" />
          </button>

          <button type="button">
            <img src="/play-next.svg" alt="icon next" />
          </button>

          <button type="button">
            <img src="/repeat.svg" alt="icon repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
}