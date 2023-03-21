import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

import { TITLE, DESCRIPTION } from "src/constants/metadata";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:title" content={TITLE} />
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:site_name" content="Jaam Toast" />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:image"
            content="/images/jaamtoast-logo-image.png"
          />
          <link rel="icon" href="/images/jaamtoast-favicon-image.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
