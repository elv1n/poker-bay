import { lighten } from '@material-ui/core';
import { isNumber } from 'lodash-es';
import {
  deepOrange,
  green,
  grey,
  indigo,
  lightBlue,
  lime,
  purple,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { getKeys } from '../../utils/object';

export enum ChipType {
  One = 1,
  Two = 2,
  Five = 5,
  Ten = 10,
  TwentyFive = 25,
  Fifty = 50,
  Hundred = 100,
}

const deep = 700;
export const chipColor: { [key in ChipType]: string } = {
  [ChipType.One]: lime[deep],
  [ChipType.Two]: green[deep],
  [ChipType.Five]: lightBlue[deep],
  [ChipType.Ten]: indigo[deep],
  [ChipType.TwentyFive]: deepOrange[deep],
  [ChipType.Fifty]: purple[deep],
  [ChipType.Hundred]: grey[900],
};
export const chipColorStyles = getKeys(chipColor).reduce(
  (acc: { [key: string]: { color: string; '--chip-bg': string } }, key) => {
    acc[`color${key}`] = {
      color: chipColor[key],
      '--chip-bg': lighten(chipColor[key], 0.2),
    };
    return acc;
  },
  {
    zero: {
      color: grey[400],
      '--chip-bg': lighten(grey[400], 0.2),
    },
  }
);

export const useChipColorStyles = makeStyles(chipColorStyles);

export const jetonOrder = Object.values(ChipType)
  .filter(isNumber)
  .sort((a, b) => b - a);

export const chipOrderStartSmall = [...jetonOrder].reverse();
