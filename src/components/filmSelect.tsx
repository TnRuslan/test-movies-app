import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { setSearchName } from '../redux/filmSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { filmsSlice } from '../redux/filmSlice';

export default function FilmSelect(): React.ReactElement {
  const { setSearchName } = filmsSlice.actions;
  const searchName = useAppSelector(state => state.filmsReducer.searchName);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchName(event.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        alignItems: 'center',
        m: '80px auto',
        px: '10px',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Start entering film name
      </Typography>

      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={searchName}
        onChange={handleChange}
      />
    </Box>
  );
}
