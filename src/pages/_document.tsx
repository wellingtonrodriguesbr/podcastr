import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
            rel="stylesheet"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:title" content="Podcastr" />
          <meta property="og:type" content="article" />
          <meta property="og:image" content="/Home.jpg" />
          <meta
            property="og:description"
            content="Podcastr | O melhor para você ouvir, sempre."
          />
          <meta property="og:site_name" content="European Travel, Inc." />
          <meta
            name="description"
            content="Podcastr | O melhor para você ouvir, sempre."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
