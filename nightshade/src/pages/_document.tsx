import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta property="og:locale" content="en-US" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://ttsclan.vercel.app/" />
                    <meta property="og:site_name" content="TTS" />
                    <meta
                        property="og:keywords"
                        content="TTS,Dashboard,Fortnite Clan,TTS Clan,Tomatohead,tomatohead society,tomatohead clan"
                    />
                    <meta property="og:title" content="TTS" />
                    <meta
                        property="og:description"
                        content="The Tomatohead Society (TTS) is a Fortnite clan that strongly supports Team Pizza and is always looking for new members like you!"
                    />
                    <meta property="og:image" content="https://ttsclan.vercel.app/assets/preview.png" />
                    <meta name="theme-color" content="#ff3f3f" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:site" content="@TheTomatoHeads" />
                    <meta property="twitter:site:id" content="@TheTomatoHeads" />
                    <meta property="twitter:creator" content="@TheTomatoHeads" />
                    <meta property="twitter:creator:id" content="@TheTomatoHeads" />
                    <meta property="twitter:image" content="https://ttsclan.vercel.app/assets/preview.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
