import '../styles/fonts.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from '@dalgu/react-toast';
import { initializeFirebaseApp } from '../service/firebase/config';
import {
  Authentication,
  IAuthentication,
} from '../service/firebase/authentication';
import Header from '../components/header/header';
import { Provider } from 'react-redux';
import store from '../redux-toolkit/store';

const ArticlesApp = ({ Component, pageProps }: AppProps) => {
  initializeFirebaseApp();
  const auth: IAuthentication = new Authentication();

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
