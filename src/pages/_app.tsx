import { AppProps } from 'next/app';
import Router from 'next/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles'
import NProgress from 'nprogress';
import '../styles/globals.scss'
import 'nprogress/nprogress.css';
import { WebSocketProvider } from '../modules/ws/WebSocketProvider';
import { useSaveLoginRedirectPath } from '../modules/auth/useSaveLoginRedirectPath';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../lib/queryClient';
import { HandleConnectionFailed } from '../modules/ws/HandleConnectionFailed';


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

  return (
    <WebSocketProvider shouldConnect={true}>
      <QueryClientProvider client={queryClient}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <HandleConnectionFailed>
              <Component {...pageProps} />
            </HandleConnectionFailed>
          </ThemeProvider>
        </StylesProvider >
      </QueryClientProvider>
    </WebSocketProvider>
  )

}

export default App;
