import '../styles/fonts.css';
import '../styles/colors.css';
import '../styles/text-styles.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from '@dalgu/react-toast';
import { initializeFirebaseApp } from '../service/firebase/config';
import { Provider } from 'react-redux';
import store from '../redux-toolkit/store';
import { ThemeProvider } from 'next-themes';
import Header from '../components/header/header';

initializeFirebaseApp();
const ArticlesApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          {/* <ToastProvider> */}
          {/* <Header /> */}
          <Component {...pageProps} />
          {/* </ToastProvider> */}
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default ArticlesApp;
