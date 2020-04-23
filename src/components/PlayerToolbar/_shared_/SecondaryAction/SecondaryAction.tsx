import React, { forwardRef } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => {
  return {
    btn: {
      background: theme.palette.background.default,
      borderRadius: theme.spacing(3),
      border: '2px solid white',
      padding: theme.spacing(1),
      boxShadow: `2px 3px 12px 0px ${theme.palette.background.paper}`,
      ...theme.typography.h5,
    },
    active: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
  };
});

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  active?: boolean;
};

export const SecondaryAction = forwardRef<HTMLButtonElement, Props>(
  ({ active, ...rest }, ref) => {
    const classes = useStyles();

    return (
      <Button
        {...rest}
        className={clsx(classes.btn, rest.className, {
          [classes.active]: active,
        })}
        fullWidth
        ref={ref}
        size="large"
      />
    );
  }
);
