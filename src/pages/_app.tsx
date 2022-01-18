import type { AppProps } from 'next/app';
import { ToastProvider } from '@dalgu/react-toast';
import { initializeFirebaseApp } from '../service/firebase/config';
import { Provider } from 'react-redux';
import store from '../redux-toolkit/store';
import { ThemeProvider } from 'next-themes';
import GlobalStyle from '../styles/globals';
import Fonts from '../styles/fonts';
import Colors from '../styles/colors';

initializeFirebaseApp();
const ArticlesApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Fonts />
      <Colors />
      <Provider store={store}>
        <ThemeProvider>
          <ToastProvider>
            {/* <Header /> */}
            <Component {...pageProps} />
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default ArticlesApp;
