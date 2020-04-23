import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useLocation } from 'wouter';
import { makeStyles } from '@material-ui/core/styles';
import { lobbySelector } from '../../features/lobby';
import { Links } from '../../constants';

const useStyles = makeStyles({
  row: {
    cursor: 'pointer',
  },
});

type Props = {};

export const Lobby: React.FC<Props> = () => {
  const classes = useStyles();
  const [, setLocation] = useLocation();
  const tables = useSelector(lobbySelector.get);
  return (
    <Container maxWidth="md">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Players</TableCell>
            <TableCell>Min Buy In</TableCell>
            <TableCell>Max Buy In</TableCell>
            <TableCell>Blind</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tables.map(table => (
            <TableRow
              className={classes.row}
              hover
              key={table._tableName}
              onClick={() => setLocation(Links.game + table._tableName)}
            >
              <TableCell>{table._tableName}</TableCell>
              <TableCell>
                {table._playerCount}/{table._maxPlayers}
              </TableCell>
              <TableCell>{table._minBuyInChips}</TableCell>
              <TableCell>{table._maxBuyInChips}</TableCell>
              <TableCell>{table._bigBlind}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
