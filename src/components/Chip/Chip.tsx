import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

export enum ChipSize {
  Small,
  Medium,
  Large,
}

const useStyles = makeStyles({
  small: {
    width: 20,
    height: 20,
  },
  large: {
    width: 40,
    height: 40,
  },
  chip: {
    borderRadius: '100%',
    backgroundColor: 'currentColor',
    border: '3px dotted',
    borderColor: 'var(--chip-bg)',
    boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.1)',
  },
});

type Props = {
  className?: string;
  size?: ChipSize;
} & React.HTMLAttributes<HTMLDivElement>;

export const Chip: React.FC<Props> = ({
  className,
  size = ChipSize.Small,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.chip, className, {
        [classes.small]: size === ChipSize.Small,
        [classes.large]: size === ChipSize.Large,
      })}
      {...rest}
    />
  );
};
