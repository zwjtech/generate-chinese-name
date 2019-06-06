import * as React from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  CardContent,
  Card,
} from "@material-ui/core";
import { useState } from "react";
import random from "random-name";

export interface IProps {}

export default function() {
  const arr: string[] = [];
  [...new Array(12)].forEach(item => {
    arr.push(random());
  });
  const [names, setNames] = useState(arr);

  function generateName() {
    const names: any = [...new Array(12)].map(random);
    setNames(names);
  }

  return (
    <React.Fragment>
      <div style={{marginBottom:16}}>
        <Container maxWidth="sm">
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={generateName}
              >
                一切随缘
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {names.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent style={{ padding: 16 }}>
                  <Typography>{item}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
