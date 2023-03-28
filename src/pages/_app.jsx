import React, { useRef, useEffect, useState } from "react";
import "../../styles/globals.css";

// routing libs
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: true });

// redux store
import { Provider, useStore } from "react-redux";
import { wrapper } from "../store";
import { PersistGate } from "redux-persist/integration/react";

// theme
import { lightThemeWeb, darkThemeWeb } from "../theme/web";
import { ThemeProvider } from "styled-components";

// internationalization
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config.js";

//Binding routing events.
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const ROUTES_TO_RETAIN = ["/"];

export default wrapper.withRedux(
  appWithTranslation(({ Component, pageProps }) => {
    const router = useRouter();
    const retainedComponents = useRef({});
    const isRetainableRoute = ROUTES_TO_RETAIN.includes(router.asPath);

    // Add Component to retainedComponents if we haven't got it already
    if (isRetainableRoute && !retainedComponents.current[router.asPath]) {
      const MemoComponent = React.memo(Component);
      retainedComponents.current[router.asPath] = {
        component: <MemoComponent {...pageProps} />,
        scrollPos: 0,
      };
    }

    // Save the scroll position of current page before leaving
    const handleRouteChangeStart = (url) => {
      if (isRetainableRoute) {
        retainedComponents.current[router.asPath].scrollPos = window.scrollY;
      }
    };

    // Save scroll position - requires an up-to-date router.asPath
    useEffect(() => {
      router.events.on("routeChangeStart", handleRouteChangeStart);
      return () => {
        router.events.off("routeChangeStart", handleRouteChangeStart);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    // Scroll to the saved position when we load a retained component
    useEffect(() => {
      if (isRetainableRoute) {
        window.scrollTo(0, retainedComponents.current[router.asPath].scrollPos);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Component, pageProps]);

    useEffect(() => {
      history.scrollRestoration = "manual";
    }, []);

    const [theme, setTheme] = useState(0);

    const store = useStore();
    store.subscribe((v) => {
      setTheme(store.getState()?.fromClient?.theme);
    });

    const getLayout = Component.getLayout ?? ((page) => page);

    return (
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={null}>
          {() => (
            <ThemeProvider
              theme={theme == 0 || !theme ? darkThemeWeb : lightThemeWeb}
            >
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          )}
        </PersistGate>
      </Provider>
    );
  }, nextI18NextConfig)
);
