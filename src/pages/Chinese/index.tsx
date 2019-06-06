import * as React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Grid,
} from "@material-ui/core";
import { useState } from "react";
import { AutorenewOutlined } from "@material-ui/icons";
import random from "random-name";

export interface IProps {}

export default function(props: IProps) {
  const [name, setName] = useState("");
  
  function generateName(){
    setName(random())
  }
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <TextField
            variant="outlined"
            type="text"
            label="随机一个名字"
            value={name}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={generateName}>
                    <AutorenewOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
