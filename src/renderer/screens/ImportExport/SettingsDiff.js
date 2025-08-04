import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import isEqual from "lodash.isequal";
import logger from "@renderer/utils/Logger";

const formatValue = (value) => {
  if (value === null || value === undefined) return 'None';
  if (typeof value === 'string') return value;
  if (typeof value === 'boolean') return value ? 'Enabled' : 'Disabled';
  if (typeof value === 'number') return value.toString();
  if (Array.isArray(value)) {
    if (value.length === 0) return 'Empty';
    if (value.length <= 3) return value.join(', ');
    return `${value.slice(0, 3).join(', ')}... (${value.length} items)`;
  }
  return JSON.stringify(value);
};

const formatSettingName = (key) => {
  // Convert camelCase and dot notation to readable names
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/\./g, ' ')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

export const SettingsDiff = ({settings}) => {
  if (!settings) return null;
  
  const diffedSettings = settings.filter(({key, newValue, oldValue}) =>
    !isEqual(newValue, oldValue)
  );
  
  if (!diffedSettings.length) return null;
  
  logger.log("Settings differences detected", { 
    count: diffedSettings.length, 
    changedKeys: diffedSettings.map(s => s.key)
  });

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Settings Changes ({diffedSettings.length})
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 25 /* Don't overlap drawer */ }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Setting</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Current Value</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>New Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diffedSettings.map(({key, newValue, oldValue}) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {formatSettingName(key)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {key}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ 
                  fontFamily: 'monospace', 
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {formatValue(oldValue)}
                </TableCell>
                <TableCell align="center" sx={{ 
                  fontFamily: 'monospace', 
                  fontSize: '0.875rem',
                  fontWeight: 'medium',
                  color: 'primary.main',
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {formatValue(newValue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
