import * as React from "react";
import { HtmlAttributes } from "csstype";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { useState } from "react";
import random from "../../lib/random";
import surnameList from "../../assets/json/surname.json";
import Name from "../../lib/name";

interface IProps extends React.Props<HtmlAttributes> {
  classes?: {} | any;
}

const Index = (props: IProps) => {
  const { classes = {} } = props;
  const generateName = (len = 9) => {
    const namer = new Name();
    const names: Array<any> = [];
    for (let i = 0; i < len; i++) {
      const name = namer.generate();
      if (name) {
        names.push(name);
      }
    }
    return names;
  };

  const generateSurname = () => {
    return random.choice(surnameList);
  };

  const [names, setNames] = useState(generateName());
  const [surname, setSurname] = useState("李");
  // console.log(props);
  return (
    <React.Fragment>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item>
                <TextField
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
          {names.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {surname || generateSurname()}
                    {item.name}
                  </Typography>
                  <Typography>
                    {item.sentence &&
                      item.sentence
                        .split("")
                        .map((char: any, index: number) => {
                          const lineHight =
                            item.sentence.indexOf(item.name[0]) === index ||
                            item.sentence.lastIndexOf(item.name[1]) === index;
                          return lineHight ? (
                            <span style={{ color: "red" }} key={index}>
                              {char}
                            </span>
                          ) : (
                            char
                          );
                        })}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div>
                    ——《{item.tag} · {item.title}》
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Index;
