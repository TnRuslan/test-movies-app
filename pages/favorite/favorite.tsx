import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Toolbar,
  Typography,
  Container,
} from '@mui/material/';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from './../index';
import { useAppSelector } from '@/src/hooks/hooks';
import FilmCard from '@/src/components/card';

export default function FavoriteFilms(): React.ReactElement {
  const favoriteFilms = useAppSelector(
    state => state.filmsReducer.favoriteFilams
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
            <Link href={'/'}>
              <Button variant="contained" color="secondary">
                Back
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <main>
          {favoriteFilms.length > 0 ? (
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                {favoriteFilms.map(film => (
                  <FilmCard key={film.imdbID} film={film}></FilmCard>
                ))}
              </Grid>
            </Container>
          ) : (
            <Typography
              variant="h3"
              sx={{ textAlign: 'center', marginTop: '100px' }}
            >
              You haven't added anything to your favorites yet
            </Typography>
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
