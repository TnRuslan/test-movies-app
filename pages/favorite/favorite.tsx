import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import FilmSelect from '@/src/components/filmSelect';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Skeleton } from '@mui/material';
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
            <h1></h1>
          )}

          {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={2}>
                <Pagination
                  count={pageQuantity}
                  page={page}
                  onChange={handlePagination}
                />
              </Stack>
            </Box> */}
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
