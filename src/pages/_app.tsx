import { AppProps } from 'next/app';
import Router from 'next/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles'
import NProgress from 'nprogress';
import '../styles/globals.scss'
import 'nprogress/nprogress.css';
import { WebSocketProvider } from '../modules/ws/WebSocketProvider';
import { useSaveLoginRedirectPath } from '../modules/auth/useSaveLoginRedirectPath';
import { WaitForWsAndAuth } from '../modules/auth/WaitForWsAndAuth';


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#FFFFFF"
    },
    primary: {
      main: "#ff3f3f",
      light: "#e94d3d",
      contrastText: "#fff"
    },
    secondary: {
      main: "#3f69ff",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: "Open Sans",
  },
});

function App({ Component, pageProps }: AppProps) {
  useSaveLoginRedirectPath();
  {/* </WaitForWsAndAuth> */ }
  return (
    // <WebSocketProvider shouldConnect={true}>

    < StylesProvider injectFirst >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StylesProvider >

    // </WebSocketProvider>
  )

}

export default App;
