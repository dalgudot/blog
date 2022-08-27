import '../styles/fonts.css';
import '../styles/colors.css';
import '../styles/common.scss';
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
import Footer from '../components/footer/footer';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Modal from '../components/modal/modal';
import { usePreventRightClick } from '../lib/hooks/usePreventRightClick';

const BlogApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isPost = router.pathname === '/[category]/[order]';
  const noPost = !isPost;

  usePreventRightClick();

  return (
    <>
      {noPost && <HeadForSEO info={indexInfo(router)} />}
      <RecoilRoot>
        <Provider store={store}>
          <ThemeProvider defaultTheme='dark' enableSystem={false}>
            <Header />
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
            {noPost && <Footer />}
            <Modal />
          </ThemeProvider>
        </Provider>
      </RecoilRoot>
    </>
  );
};

export default BlogApp;
