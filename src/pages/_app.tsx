import '../styles/fonts.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from '@dalgu/react-toast';
import { initializeFirebaseApp } from '../service/firebase/config';
import Header from '../components/header/header';
import { Provider } from 'react-redux';
import store from '../redux-toolkit/store';

initializeFirebaseApp();

const ArticlesApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider store={store}>
        <ToastProvider>
          <Header />
          <Component {...pageProps} />
        </ToastProvider>
      </Provider>
    </>
  );
};

export default ArticlesApp;
