import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { ServerStyleSheets } from "@mui/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Jaam Toast - Jamstack App Deployment Service Platform | Deploy Your Own Websites Quick And Easy Like Toasts"
          />
          <meta
            name="description"
            content="Bring your jamstack app, and make your products get deployed like an easy toast."
          />
          <meta
            property="og:description"
            content="Bring your jamstack app, and make your products get deployed like an easy toast."
          />
          <meta property="og:site_name" content="Jaam Toast" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:image" content="/images/jaamtoast-logo.svg" />
          <link rel="icon" href="/images/jaamtoast-favicon.svg" />
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
