import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import FilmSelect from '@/src/components/filmSelect';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';
import { filmAPI } from '@/src/services/filmService';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, Skeleton } from '@mui/material';
import { IFilm } from '../src/hooks/models/IModel';
import FilmCard from '../src/components/card';
import { Rings } from 'react-loader-spinner';

const NOT_FOUND_MESSAGE = 'Movie not found!';
const MANY_RESULTS_WESSAGE = 'Too many results.';

export const theme = createTheme();

export default function Album() {
  const [page, setPage] = useState(1);

  const searchName = useAppSelector(state => state.filmsReducer.searchName);

  const {
    data: films,
    error,
    isLoading,
  } = filmAPI.useGetFilmsByTitleQuery({ searchName, page });

  console.log(isLoading);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const pageQuantity: number = Math.round(
    films?.totalResults ? films?.totalResults / 10 : 0
  );

  return (
    <>
      <Head>
        <title>FILMS</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="inherit" noWrap>
              Search films by name
            </Typography>
            <Link href={'/favorite/favorite'}>
              <Button variant="contained" color="secondary">
                Your favorite films
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <main>
          <FilmSelect />
          {isLoading && (
            <Rings
              height="80"
              width="80"
              color="#5f70f1"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            />
          )}
          {error && (
            <Typography variant="h3" color={'red'} sx={{ textAlign: 'center' }}>
              Something wrong. Please try again
            </Typography>
          )}

          {films?.Search && (
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                {films?.Search.map(film => (
                  <FilmCard key={film.imdbID} film={film}></FilmCard>
                ))}
              </Grid>
            </Container>
          )}

          {films?.Error === NOT_FOUND_MESSAGE && (
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              The film was not found. Please enter another name.
            </Typography>
          )}

          {films?.Error === MANY_RESULTS_WESSAGE && (
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              Please enter the full name of a film.
            </Typography>
          )}

          {pageQuantity > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={2}>
                <Pagination
                  count={pageQuantity}
                  page={page}
                  onChange={handlePagination}
                />
              </Stack>
            </Box>
          )}
        </main>

        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Thanks for using our site
          </Typography>
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </>
  );
}
