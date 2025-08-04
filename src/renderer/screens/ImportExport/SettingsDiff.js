import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import isEqual from "lodash.isequal";

export const SettingsDiff = ({settings}) => {
  if (!settings) return null;
  const diffedSettings = settings.filter(({key, newValue, oldValue}) =>
    !isEqual(newValue, oldValue)
  );
  if (!diffedSettings.length) return null;
  console.log("diffed settings", diffedSettings);

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 25 /* Don't overlap drawer */ }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Changed Setting</TableCell>
            <TableCell align="right">New Value</TableCell>
            <TableCell align="right">Old Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diffedSettings.map(({key, newValue, oldValue}) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">{JSON.stringify(newValue)}</TableCell>
              <TableCell align="right">{JSON.stringify(oldValue)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
