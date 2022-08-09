import * as React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Grid, makeStyles, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  cardContainer: {
    textAlign: "center",
    "& a": {
      textDecoration: "none"
    }
  },
  paper: {
    padding: theme.spacing(1),
  }
}));

const CustomCard = ({ image, path, name }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.cardContainer}>
      <Link to={path}>
        <Paper elevation={16} className={classes.paper}>
          <Card className="card_item" style={{ width: "15rem"}}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={image}
                alt="user"
                style={{ width: "100%", maxHeight: "11rem" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      </Link>
    </Grid>
  );
};

export default CustomCard;
