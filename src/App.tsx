import React, { useState } from "react";
import {
  AppBar,
  Card,
  Button,
  CardContent,
  CardActions,
  TextField,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Container,
  Link,
  Theme,
  createStyles,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Name from "./scripts/name";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Powered by "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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

// const classes = {};

export default function App() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     names: [],
  //     surname: "李",
  //   };
  // }

  const generateName = (len = 9) => {
    const namer = new Name();
    const names: any = [];
    for (let i = 0; i < len; i++) {
      const name = namer.genName();
      if (name) {
        names.push(name);
      }
    }
    return names;
  };

  const [names, setNames] = useState(generateName());
  const [surname, setSurname] = useState("李");
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            起啥名
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                  <TextField
                    id="outlined-bare"
                    defaultValue={surname}
                    onChange={event => {
                      setSurname(event.target.value);
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => setNames(generateName())}
                  >
                    随缘生成
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {names &&
              names.map &&
              names
                .filter(item => item)
                .map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardContent
                        className={classes.cardContent}
                        style={{ height: 130 }}
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {surname}
                          {item.name}
                        </Typography>
                        <Typography>{item.sentence}</Typography>
                      </CardContent>
                      <CardActions style={{ height: 60 }}>
                        <div />
                        <div>
                          ——《{item.book} · {item.title}》
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
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
    </React.Fragment>
  );
}
