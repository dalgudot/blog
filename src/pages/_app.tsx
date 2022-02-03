import '../styles/fonts.css';
import '../styles/colors.css';
import '../styles/text-styles.scss';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from '@dalgu/react-toast';
import { Provider } from 'react-redux';
import store from '../redux-toolkit/store';
import { ThemeProvider } from 'next-themes';
import Header from '../components/header/header';
import HeadForSEO from '../SEO/headForSEO';
import { indexInfo } from '../SEO/index/index-info';
import { useRouter } from 'next/router';

const BlogApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isPost = router.pathname === '/[category]/[order]';

  return (
    <>
      {!isPost && <HeadForSEO info={indexInfo.info} />}
      <Provider store={store}>
        <ThemeProvider defaultTheme='dark' enableSystem={false}>
          <Header />
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default BlogApp;
