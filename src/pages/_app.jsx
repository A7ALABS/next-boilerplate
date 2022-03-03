import { Head, Main, NextScript, Html } from "next/document";
import React, { useRef, useEffect, useState } from "react";
import "../../styles/globals.css";

// routing libs
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: true });

// redux store
import { useStore } from "react-redux";
import { wrapper } from "../store";
import { PersistGate } from "redux-persist/integration/react";

// theme
import { lightThemeWeb, darkThemeWeb } from "../theme/web";
import { ThemeProvider } from "styled-components";


//Binding routing events.
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const ROUTES_TO_RETAIN = ["/"];

export default wrapper.withRedux(({ Component, pageProps }) => {
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
  }, [router.asPath]);

  // Scroll to the saved position when we load a retained component
  useEffect(() => {
    if (isRetainableRoute) {
      window.scrollTo(0, retainedComponents.current[router.asPath].scrollPos);
    }
  }, [Component, pageProps]);

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  const [theme, setTheme] = useState(0);
  const store = useStore();
  store.subscribe((v) => {
    setTheme(store.getState()?.fromClient?.theme);
  });
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <ThemeProvider theme={theme == 0 ? lightThemeWeb : darkThemeWeb}>
        
          <Component {...pageProps} />
      </ThemeProvider>
    </PersistGate>
  );
});
