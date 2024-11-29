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
import BottomFloatingButton from '../components/bottom-floating-button/BottomFloatingButton';

const BlogApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isPost = router.pathname === '/[category]/[order]';
  const isFooter =
    router.pathname === '/' ||
    router.pathname === '/[category]' ||
    router.pathname === '/ux-collection' ||
    router.pathname === '/story' ||
    router.pathname === '/contact';

  usePreventRightClick();

  return (
    <>
      {!isPost && <HeadForSEO info={indexInfo(router)} />}
      <RecoilRoot>
        <Provider store={store}>
          <ThemeProvider defaultTheme='dark' enableSystem={false}>
            <Header />
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
            <BottomFloatingButton />
            {isFooter && <Footer />}
            <Modal />
          </ThemeProvider>
        </Provider>
      </RecoilRoot>
    </>
  );
};

export default BlogApp;
