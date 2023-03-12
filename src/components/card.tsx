import {
  Grid,
  Card,
  CardMedia,
  Skeleton,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { IFilm } from '../hooks/models/IModel';
import { filmsSlice } from '../redux/filmSlice';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  film: IFilm;
}

export default function FilmCard(props: Props): React.ReactElement {
  const favoriteFilms = useAppSelector(
    state => state.filmsReducer.favoriteFilams
  );
  const dispatch = useAppDispatch();
  const { addFavoriteFilm, removeFromFavorite } = filmsSlice.actions;

  const film = props.film;

  const [isFavoriteFilm, setIsFavoriteFilm] = useState(false);

  const hendleAddToFavorite = () => {
    setIsFavoriteFilm(true);
    dispatch(addFavoriteFilm(film));
  };

  const hendleRemoveFromFavorite = () => {
    setIsFavoriteFilm(false);
    dispatch(removeFromFavorite(film.imdbID));
  };

  const isFavorite = (id: string) => {
    const index = favoriteFilms.findIndex(f => f.imdbID === id);
    if (index === -1) {
      setIsFavoriteFilm(false);
      return;
    }
    setIsFavoriteFilm(true);
  };

  const favorite = useCallback(
    (id: string) => {
      const index = favoriteFilms.findIndex(f => f.imdbID === id);
      if (index === -1) {
        setIsFavoriteFilm(false);
        return;
      }
      setIsFavoriteFilm(true);
    },
    [favoriteFilms]
  );

  // console.log(favorite(film.imdbID));

  useEffect(() => {
    favorite(film.imdbID);
  }, [favorite, film.imdbID]);

  return (
    <Grid item key={film.imdbID} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {film.Poster !== 'N/A' ? (
          <CardMedia component="img" image={film.Poster} alt="random" />
        ) : (
          <Skeleton variant="rectangular" animation={false} height={400} />
        )}

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {film.Title}
          </Typography>
          <Typography>{film.Year}</Typography>
        </CardContent>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {isFavoriteFilm ? (
            <Button
              variant="contained"
              size="small"
              onClick={hendleRemoveFromFavorite}
            >
              Remove
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={hendleAddToFavorite}
            >
              Add
            </Button>
          )}

          <Button variant="contained" size="small">
            <Link href={`/film/${film.imdbID}`}>View more</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
