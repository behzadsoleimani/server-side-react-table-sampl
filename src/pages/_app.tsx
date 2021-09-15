import React, { useState } from "react";
import classNames from "classnames/bind";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import RTL from "../components/rtl";
// import Authenticated from "../components/authenticated";
import { IPageProps } from "../types/general-types";
import theme from "../styles/theme";
import styles from "./app.module.scss";
import "../styles/scss/global.scss";

const cx = classNames.bind(styles);


const App = withWidth()((props: IPageProps) => {

  const [PageComponent, setPageComponent] = useState<any>(() => () => null);
  const [isPageLoaded, setPageLoaded] = useState(false);
  const pathname = props.location.pathname;

  import(`.${pathname}`).then(widget => {
    setPageComponent(() => widget.default);
    setPageLoaded(true);
  }).catch((e) => {
    console.error(e);
  });

  return (isPageLoaded ?
    <Grid
      container={true} direction="column" justifyContent="center"
      alignItems="center" className={cx("page-container")}
      style={{
        margin: pathname !== "/login" ? "10px" : 0,
        padding: pathname !== "/login" ? "10px" : 0,
        justifyContent: "flex-start"
      }}
    >
      {/* <Authenticated pathname={pathname}> */}
      <PageComponent {...props} />
      {/* </Authenticated> */}
    </Grid>
    :
    <Grid
      container={true} direction="column" justifyContent="center"
      alignItems="center" className={cx("progress-container")}
    >
      <></>    </Grid>
  );

});

const getPageComponent = (props: RouteComponentProps) => {

  return (
      <App {...(props as any)} />
  );
};

export default () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RTL>
      <BrowserRouter>
          <Route path="/" component={getPageComponent} />
      </BrowserRouter>
    </RTL>
  </ThemeProvider>
);
