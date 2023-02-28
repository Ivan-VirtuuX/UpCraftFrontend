import { Header } from '@/components/Header';
import { setUserData } from '@/redux/slices/user';
import { wrapper } from '@/redux/store';
import '@/styles/globals.scss';
import { Api } from '@/utils/api';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  try {
    const userData = await Api(ctx).user.getMe();

    store.dispatch(setUserData(userData));
  } catch (err) {
    console.warn(err);
  }

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
});

export default wrapper.withRedux(App);
