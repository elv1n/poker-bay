import React from 'react';
import { Button, ButtonBaseProps, ButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.spacing(3),
    boxShadow: 'none',
  },
}));
type Props = ButtonProps;

export const BigButton: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      color="primary"
      disableRipple
      fullWidth
      size="large"
      variant="contained"
      {...props}
    />
  );
};
