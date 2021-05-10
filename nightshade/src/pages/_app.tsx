import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import NProgress from "nprogress";
import { WebSocketProvider } from "../modules/ws/WebSocketProvider";
import { useSaveLoginRedirectPath } from "../modules/auth/useSaveLoginRedirectPath";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/queryClient";
import { HandleConnectionFailed } from "../modules/ws/HandleConnectionFailed";
import "../styles/globals.scss";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const theme = createMuiTheme({
    palette: {
        text: {
            primary: "#FFFFFF",
        },
        primary: {
            main: "#ff3f3f",
            light: "#e94d3d",
            contrastText: "#fff",
        },
        secondary: {
            main: "#3f69ff",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: "Open Sans",
    },
});

export default function App({ Component, pageProps }: AppProps) {
    useSaveLoginRedirectPath();

    return (
        <>
            <Head>
                <title>TTS</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
                />
            </Head>

            <WebSocketProvider shouldConnect={true}>
                <QueryClientProvider client={queryClient}>
                    <StylesProvider injectFirst>
                        <ThemeProvider theme={theme}>
                            <HandleConnectionFailed>
                                <Component {...pageProps} />
                            </HandleConnectionFailed>
                        </ThemeProvider>
                    </StylesProvider>
                </QueryClientProvider>
            </WebSocketProvider>
        </>
    );
}
