import * as React from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Slide,
  Tab,
  Tabs,
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

export interface IProps extends React.Props<HTMLElement> {
  history?: any;
}

function HideOnScroll(props: any): any {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default (props: IProps) => {
  const { pathname } = props.history.location;
  const [value, setValue] = React.useState(pathname);

  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    props.history.push(newValue);
    setValue(newValue);
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="逼格" value="/" />
            <Tab label="中文" value="/cn" />
            <Tab label="英文" value="/en" />
          </Tabs>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
};
