import React from "react";
import { Card, CardContent, CardActions, TextField } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Namer from "./scripts/namer";

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
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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

// console.log(useStyles);

const classes = {};

let names = [];

const generateName = () => {
  const namer = new Namer();
  names = [];
  for (let i = 0; i < 9; i++) {
    names.push(namer.genName());
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      surname: "李",
    };
  }

  componentDidMount() {
    this.generateName();
  }

  generateName() {
    const namer = new Namer();
    names = [];
    for (let i = 0; i < 9; i++) {
      names.push(namer.genName());
    }
    this.setState({
      names,
    });
    console.log(names);
  }
  render() {
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
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                起啥名
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                用诗经, 楚辞, 唐诗,宋词起名字
              </Typography>
              <div className={classes.heroButtons}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      id="outlined-bare"
                      className={classes.textField}
                      defaultValue={this.state.surname}
                      onChange={event => {
                        this.setState({ surname: event.target.value });
                      }}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.generateName()}
                    >
                      随缘生成
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.names &&
                this.state.names.map &&
                this.state.names
                  .filter(item => item)
                  .map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardContent
                          className={classes.cardContent}
                          style={{ height: 130 }}
                        >
                          <Typography gutterBottom variant="h5" component="h2">
                            {this.state.surname}
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
        {/* Footer */}
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
        {/* End footer */}
      </React.Fragment>
    );
  }
}
