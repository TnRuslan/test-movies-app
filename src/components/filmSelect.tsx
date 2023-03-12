import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useAppDispatch } from '../hooks/hooks';
import { filmsSlice } from '../redux/filmSlice';

export default function FilmSelect(): React.ReactElement {
  const { setSearchName } = filmsSlice.actions;

  const [filmName, setFilmName] = useState('');

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilmName(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchName(filmName));
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
      <Box sx={{ display: 'flex', gap: '30px' }}>
        <TextField
          id="outlined-basic"
          label="Film name"
          variant="outlined"
          value={filmName}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          sx={{ width: '150px' }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
