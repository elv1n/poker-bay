import React, { useEffect, useState } from 'react';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Win } from '../../../icons';

const useStyles = makeStyles({
  win: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -100%)',
  },
});

type Props = {
  has: boolean;
};
let timeout: number;
export const WinIcon: React.FC<Props> = ({ has }) => {
  const [show, setShow] = useState(false);

  // clear timeout on unmount
  useEffect(() => {
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (has) {
      setShow(true);
      timeout = window.setTimeout(() => setShow(false), 5000);
    }
  }, [has, setShow]);

  const classes = useStyles();
  return (
    <Fade in={show}>
      <div className={classes.win}>
        <Win fontSize="large" viewBox="0 0 512 512" />
      </div>
    </Fade>
  );
};
