import React, { ReactElement } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Provider = ({ children }: { children: ReactElement }) => (
  <StylesProvider jss={jss}>
    {children}
  </StylesProvider>
);

export default Provider;
