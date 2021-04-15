import { AppProps } from 'next/app';
import Router from 'next/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import NProgress from 'nprogress';
import '../styles/globals.scss'
import 'nprogress/nprogress.css';


Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
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
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )

}

export default App;
