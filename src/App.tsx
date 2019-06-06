import React from "react";
import { Theme, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Header from "./components/Header";
import { Router, Route } from "react-router-dom";
import { createHashHistory } from "history";
import English from "./pages/English";

const history = createHashHistory();
const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0),
  },
  heroButtons: {
    // marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default (props: any) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header {...props} history={history} />
      <main>
        {/* Hero unit */}
        <Box my={2}>
          <Router history={history}>
            {/* <Index classes={classes} /> */}
            <Route path="/" exact component={Index} classes={classes} />
            {/* <Route path="/cn" component={Chinese} /> */}
            <Route path="/en" component={English} />
          </Router>
        </Box>
      </main>
      <Footer className={classes.footer} />
    </React.Fragment>
  );
};
