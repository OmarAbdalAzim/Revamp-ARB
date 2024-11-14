import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import 'jquery';
import 'src/assets/main.scss';
import 'public/css/styles.css';
import 'src/Utils/FxbConditions';
import { Provider } from 'react-redux';
import { store } from '../Redux/store';
function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
      {/* <Bootstrap {...pageProps} /> */}
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Provider store={store}>
          <Component {...rest} />
        </Provider>
      </I18nProvider>
    </>
  );
}

export default App;
