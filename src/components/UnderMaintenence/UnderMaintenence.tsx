import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

type Props = {};

export const UnderMaintenence: React.FC<Props> = () => {
  return (
    <Grid container justify="center">
      <Grid item md={4} xs={12}>
        <img
          alt="Poker bay logo"
          src={`${process.env.PUBLIC_URL}/pokerBay1.png`}
          width="100%"
        />
        <Alert severity="info">
          <AlertTitle>
            We will be down for a short time for maintenance
          </AlertTitle>
          <Typography>Please come back later</Typography>
        </Alert>
      </Grid>
    </Grid>
  );
};
