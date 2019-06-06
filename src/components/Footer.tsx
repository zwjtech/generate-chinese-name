import * as React from "react";
import { Typography, Link } from "@material-ui/core";

const MadeWithLove = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Powered by "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
    </Typography>
  );
};


const Footer = (props: any) => {
  return (
    <footer {...props}>
      <Typography variant="h6" align="center" gutterBottom>
        尾部
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        不知道该写点啥，给各位拜个年吧！
      </Typography>
      <MadeWithLove />
    </footer>
  );
};

export default Footer;
