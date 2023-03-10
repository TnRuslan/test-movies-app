import { filmAPI } from '@/src/services/filmService';
import {
  AppBar,
  Box,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { theme } from './../index';

export default function Film(): React.ReactElement {
  const { query } = useRouter();
  console.log(query.id);

  const {
    data: film,
    error,
    isLoading,
  } = filmAPI.useGetFilmByIdQuery(query.id);

  console.log(film);

  return (
    <>
      {film && (
        <>
          <Head>
            <title>FILMS</title>
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                  {film?.Title}
                </Typography>
              </Toolbar>
            </AppBar>
            <main>
              <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <CardMedia
                      component="img"
                      image={film.Poster}
                      alt="random"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography>Actors: {film.Actors}</Typography>
                    <Typography>Director: {film.Director}</Typography>
                    <Typography>Genre: {film.Genre}</Typography>
                    <Typography>IMDB Rating: {film.imdbRating}</Typography>
                    <Typography>Released: {film.Released}</Typography>
                  </Grid>
                </Grid>
              </Container>
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
      )}
    </>
  );
}
