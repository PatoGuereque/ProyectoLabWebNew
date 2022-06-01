import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import createEmotionCache from '../helpers/createEmotionCache';
import { AuthContextProvider } from '../context/auth-context';
import { ObjectContextProvider } from '../context/objects-context';
import PageAppBar from '../components/Appbar';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0474A9',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

export default function App(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Reportar objetos perdidos en LocaTEC"
        />
        <title>LocaTEC</title>
      </Head>

      <SessionProvider session={session}>
        <AuthContextProvider>
          <ObjectContextProvider>
            <ThemeProvider theme={darkTheme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <PageAppBar />
              <main>
                <Component {...pageProps} />
              </main>
            </ThemeProvider>
          </ObjectContextProvider>
        </AuthContextProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
